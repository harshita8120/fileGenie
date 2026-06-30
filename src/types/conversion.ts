export type FileCategory = 'image' | 'document' | 'audio';

export type ImageExtension = '.jpg' | '.jpeg' | '.png' | '.svg' | '.pdf';
export type DocumentExtension = '.docx' | '.pptx' | '.pdf';
export type AudioExtension = '.mp3' | '.wav' | '.flac' | '.aac';

export type FileExtension = ImageExtension | DocumentExtension | AudioExtension;

export interface DropdownConfig {
    id: 'inputFile' | 'outputFile';
    label: string;
    placeholder: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selected: string;
    setSelected: (format: FileExtension) => void;
    ref: React.RefObject<HTMLDivElement | null>;
}