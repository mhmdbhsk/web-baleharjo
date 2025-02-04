// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import { encode } from 'blurhash';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js's default body parser so formidable can handle the multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to compute the blurhash from an image buffer using sharp.
// The image is resized to a manageable size for blurhash encoding.
const getBlurhash = async (buffer: Buffer): Promise<string> => {
  const { data, info } = await sharp(buffer)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });
  // Encode with 4x4 components; adjust component counts as needed
  return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const publicId = formData.get('public_id') as string | null;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary using buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId || undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Write buffer to stream
      uploadStream.write(buffer);
      uploadStream.end();
    });

    // Generate blurhash
    const blurhash = await getBlurhash(buffer);

    return NextResponse.json({
      url: (uploadResult as any).secure_url,
      blurhash,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
