import fs from 'node:fs/promises';
import path from 'path';

const dataPath = path.join(__dirname, '..', '..', 'data/database.json');
const dataPathTwo = path.join(__dirname, '..', '..', 'data/databaseTwo.json');
export const readDatabase = async () => {
  try {
    return await fs.readFile(dataPath, 'utf8');
  } catch (error) {
    await fs.writeFile(dataPath, JSON.stringify([]));
    return await fs.readFile(dataPath, 'utf8');
  }
};

export const writeDatabase = async (data: any) => {
  await fs.writeFile(dataPath, JSON.stringify(data));
};

//SECOND DATABASE
export const readDatabaseTwo = async () => {
  try {
    return await fs.readFile(dataPathTwo, 'utf8');
  } catch (error) {
    await fs.writeFile(dataPathTwo, JSON.stringify([]));
    return await fs.readFile(dataPathTwo, 'utf8');
  }
};

export const writeDatabaseTwo = async (data: any) => {
  await fs.writeFile(dataPathTwo, JSON.stringify(data, null, 3));
};
