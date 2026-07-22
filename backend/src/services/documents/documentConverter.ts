import path from 'path';
import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import { DocumentFormat } from '../../types/document.types.js';
import { deleteTempFiles } from '../../utils/instantCleanup.js';

const TEMP_DIR = path.resolve('temp');
const SCRATCH_DIR = path.join(TEMP_DIR, 'scratch');
const GOTENBERG_URL = process.env.GOTENBERG_URL || 'http://localhost:3000';

const OFFICE_FORMATS = ['docx', 'pptx', 'txt', 'xlsx', 'doc', 'ppt', 'xls'];

export class DocumentConverter {
  private buffer: Buffer;
  private originalFormat: string;

  constructor(buffer: Buffer, originalFormat: string) {
    this.buffer = buffer;
    this.originalFormat = originalFormat;
  }

  private validateTargetFormat(targetFormat: DocumentFormat): void {
    const isOfficeToPdf = OFFICE_FORMATS.includes(this.originalFormat) && targetFormat === 'pdf';

    if (!isOfficeToPdf) {
      throw new Error(
        `Conversion from ${this.originalFormat} to ${targetFormat} is not supported`
      );
    }
  }

  async convert(targetFormat: DocumentFormat): Promise<Buffer> {
    this.validateTargetFormat(targetFormat);

    const inputFileName = `input-${randomUUID()}.${this.originalFormat}`;
    const inputPath = path.join(SCRATCH_DIR, inputFileName);
    await fs.writeFile(inputPath, this.buffer);

    const resultBuffer = await this._convertOfficeToPdf(inputPath);

    await deleteTempFiles([inputPath]);
    return resultBuffer;
  }

  private async _convertOfficeToPdf(inputPath: string): Promise<Buffer> {
    const fileBuffer = await fs.readFile(inputPath);
    const fileName = path.basename(inputPath);

    const formData = new FormData();
    formData.append('files', new Blob([fileBuffer]), fileName);

    const response = await fetch(`${GOTENBERG_URL}/forms/libreoffice/convert`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gotenberg conversion failed: ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}