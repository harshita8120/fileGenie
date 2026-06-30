import { useState, useEffect, useRef, Fragment } from 'react';
import './FormatSelection.css';

export function FormatSelection() {
    const [activeTab, setActiveTab] = useState('image');

    const [isOpenInput, setIsOpenInput] = useState(false);
    const [selectedFormatInput, setSelectedFormatInput] = useState('');

    const [isOpenOutput, setIsOpenOutput] = useState(false);
    const [selectedFormatOutput, setSelectedFormatOutput] = useState('');

    const imageFormats = ['.jpg', '.jpeg', '.png', '.svg', '.pdf'];
    const documentFormats = ['.docx', '.pptx', '.pdf'];
    const audioFormats = ['.mp3', '.wav', '.flac', '.aac'];

    const currentFormats = activeTab === 'image' ? imageFormats : activeTab === 'document' ? documentFormats : audioFormats;

    const inputDropdownRef = useRef<HTMLDivElement>(null);
    const outputDropdownRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
        setIsOpenInput(false);
        setSelectedFormatInput('');
        setIsOpenOutput(false);
        setSelectedFormatOutput('');
    };

    // Global click listener to close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (inputDropdownRef.current && !inputDropdownRef.current.contains(event.target as Node)) {
                setIsOpenInput(false);
            }
            if (outputDropdownRef.current && !outputDropdownRef.current.contains(event.target as Node)) {
                setIsOpenOutput(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdowns = [
        {
            id: 'inputFile',
            label: 'From:',
            placeholder: 'Select your file format',
            isOpen: isOpenInput,
            setIsOpen: setIsOpenInput,
            selected: selectedFormatInput,
            setSelected: setSelectedFormatInput,
            ref: inputDropdownRef
        },
        {
            id: 'outputFile',
            label: 'To:',
            placeholder: 'Select the required file format',
            isOpen: isOpenOutput,
            setIsOpen: setIsOpenOutput,
            selected: selectedFormatOutput,
            setSelected: setSelectedFormatOutput,
            ref: outputDropdownRef
        }
    ];

    return (
        <div className="formatSelection">
            <div className="format-type-box">
                <button 
                    type="button"
                    className={`mode-card ${activeTab === 'image' ? 'active' : 'inactive'}`}
                    onClick={() => handleTabChange('image')}
                >Image
                </button>
                
                <button 
                    type="button"
                    className={`mode-card ${activeTab === 'document' ? 'active' : 'inactive'}`}
                    onClick={() => handleTabChange('document')}
                >Document
                </button>

                <button 
                    type="button"
                    className={`mode-card ${activeTab === 'audio' ? 'active' : 'inactive'}`}
                    onClick={() => handleTabChange('audio')}
                >Audio
                </button>
            </div>

            <div className="selectors-row">
                {dropdowns.map((dropdown, index) => (
                    <Fragment key={dropdown.id}>
                        <label htmlFor={dropdown.id} className='fileLabel'>{dropdown.label}</label>

                        <div className='dropdown-wrapper' ref={dropdown.ref}>
                            <input type="hidden" name={dropdown.id} value={dropdown.selected} />
                            
                            <div className='dropdown-selector-box' onClick={() => dropdown.setIsOpen(!dropdown.isOpen)}>
                                {dropdown.selected === '' ? dropdown.placeholder : dropdown.selected}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                                </svg>
                            </div>

                            {dropdown.isOpen && (
                                <div className="dropdown-list">
                                    <ul>
                                        {currentFormats.map((format) => (
                                            <li 
                                                key={format} 
                                                className="dropdown-item"
                                                onClick={() => {
                                                    dropdown.setSelected(format);
                                                    dropdown.setIsOpen(false);
                                                }}
                                            >
                                                {format}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {index === 0 && (
                            <svg className="directional-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path>
                            </svg>
                        )}
                    </Fragment>
                ))}
            </div>
            
        </div>
    );
}