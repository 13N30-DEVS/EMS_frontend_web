export type FileRules = {
  acceptMime?: ReadonlyArray<string>;
  maxSizeMB?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
};

export type FileInfo = {
  file: File;
  name: string;
  sizeBytes: number;
  sizeLabel: string;
  previewUrl?: string;
  width?: number;
  height?: number;
};

export async function validateFile(
  file: File,
  rules: FileRules
): Promise<{ ok: true; info: FileInfo } | { ok: false; error: string }> {
  const { acceptMime, maxSizeMB, minWidth, maxWidth, minHeight, maxHeight } =
    rules;

  if (acceptMime && !acceptMime.includes(file.type)) {
    return { ok: false, error: 'Unsupported file type' };
  }

  if (typeof maxSizeMB === 'number' && file.size > maxSizeMB * 1024 * 1024) {
    return { ok: false, error: `File size must be <= ${maxSizeMB}MB` };
  }

  const sizeLabel = `${Math.round(file.size / 1024)} KB`;

  const needsDimensions =
    (typeof minWidth === 'number' ||
      typeof maxWidth === 'number' ||
      typeof minHeight === 'number' ||
      typeof maxHeight === 'number') &&
    file.type.startsWith('image/');

  if (!needsDimensions) {
    return {
      ok: true,
      info: { file, name: file.name, sizeBytes: file.size, sizeLabel },
    };
  }

  const url = URL.createObjectURL(file);
  try {
    const dims = await new Promise<{ width: number; height: number }>(
      (resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = url;
      }
    );

    const tooSmall =
      (typeof minWidth === 'number' && dims.width < minWidth) ||
      (typeof minHeight === 'number' && dims.height < minHeight);
    const tooLarge =
      (typeof maxWidth === 'number' && dims.width > maxWidth) ||
      (typeof maxHeight === 'number' && dims.height > maxHeight);

    if (tooSmall || tooLarge) {
      URL.revokeObjectURL(url);
      return {
        ok: false,
        error: `Image must be between ${minWidth ?? 0}x${minHeight ?? 0} and ${maxWidth ?? '∞'}x${maxHeight ?? '∞'} px`,
      };
    }

    return {
      ok: true,
      info: {
        file,
        name: file.name,
        sizeBytes: file.size,
        sizeLabel,
        previewUrl: url,
        width: dims.width,
        height: dims.height,
      },
    };
  } catch {
    URL.revokeObjectURL(url);
    return { ok: false, error: 'Unable to read image' };
  }
}
