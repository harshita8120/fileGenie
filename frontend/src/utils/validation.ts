export function differentFormat(inputFormat: string, outputFormat: string): boolean {
    if (inputFormat === outputFormat){
        alert("Input and Output File format cannot be same.");
        return false;
    }

    return true;
}

export function formatNotSelected(inputFormat: string, outputFormat: string): boolean {
    if (!inputFormat){
        alert("Please select the format of the file to be uploaded");
        return false;
    }

    if (!outputFormat){
        alert("Please select the target format for conversion.");
        return false;
    }

    return true;
}

export function fileNotUploaded(uploadedFile: File | null, inputFormat: string): boolean {
    if (!uploadedFile){
        alert("Please upload a file.");
        return false;
    }

    const fileExtension = `.${uploadedFile.name.split('.').pop()?.toLowerCase()}`;

    if(inputFormat != fileExtension){
        alert(`The uploaded file format (${fileExtension}) does not match your selected input format (${inputFormat}).`);
        return false;
    }

    return true;
}