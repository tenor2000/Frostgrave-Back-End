const path = require("path");
const fs = require("fs");

async function combineReferenceData() {
  const combinedData = {};
  // REPLACE WITH CALL TO MONGODB
  const directoryPath = "./testdata";

  try {
    const files = fs.readdirSync(directoryPath);

    for (const filename of files) {
      if (filename.endsWith(".json")) {
        const dataname = path.basename(filename, ".json");
        const filePath = path.join(directoryPath, filename);

        try {
          const fileContent = fs.readFileSync(filePath, "utf-8").trim();

          if (!fileContent) {
            console.log(`Skipping empty file: ${filePath}`);
            continue;
          }

          const data = JSON.parse(fileContent);
          combinedData[dataname] = data;
        } catch (err) {
          throw new Error(`Error reading ${filePath}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  return combinedData;
}

module.exports = combineReferenceData;
