const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { faGithub, faLinkedin } = require('@fortawesome/free-brands-svg-icons');
const { faAngleUp, faEnvelope } = require('@fortawesome/free-solid-svg-icons');

const sourceDir = path.resolve(__dirname, '../src/assets');
const outputDir = path.join(sourceDir, 'generated');
const iconDir = path.join(outputDir, 'icons');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png']);

fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(iconDir, { recursive: true });

const icons = {
  'angle-up': faAngleUp,
  envelope: faEnvelope,
  github: faGithub,
  linkedin: faLinkedin
};

for (const [name, definition] of Object.entries(icons)) {
  const [width, height, , , pathData] = definition.icon;
  const paths = Array.isArray(pathData) ? pathData : [pathData];
  const body = paths.map(data => `<path fill="#fff" d="${data}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${body}</svg>`;
  fs.writeFileSync(path.join(iconDir, `${name}.svg`), svg);
}

const images = fs.readdirSync(sourceDir).filter(file => {
  return supportedExtensions.has(path.extname(file).toLowerCase());
});

for (const file of fs.readdirSync(outputDir)) {
  if (path.extname(file) === '.webp') {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

Promise.all(
  images.flatMap(file => {
    const source = path.join(sourceDir, file);
    const name = path.parse(file).name;
    const widths = file === 'profile.png' ? [600] : [800, 1600];

    return widths.map(width => {
      const suffix = file === 'profile.png' ? '' : `-${width}`;
      const output = path.join(outputDir, `${name}${suffix}.webp`);

      return sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88, effort: 4 })
        .toFile(output);
    });
  })
).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
