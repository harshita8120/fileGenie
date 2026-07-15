export type DocumentFormat =
  | 'docx' | 'pptx' | 'pdf';

export const SUPPORTED_IMAGE_Document_FORMATS: string[] = [
  'docx', 'pptx', 'pdf', 'doc', 'ppt',
] as const;

export interface DocumentConversionOptions {
  // Document conversion doesn't have tunable quality/size knobs like image/audio —
  // it's primarily format transformation. Leave empty for now
}

export interface DocumentConversionRequestBody {
  targetFormat: DocumentFormat;
}