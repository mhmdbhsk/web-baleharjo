// hooks/useCloudinaryUpload.ts
import { useState } from 'react';

interface UploadResult {
  url: string;
  blurhash: string;
}

export function useCloudinaryUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, publicId?: string): Promise<UploadResult> => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    if (publicId) {
      formData.append('public_id', publicId);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      setIsLoading(false);
      return data as UploadResult;
    } catch (err: any) {
      setError(err.message || 'Error during upload');
      setIsLoading(false);
      throw err;
    }
  };

  return { uploadImage, isLoading, error };
}
