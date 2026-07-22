export type DocumentFormat =
  'docx' | 'pptx' | 'pdf' | 'txt' | 'xlsx';

export const SUPPORTED_DOCUMENT_INPUT_FORMATS: string[] = [
  'docx', 'pptx', 'txt', 'xlsx', 'doc', 'ppt', 'xls',
] as const;

export interface DocumentConversionOptions {
  // Document conversion doesn't have tunable quality/size knobs like image/audio —
  // it's primarily format transformation. Leave empty for now
}

export interface DocumentConversionRequestBody {
  targetFormat: DocumentFormat;
}