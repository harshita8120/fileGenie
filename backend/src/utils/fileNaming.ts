import path from 'path';

export const buildDownloadFileName = (originalName: string, outputFormat: string): string => {
  const nameWithoutExt = path.parse(originalName).name;
  return `${nameWithoutExt}-converted.${outputFormat}`;
};