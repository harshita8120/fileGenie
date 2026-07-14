import fs from 'fs/promises';

export async function deleteTempFile(filePath: string): Promise<void> {
  await fs.unlink(filePath).catch(() => {
    console.warn(`Could not delete temp file: ${filePath}`);
  });
}

export async function deleteTempFiles(filePaths: string[]): Promise<void> {
  await Promise.all(filePaths.map((filePath) => deleteTempFile(filePath)));
}