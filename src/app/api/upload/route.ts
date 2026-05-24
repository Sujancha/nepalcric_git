import { NextRequest, NextResponse } from 'next';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/images/uploads
    const filename = `${Date.now()}-${file.name.replace(/\\s+/g, '-')}`;
    const publicPath = join('images', 'uploads', filename);
    const filepath = join(process.cwd(), 'public', publicPath);

    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/${publicPath.replace(/\\\\/g, '/')}` 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
