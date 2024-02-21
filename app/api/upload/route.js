// api/upload/route.js
import { writeFile } from 'fs/promises';
import { NextResponse } from "next/server";

// Define your base URL here based on your deployment environment
const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://your-production-url.com'
    : 'http://localhost:3000'; // Adjust for your development environment

export async function POST(req) {
    const data = await req.formData();
    const file = data.get('file');
    
    if (!file) {
        return NextResponse.json({"message": "No image found", success: false});
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const fileName = file.name;
    const path = `./public/uploads/${fileName}`;

    await writeFile(path, buffer);

    // Construct the image URL dynamically based on the server's response
    const dynamicImageUrl = `${baseUrl}/uploads/${fileName}`;

    return NextResponse.json({"message": "File uploaded", success: true, imageUrl: dynamicImageUrl});
}
