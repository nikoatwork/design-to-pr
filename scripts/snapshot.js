#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const mockupName = process.argv[2] || 'design-system-gallery';
const root = path.resolve(__dirname, '..');
const previewRoot = path.join(root, 'shared/preview-template');
const mockupSrc = path.join(root, 'mockups', mockupName, 'src');
const linkTarget = path.join(previewRoot, 'src/mockup');
const screenshotsDir = path.join(root, 'screenshots', mockupName);
const port = Number(process.env.PORT || 5174);
const url = `http://127.0.0.1:${port}`;

function linkMockup() {
  if (!fs.existsSync(mockupSrc)) {
    console.error(`❌ Mockup not found: ${mockupSrc}`);
    process.exit(1);
  }

  if (fs.existsSync(linkTarget)) {
    fs.rmSync(linkTarget, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(linkTarget), { recursive: true });
  const relativePath = path.relative(path.dirname(linkTarget), mockupSrc);
  const symlinkType = process.platform === 'win32' ? 'junction' : 'dir';
  fs.symlinkSync(relativePath, linkTarget, symlinkType);
}

function waitForServer(targetUrl, timeoutMs = 30000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    async function check() {
      try {
        const response = await fetch(targetUrl);
        if (response.ok) return resolve();
      } catch {
        // Vite may still be starting.
      }

      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for ${targetUrl}`));
        return;
      }

      setTimeout(check, 250);
    }

    check();
  });
}

async function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    console.error('❌ Playwright is not installed.');
    console.error('   Run: npm install --save-dev playwright');
    process.exit(1);
  }
}

async function main() {
  linkMockup();
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const vite = spawn('npx', ['vite', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: previewRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32'
  });

  vite.stdout.on('data', (chunk) => process.stdout.write(chunk));
  vite.stderr.on('data', (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer(url);
    const { chromium } = await loadPlaywright();
    const browser = await chromium.launch();

    const shots = [
      { name: 'desktop', viewport: { width: 1440, height: 1400 }, fullPage: true },
      { name: 'mobile', viewport: { width: 390, height: 1200 }, fullPage: true }
    ];

    for (const shot of shots) {
      const page = await browser.newPage({ viewport: shot.viewport });
      await page.goto(url, { waitUntil: 'networkidle' });
      const filePath = path.join(screenshotsDir, `${shot.name}.png`);
      await page.screenshot({ path: filePath, fullPage: shot.fullPage });
      await page.close();
      console.log(`📸 Saved ${path.relative(root, filePath)}`);
    }

    await browser.close();
    console.log(`✅ Screenshots complete for ${mockupName}`);
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.error(`❌ Snapshot failed: ${message}`);
    if (message.includes('Executable') || message.includes('browser')) {
      console.error('   Try: npx playwright install chromium');
    }
    process.exitCode = 1;
  } finally {
    vite.kill('SIGTERM');
  }
}

main();
