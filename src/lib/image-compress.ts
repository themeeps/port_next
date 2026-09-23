/**
 * Client-side only. Downscales + re-encodes an image as WebP before upload,
 * so large screenshots don't get stored (and later served) at full source
 * resolution. Falls back to the original file if compression fails or
 * doesn't actually shrink it — never blocks the upload.
 */
export async function compressImage(file: File, maxWidth = 1600, quality = 0.8): Promise<File> {
  // Animated GIFs would lose their animation if redrawn to a canvas.
  if (file.type === 'image/gif') return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxWidth / bitmap.width);
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, '') + '.webp';
    return new File([blob], newName, { type: 'image/webp' });
  } catch (error) {
    console.error('Image compression failed, using original file:', error);
    return file;
  }
}
