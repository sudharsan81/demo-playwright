import * as fs from 'fs/promises';

export async function readJsonFile(filePath: string): Promise<any> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonObject = JSON.parse(fileContent);
    return jsonObject;
  } catch (error) {
    console.error(`Error reading or parsing JSON file: ${error}`);
    throw error;
  }
}