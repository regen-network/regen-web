/* eslint-disable no-console */
/* eslint-disable lingui/no-unlocalized-strings */
const { v2 } = require('@google-cloud/translate');
const pofile = require('pofile');

const translate = new v2.Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? '{}'),
});

async function translatePoFile(inputPath, targetLanguage) {
  try {
    // Read and parse the PO file
    const poData = await new Promise((resolve, reject) => {
      pofile.load(inputPath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    console.log(
      `Translating ${poData.items.length} strings to ${targetLanguage}...`,
    );

    // Translate each message
    for (const item of poData.items) {
      if (item.msgid && !item.msgstr[0]) {
        // Only translate empty strings
        try {
          const [translation] = await translate.translate(
            item.msgid,
            targetLanguage,
          );
          item.msgstr = [translation];
          console.log(`Translated: ${item.msgid} → ${translation}`);
        } catch (error) {
          console.error(
            `Error translating "${item.msgid}":`,
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    }

    // Save the translated PO file to the original path
    await new Promise((resolve, reject) => {
      poData.save(inputPath, err => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log(`Translation completed! File updated: ${inputPath}`);
  } catch (error) {
    console.error('Translation failed:', error);
    process.exit(1);
  }
}

const inputFile = process.argv[2];
const targetLang = process.argv[3];

if (!inputFile || !targetLang) {
  console.error(
    'Usage: node translatePoFile.js <input-po-file> <target-language>',
  );
  console.error('Example: node translatePoFile.js messages.po es');
  process.exit(1);
}

translatePoFile(inputFile, targetLang);
