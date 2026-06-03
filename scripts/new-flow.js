#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const flowName = process.argv[2];

if (!flowName) {
  console.error('Usage: npm run new-flow <mockup-name>');
  process.exit(1);
}

if (!/^[a-z0-9][a-z0-9-]*$/.test(flowName)) {
  console.error('Mockup name must use lowercase letters, numbers, and hyphens.');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const mockupDir = path.join(root, 'client-design-system', 'mockups', flowName);
const srcDir = path.join(mockupDir, 'src');
const appPath = path.join(srcDir, 'App.tsx');
const readmePath = path.join(mockupDir, 'README.md');

if (fs.existsSync(mockupDir)) {
  console.error(`Mockup already exists: client-design-system/mockups/${flowName}`);
  process.exit(1);
}

fs.mkdirSync(srcDir, { recursive: true });

fs.writeFileSync(
  appPath,
  `import { Button, Card, CardContent } from "client-design-system/components";

export default function App() {
  return (
    <div className="grid min-h-[30rem] place-items-center bg-background-50 p-6 text-text-50">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <p className="text-sm font-semibold uppercase text-primary-600">${flowName}</p>
          <h1 className="mt-3 text-3xl font-bold">New mockup</h1>
          <p className="mt-3 max-w-xl text-text-100">
            Replace this starter screen with a focused composition using the
            client's design-system components.
          </p>
          <Button className="mt-6">Primary action</Button>
        </CardContent>
      </Card>
    </div>
  );
}
`,
  'utf-8'
);

fs.writeFileSync(
  readmePath,
  `# ${flowName}

This one-off mockup lives in:

\`\`\`text
client-design-system/mockups/${flowName}/
\`\`\`

After the Gallery routes are wired, it should be available at:

\`\`\`text
/mockup/${flowName}
\`\`\`
`,
  'utf-8'
);

console.log(`Created mockup: client-design-system/mockups/${flowName}`);
console.log(`Open the Gallery with: npm run dev`);
