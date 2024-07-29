const fs = require('fs');
const { translate } = require('@vitalets/google-translate-api');

const [, , inputFile, outputFile] = process.argv;

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${inputFile}:`, err);
    process.exit(1);
  }

  translate(data, { from: 'zh', to: 'en' })
    .then((res) => {
      fs.writeFile(outputFile, res.text, (err) => {
        if (err) {
          console.error(`Error writing file ${outputFile}:`, err);
          process.exit(1);
        }
        console.log(`Translated ${inputFile} and saved to ${outputFile}`);
      });
    })
    .catch((err) => {
      console.error(`Translation error:`, err);
      process.exit(1);
    });
});
