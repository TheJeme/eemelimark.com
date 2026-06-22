const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.resolve(__dirname, '../src/assets');
const outputDir = path.join(sourceDir, 'generated');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png']);

fs.mkdirSync(outputDir, { recursive: true });

const images = fs.readdirSync(sourceDir).filter(file => {
  return supportedExtensions.has(path.extname(file).toLowerCase());
});

Promise.all(
  images.map(async file => {
    const source = path.join(sourceDir, file);
    const output = path.join(outputDir, `${path.parse(file).name}.webp`);
    const width = file === 'profile.png' ? 600 : 1600;

    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(output);
  })
).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
