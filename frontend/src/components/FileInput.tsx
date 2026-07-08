import type { FileExtension } from '../types/conversion';
import './FileInput.css';

interface FileInputProps {
    selectedFormatInput: FileExtension | '';
    uploadedFile: File | null;
    setUploadedFile: (file: File | null) => void;
    isUploadDisabled: boolean;
    onUploadClick: () => boolean;
}

export function FileInput({ 
    selectedFormatInput, 
    uploadedFile, 
    setUploadedFile, 
    isUploadDisabled,
    onUploadClick
}: FileInputProps){
    return (
        <div className={`upload-container ${isUploadDisabled ? 'disabled' : ''}`}>
            <label 
                htmlFor="file-upload" 
                className="custom-upload-box"
                onClick={(e) => {
                    if (isUploadDisabled) {
                        e.preventDefault(); // Stop file browser from opening
                        onUploadClick();    // Trigger validation alerts
                    }
                }}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="upload-icon"
                >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
                <span className="upload-text">
                    {uploadedFile ? uploadedFile.name : "Upload File"}
                </span>
            </label>
            
            <input 
                type="file" 
                id="file-upload" 
                name="file-upload" 
                className="hidden-input" 
                disabled={isUploadDisabled}
                accept={selectedFormatInput}
                onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setUploadedFile(file);
                }}
            />
        </div>
        
    );
}
