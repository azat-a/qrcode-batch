Batch QR code generator: plain text file → many PNG's with QR codes and captions. You can add prefix to all strings of input file, set width of output images, and set colors of dark and light modules of QR codes.
## Installation
`sudo apt install graphicksmagic` to install GraphicsMagick binaries (or download from http://www.graphicsmagick.org/)
`git clone ---` to clone this repository (or download folder)
`cd node-qr-batch` to change directory
`node install` to install dependencies
## Usage
`node index.js [options]` or 	`node index.js` to use with defaults.
### Options
`-w, --width <number, default 400>`  — QR code width
`-s, --source <path, default "input.txt">'` — source file
`-d, --destination <path, default "output">` — destination directory
`-p, --prefix <string>` — data prefix
`--dark <HEX color, default "#000000">` —  color of dark modules of QR code and text
`--light <HEX color, default "#ffffff">` — color of light modules of QR code and background
### Examples
`node index.js` reads `input.txt` and generates black-on-white QR codes with a width of 400px in `output` directory.
`node index.js -w 600 -s "codes.txt" -d "codes"` reads data from `codes.txt` and generates QR codes with a width of 600px in `codes` directory.
`node index.js -p "https://example.com/" --dark "#ffffff" --light "#000000"` adds prefix and generates white-on-black QR codes.