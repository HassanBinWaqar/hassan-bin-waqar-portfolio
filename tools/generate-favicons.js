const sharp = require('sharp');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const input = path.join(publicDir, 'profile.jpeg');
const out32 = path.join(publicDir, 'favicon-32.png');
const out16 = path.join(publicDir, 'favicon-16.png');

(async () => {
  try {
    await sharp(input).resize(32, 32, { fit: 'cover' }).png().toFile(out32);
    await sharp(input).resize(16, 16, { fit: 'cover' }).png().toFile(out16);
    console.log('Created favicons:', out32, out16);
    process.exit(0);
  } catch (err) {
    console.error('Failed to create favicons:', err.message);
    process.exit(1);
  }
})();
