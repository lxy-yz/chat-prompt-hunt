import cloudinary from '@/lib/cloudinary';

// FormData didn't work for me, so I used a JSON body instead
// https://github.com/vercel/next.js/discussions/48164
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profileImage } = body;

    const { secure_url } = await cloudinary.uploader.upload(profileImage);
    return new Response(JSON.stringify({ url: secure_url }));
  } catch (error) {
    console.error(error);
    return new Response('Server upload error', { status: 500 });
  }
}

async function base64Encode(blob: Blob): Promise<string> {
  const buffer = Buffer.from(await blob.text());
  return 'data:' + blob.type + ';base64,' + buffer.toString('base64');
}
