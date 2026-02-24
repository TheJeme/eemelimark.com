const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const distDir = path.join(projectRoot, 'dist');

if (!fs.existsSync(publicDir)) {
  process.exit(0);
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

for (const entry of fs.readdirSync(publicDir)) {
  const source = path.join(publicDir, entry);
  const destination = path.join(distDir, entry);
  const stat = fs.statSync(source);

  if (stat.isFile()) {
    fs.copyFileSync(source, destination);
  }
}
