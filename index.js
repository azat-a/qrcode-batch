const cmd = require('commander');
const fs = require('fs');
const qr = require('qrcode');
const gm = require('gm');

cmd
  .option('-w, --width <width>', 'QR code width', 400)
  .option('-s, --source <path>', 'source file', 'input.txt')
  .option('-d, --destination <path>', 'destination directory', 'output')
  .option('-p, --prefix <text>', 'data prefix', '')
  .option('--dark <color>', 'dark color for QR code and text', '#000000')
  .option('--light <color>', 'light color for background', '#ffffff')
  .parse();

const options = cmd.opts();
console.log(options);
const qrOptions = {
  width: options.width,
  margin: 4,
  errorCorrectionLevel: 'high',
  color: {
    dark: options.dark,
    light: options.light,
  }
};

const texts = fs.readFileSync(options.source, 'utf-8').trim().split('\n');
for (let i = 0; i < texts.length; i += 1) {
  encode(texts[i]);
}

function encode(text) {
  const textToEncode = options.prefix + text;
  const file = `${options.destination}/${text}.png`;
  
  qr.toFile(file, textToEncode, qrOptions, function(error) {
    if (error) {
      throw error;
    }
    console.log('Encoded: ' + file);

    addText(text);
  });
}

function addText(text) {
  const textToAdd = options.prefix + text;
  const file = `${options.destination}/${text}.png`;

  const qrWidth = options.width;
  const qrHeight = options.width;

  const image = {
    width: qrWidth,
    height: qrHeight * 1.1,
  };

  const textArea = {
    x: 0,
    y: qrHeight * 0.95,
    width: qrWidth,
    height: qrHeight * 0.1,
  };

  const textOptions = {
    x: 0,
    y: qrHeight * 0.065,
    size: qrHeight * 0.065,
    font: 'Roboto-Regular.ttf'
  };

  gm(file)
    .gravity('North')
    .extent(image.width, image.height)
    .region(textArea.width, textArea.height, textArea.x, textArea.y)
    .background(options.light)
    .gravity('North')
    .fill(options.dark)
    .fontSize(textOptions.size)
    .font(textOptions.font)
    .drawText(textOptions.x, textOptions.y, textToAdd)
    .write(file, function (error) {
      if (error) {
        throw error;
      }
      console.log('Converted: ' + file);
    });
}