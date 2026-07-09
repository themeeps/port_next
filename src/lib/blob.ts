import { put, del } from '@vercel/blob';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function uploadProjectImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Image must be JPEG, PNG, WEBP, or GIF.');
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image must be smaller than 5MB.');
  }

  const blob = await put(`projects/${crypto.randomUUID()}-${file.name}`, file, {
    access: 'public',
  });

  return blob.url;
}

export async function deleteProjectImage(url: string | null | undefined): Promise<void> {
  if (!url) return;

  try {
    await del(url);
  } catch (error) {
    console.error('Failed to delete blob:', error);
  }
}
