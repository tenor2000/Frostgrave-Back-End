import path from 'path';
import fs from 'fs';

export async function combineReferenceData(gameName) {
    const combinedData = {};
    const directoryPath = path.join('ReferenceData', gameName);

    try {
        const files = fs.readdirSync(directoryPath);

        for (const filename of files) {
            if (filename.endsWith('.json')) {
                const dataname = path.basename(filename, '.json');
                const filePath = path.join(directoryPath, filename);

                try {
                    const fileContent = fs.readFileSync(filePath, 'utf-8').trim();

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
        console.error('Error reading directory:', err);
    }

    return combinedData;
}