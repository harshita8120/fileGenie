const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4500/api';

export interface ConvertFileResponse {
  fileId: string;
  downloadUrl: string;
  downloadFileName: string;
  expiresAt: string;
}

export const convertFile = async (
  fileType: 'image' | 'document' | 'audio',
  file: File,
  targetFormat: string
): Promise<ConvertFileResponse> => {
  const formData = new FormData();
  formData.append(fileType, file);
  formData.append('targetFormat', targetFormat.replace('.', ''));

  const res = await fetch(`${API_BASE_URL}/${fileType}s/convert`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    let errorMessage = 'Conversion failed';
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorMessage;
    } catch {
      // If it's HTML, extract text or fall back to the status text
      errorMessage = `Server Error (${res.status}): ${res.statusText}`;
      console.error("Backend HTML Error Page Summary:", errorText.substring(0, 300));
    }
    
    throw new Error(errorMessage);
  }

  return res.json();
};

export const getDownloadUrl = (downloadUrl: string): string | null => {
  if(downloadUrl!=null){
    return `${API_BASE_URL.replace('/api', '')}${downloadUrl}`;
  }
  return null;
};