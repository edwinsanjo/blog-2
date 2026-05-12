import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const vaultPath = path.join(process.cwd(), 'vault');

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const filePath = path.join(vaultPath, ...slug);

  try {
    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] ?? `image/${ext.substring(1)}`;

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(stat.size),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch {
    return new NextResponse('Image not found', { status: 404 });
  }
}
