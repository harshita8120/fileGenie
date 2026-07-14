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
    const errorData = await res.json();
    throw new Error(errorData.error || 'Conversion failed');
  }

  return res.json();
};

export const getDownloadUrl = (downloadUrl: string): string | null => {
  if(downloadUrl!=null){
    return `${API_BASE_URL.replace('/api', '')}${downloadUrl}`;
  }
  return null;
};