import { access, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXTAUTH_URL;

async function generateUniqueFilename(path) {
  // Check if the file already exists
  try {
    await access(path);
    // If the file exists, generate a unique filename by appending a numerical suffix
    const pathInfo = path.split('.');
    const baseName = pathInfo.slice(0, -1).join('.');
    const extension = pathInfo[pathInfo.length - 1];
    let suffix = 1;

    while (true) {
      const uniquePath = `${baseName}-${suffix}.${extension}`;
      try {
        await access(uniquePath);
        suffix++;
      } catch (error) {
        // The unique filename doesn't exist, use it
        return uniquePath;
      }
    }
  } catch (error) {
    // The file doesn't exist, use the original filename
    return path;
  }
}

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({
      message: 'No image found',
      success: false,
    });
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const fileName = file.name;
  const path = `./public/uploads/${fileName}`;
  const uniquePath = await generateUniqueFilename(path);

  await writeFile(uniquePath, buffer);

  const dynamicImageUrl = `${baseUrl}/uploads/${uniquePath.split('/').pop()}`;

  return NextResponse.json({
    message: 'File uploaded',
    success: true,
    imageUrl: dynamicImageUrl,
  });
}
