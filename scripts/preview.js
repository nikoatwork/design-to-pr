const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mockupName = process.argv[2] || 'profile-card';
const root = path.resolve(__dirname, '..');
const mockupSrc = path.join(root, 'mockups', mockupName, 'src');
const linkTarget = path.join(root, 'shared/preview-template/src/mockup');

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

console.log(`✅ Linked mockup: ${mockupName}`);
console.log(`   ${relativePath} → shared/preview-template/src/mockup\n`);

execSync('npx vite', {
  cwd: path.join(root, 'shared/preview-template'),
  stdio: 'inherit',
});
