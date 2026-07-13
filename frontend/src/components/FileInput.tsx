import type { FileExtension } from '../types/conversion';
import './FileInput.css';

interface FileInputProps {
    selectedFormatInput: FileExtension | '';
    uploadedFile: File | null;
    setUploadedFile: (file: File | null) => void;
    isUploadDisabled: boolean;
    onUploadClick: () => boolean;
    downloadUrl: string | null;
    convertedFileName: string | null;
    disabled: boolean;
}



export function FileInput({ 
    selectedFormatInput, 
    uploadedFile, 
    setUploadedFile, 
    isUploadDisabled,
    onUploadClick,
    downloadUrl,
    convertedFileName, 
    disabled
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
                    className={uploadedFile? "upload-icon-hidden" : "upload-icon"}
                >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={uploadedFile && !downloadUrl ? "replace-icon" : "replace-icon-hidden"}
                >
                    <path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z"></path>
                </svg>

                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={downloadUrl? "downlad-done-icon" : "download-done-icon-hidden"}
                >
                    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z"></path>
                </svg>

                <span className={uploadedFile ? "uploadedFile-text" : "upload-text"}>
                    {downloadUrl ? convertedFileName : uploadedFile ? uploadedFile.name : "Upload File"}
                </span>
            </label>
            
            <input 
                type="file" 
                id="file-upload" 
                name="file-upload" 
                className="hidden-input" 
                disabled={isUploadDisabled || disabled}
                accept={selectedFormatInput}
                onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setUploadedFile(file);
                }}
            />
        </div>
        
    );
}
