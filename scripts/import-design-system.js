#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
const dest = path.resolve('client-design-system/components');

if (!src) {
  console.error('Usage: node scripts/import-design-system.js <path-to-client-source>');
  process.exit(1);
}

const srcResolved = path.resolve(src);
if (!fs.existsSync(srcResolved)) {
  console.error(`❌ Source path does not exist: ${srcResolved}`);
  process.exit(1);
}

console.log(`📦 Importing design-system components from:\n   ${srcResolved}`);

if (fs.existsSync(dest)) {
  console.log(`   Removing existing ${path.relative(process.cwd(), dest)}`);
  fs.rmSync(dest, { recursive: true, force: true });
}
fs.cpSync(srcResolved, dest, { recursive: true, force: true });
console.log(`   Copied to ${path.relative(process.cwd(), dest)}`);

const stubbedImports = [];
const foundDeps = new Set();

function isInsideDest(fullPath) {
  const relative = path.relative(dest, fullPath);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function tryResolveFile(basePath) {
  const candidates = [
    basePath,
    basePath + '.tsx',
    basePath + '.ts',
    basePath + '.jsx',
    basePath + '.js',
    path.join(basePath, 'index.tsx'),
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.js'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function resolveModule(importPath, fromFile) {
  if (importPath.startsWith('.') || importPath.startsWith('/')) {
    const base = path.resolve(path.dirname(fromFile), importPath);
    const resolved = tryResolveFile(base);
    if (!resolved) return { type: 'missing', reason: 'file not found' };
    if (!isInsideDest(resolved)) return { type: 'missing', reason: 'resolves outside design system' };
    return { type: 'local', path: resolved };
  }

  const builtins = new Set([
    'react', 'react-dom', 'react-dom/client', 'react-dom/server',
    'react/jsx-runtime', 'react/jsx-dev-runtime',
  ]);
  if (builtins.has(importPath)) return { type: 'builtin' };

  try {
    const resolved = require.resolve(importPath, { paths: [process.cwd()] });
    return { type: 'npm', path: resolved };
  } catch {
    return { type: 'missing', reason: 'unresolved module' };
  }
}

function parseNames(clause) {
  const names = [];
  let trimmed = clause.trim();
  if (!trimmed) return names;

  if (trimmed === '*') return [{ name: '*', kind: 'star' }];

  // import type { X } or import type X
  if (trimmed.startsWith('type ')) {
    trimmed = trimmed.slice(5).trim();
    const namedMatch = trimmed.match(/{([^}]*)}/);
    if (namedMatch) {
      const items = namedMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      for (const item of items) {
        const parts = item.split(/\s+as\s+/i).map(s => s.trim());
        const alias = parts.length > 1 ? parts[1] : parts[0];
        if (alias) names.push({ name: alias, kind: 'type' });
      }
    } else if (/^\w+$/.test(trimmed)) {
      names.push({ name: trimmed, kind: 'type' });
    }
    return names;
  }

  // Default import
  const defaultMatch = trimmed.match(/^(\w+)(?:\s*,\s*)?/);
  if (defaultMatch) {
    const after = trimmed.slice(defaultMatch[0].length);
    if (after === '' || after.startsWith('{') || after.startsWith('*')) {
      names.push({ name: defaultMatch[1], kind: 'default' });
    }
  }

  // Namespace: * as X
  const nsMatch = trimmed.match(/\*\s+as\s+(\w+)/);
  if (nsMatch) {
    names.push({ name: nsMatch[1], kind: 'namespace' });
  }

  // Named imports: { a, b as c }
  const namedMatch = trimmed.match(/{([^}]*)}/);
  if (namedMatch) {
    const items = namedMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const item of items) {
      const parts = item.split(/\s+as\s+/i).map(s => s.trim());
      const alias = parts.length > 1 ? parts[1] : parts[0];
      if (alias) names.push({ name: alias, kind: 'named' });
    }
  }

  return names;
}

function generateStub(names, ext, importPath) {
  const isReact = ext === '.tsx' || ext === '.jsx';
  const isStyle = /\.(css|scss|sass|less|styl)$/.test(importPath);
  const lines = [];

  for (const n of names) {
    if (n.kind === 'star') {
      lines.push(`/* export removed — module missing */`);
      continue;
    }
    if (n.kind === 'type') {
      lines.push(`type ${n.name} = any;`);
      continue;
    }
    if (n.kind === 'namespace') {
      lines.push(`const ${n.name} = new Proxy({}, { get: (_, p) => (...args: any[]) => console.warn('[stub] Missing: ${n.name}.' + String(p)) });`);
      continue;
    }
    if (isStyle) {
      lines.push(`const ${n.name} = {};`);
      continue;
    }
    if (n.name.startsWith('use')) {
      lines.push(`const ${n.name} = (...args: any[]) => { console.warn('[stub] Missing hook: ${n.name}'); return null; };`);
    } else if (isReact && /^[A-Z]/.test(n.name)) {
      lines.push(`const ${n.name} = (props: any) => <div data-missing="${n.name}" style={{border:'2px dashed #ef4444',padding:'12px',borderRadius:'6px',color:'#ef4444',background:'#fef2f2'}}>Missing: ${n.name}</div>;`);
    } else {
      lines.push(`const ${n.name} = (...args: any[]) => { console.warn('[stub] Missing: ${n.name}'); };`);
    }
  }
  return lines.join('\n');
}

function processFile(filePath) {
  const relPath = path.relative(dest, filePath);
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  function handleMatch(match, clause, importPath, type) {
    const resolved = resolveModule(importPath, filePath);
    if (resolved.type !== 'missing') {
      if (resolved.type === 'npm') foundDeps.add(importPath);
      return match;
    }

    stubbedImports.push({ file: relPath, type, path: importPath, reason: resolved.reason });
    const names = parseNames(clause || '');

    if (names.length === 0 || names[0].kind === 'star') {
      modified = true;
      return `/* [design-to-pr] Removed broken ${type}: '${importPath}' (${resolved.reason}) */\n`;
    }

    modified = true;
    return `/* [design-to-pr] Stubbed ${type} from '${importPath}' (${resolved.reason}) */\n${generateStub(names, ext, importPath)}\n`;
  }

  content = content.replace(/import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g, (m, c, p) => handleMatch(m, c, p, 'import'));
  content = content.replace(/export\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g, (m, c, p) => handleMatch(m, c, p, 'export'));
  content = content.replace(/import\s+['"]([^'"]+)['"]/g, (m, p) => {
    const resolved = resolveModule(p, filePath);
    if (resolved.type !== 'missing') return m;
    stubbedImports.push({ file: relPath, type: 'side-effect', path: p, reason: resolved.reason });
    modified = true;
    return `/* [design-to-pr] Removed missing side-effect import: '${p}' (${resolved.reason}) */\n`;
  });
  content = content.replace(/require\(['"]([^'"]+)['"]\)/g, (m, p) => {
    const resolved = resolveModule(p, filePath);
    if (resolved.type !== 'missing') {
      if (resolved.type === 'npm') foundDeps.add(p);
      return m;
    }
    stubbedImports.push({ file: relPath, type: 'require', path: p, reason: resolved.reason });
    modified = true;
    return `/* [design-to-pr] Stubbed require('${p}') */ ({} as any)`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else {
      processFile(full);
    }
  }
}

walk(dest);

console.log(`\n✅ Import complete.\n`);

if (stubbedImports.length > 0) {
  console.log(`⚠️  ${stubbedImports.length} broken import(s) stubbed/removed:\n`);
  const byFile = {};
  for (const s of stubbedImports) {
    byFile[s.file] = byFile[s.file] || [];
    byFile[s.file].push(s);
  }
  for (const [file, items] of Object.entries(byFile).sort()) {
    console.log(`   ${file}`);
    for (const i of items) {
      console.log(`      · ${i.type} '${i.path}' — ${i.reason}`);
    }
  }
  console.log('');
}

if (foundDeps.size > 0) {
  console.log(`📎 These npm dependencies were referenced and resolved:\n`);
  for (const dep of [...foundDeps].sort()) {
    console.log(`   npm install ${dep}`);
  }
  console.log('');
}

console.log('Next steps:');
console.log('  1. Review stubbed imports above.');
console.log('  2. Install any additional npm packages if needed.');
console.log('  3. Import theme/tokens in app/src/index.css or client-design-system/theme/ if required.');
console.log('  4. Run: npm run dev and review the Gallery.');
