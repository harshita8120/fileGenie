import { useState} from 'react';
import {FileInput} from './FileInput';
import {FormatSelection} from './FormatSelection';
import type { FileExtension } from '../types/conversion';
import { differentFormat, formatNotSelected, fileNotUploaded } from '../utils/validation';
import './Content.css';

export function Content() {
    const [selectedFormatInput, setSelectedFormatInput] = useState<FileExtension | ''>('');
    const [selectedFormatOutput, setSelectedFormatOutput] = useState<FileExtension | ''>('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const isUploadDisabled = !selectedFormatInput || !selectedFormatOutput;
    const isConvertDisabled = isUploadDisabled || !uploadedFile;

    const handleUploadClick = (): boolean => {
        return formatNotSelected(selectedFormatInput, selectedFormatOutput);
    };

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        // Run validations on form submit to prevent unnecessary spamming during render loops
        if (!formatNotSelected(selectedFormatInput, selectedFormatOutput)) {
            e.preventDefault(); 
            return;
        }
        if (!differentFormat(selectedFormatInput, selectedFormatOutput)) {
            e.preventDefault(); 
            return;
        }
        if (!fileNotUploaded(uploadedFile, selectedFormatInput)) {
            e.preventDefault(); 
            return;
        }
    };

    return (
        <div className="content">

            <div className="wave-divider wave-top">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
                </svg>
            </div>

            <p className='ad-text'>
                100% Free & Secure
                <br />
                No Ads, No Cookie Tracking
                <br />
                Hassle-free File Conversion
            </p>

            <hr className="wavy-hr"/>

            <form action="/conversion" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>

                <p className='heading'>Select your file type:</p>

                <FormatSelection 
                    selectedFormatInput={selectedFormatInput}
                    setSelectedFormatInput={setSelectedFormatInput}
                    selectedFormatOutput={selectedFormatOutput}
                    setSelectedFormatOutput={setSelectedFormatOutput}
                    setUploadedFile={setUploadedFile}
                />

                <FileInput 
                    selectedFormatInput={selectedFormatInput}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    isUploadDisabled={isUploadDisabled}
                    onUploadClick={handleUploadClick}
                />
                <button 
                    type="submit" 
                    className={`convert-btn ${isConvertDisabled ? 'disabled' : ''}`}
                    onClick={(e) => {
                        if (!formatNotSelected(selectedFormatInput, selectedFormatOutput)) {
                            e.preventDefault();
                            return;
                        }

                        if (!fileNotUploaded(uploadedFile, selectedFormatInput)) {
                            e.preventDefault();
                            return;
                        }
                    }}
                >Convert</button>
            </form>

            <div className="wave-divider wave-bottom">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#ffffff"></path>
                </svg>
            </div>

        </div>
    );
}