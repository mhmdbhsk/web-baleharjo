import { encode } from 'blurhash';

export async function generateBlurHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    image.onload = () => {
      const width = 32; // small size for blurhash
      const height = Math.round((width * image.height) / image.width);
      
      canvas.width = width;
      canvas.height = height;
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(image, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const blurhash = encode(
        imageData.data,
        imageData.width,
        imageData.height,
        4,
        4
      );
      
      resolve(blurhash);
    };
    
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}