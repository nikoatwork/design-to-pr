#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const root = path.resolve(__dirname, '..');
const screenshotsDir = path.join(root, 'screenshots', 'gallery');
const port = Number(process.env.PORT || 5174);
const baseUrl = `http://127.0.0.1:${port}`;

function slugify(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readCatalog() {
  const catalogPath = path.join(root, 'client-design-system', 'catalog.json');
  try {
    return JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  } catch {
    return {};
  }
}

function discoverRoutes() {
  const catalog = readCatalog();
  const routeSet = new Set(['/', '/style-guide']);

  const componentsDir = path.join(root, 'client-design-system', 'components');
  if (fs.existsSync(componentsDir)) {
    for (const file of fs.readdirSync(componentsDir)) {
      if (file.endsWith('.tsx') && file !== 'index.tsx') {
        routeSet.add(`/component/${slugify(file.replace(/\.tsx$/, ''))}`);
      }
    }
  }

  for (const component of catalog.components || []) {
    if (component.name) routeSet.add(`/component/${slugify(component.name)}`);
  }

  const mockupsDir = path.join(root, 'client-design-system', 'mockups');
  if (fs.existsSync(mockupsDir)) {
    for (const entry of fs.readdirSync(mockupsDir, { withFileTypes: true })) {
      if (entry.isDirectory()) routeSet.add(`/mockup/${entry.name}`);
    }
  }

  for (const mockup of catalog.mockups || []) {
    if (mockup.slug || mockup.name) routeSet.add(`/mockup/${mockup.slug || slugify(mockup.name)}`);
  }

  return [...routeSet];
}

function fileNameForRoute(route, viewportName) {
  const slug = route === '/' ? 'gallery' : route.replace(/^\//, '').replace(/\//g, '-');
  return `${slug}-${viewportName}.png`;
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
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const vite = spawn('npx', ['vite', '--host', '127.0.0.1', '--port', String(port), '--config', 'app/vite.config.ts'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32'
  });

  vite.stdout.on('data', (chunk) => process.stdout.write(chunk));
  vite.stderr.on('data', (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer(baseUrl);
    const { chromium } = await loadPlaywright();
    const browser = await chromium.launch();

    const routes = discoverRoutes();
    const shots = [
      { name: 'desktop', viewport: { width: 1440, height: 1200 }, fullPage: true },
      { name: 'mobile', viewport: { width: 390, height: 900 }, fullPage: true }
    ];

    for (const route of routes) {
      for (const shot of shots) {
        const page = await browser.newPage({ viewport: shot.viewport });
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
        const filePath = path.join(screenshotsDir, fileNameForRoute(route, shot.name));
        await page.screenshot({ path: filePath, fullPage: shot.fullPage });
        await page.close();
        console.log(`📸 Saved ${path.relative(root, filePath)}`);
      }
    }

    await browser.close();
    console.log(`✅ Screenshots complete for ${routes.length} Gallery route(s)`);
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
