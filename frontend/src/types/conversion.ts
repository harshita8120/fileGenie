export type FileCategory = 'image' | 'document' | 'audio';

export type ImageExtension = '.jpeg'| '.jpg' | '.png' | '.webp'| '.avif'| '.tiff' | '.gif';
export type DocumentInputExtension = '.docx' | '.pptx' | '.xlsx' | '.txt';
export type DocumentOutputExtension = '.pdf';
export type AudioExtension = '.mp3' | '.wav' | '.flac' | '.aac' | '.ogg' | '.m4a' | '.opus';

export type FileExtension_INPUT = ImageExtension | DocumentInputExtension | AudioExtension;
export type FileExtension_OUTPUT = ImageExtension | DocumentOutputExtension | AudioExtension;

export type FileConversionStatus = 'idle' | 'converting' | 'ready';

export interface DropdownConfig {
    id: 'inputFile' | 'outputFile';
    label: string;
    placeholder: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selected: string;
    setSelected: (format: FileExtension_INPUT | FileExtension_OUTPUT) => void;
    ref: React.RefObject<HTMLDivElement | null>;
    options: (FileExtension_INPUT | FileExtension_OUTPUT)[];
}