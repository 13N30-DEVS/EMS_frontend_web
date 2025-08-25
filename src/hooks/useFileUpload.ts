import { useEffect, useRef, useState } from 'react';

import { FileRules, FileInfo, validateFile } from '../utils/fileValidation';

export function useFileUpload(rules: FileRules) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string | undefined>();

  const open = () => inputRef.current?.click();

  const clear = () => {
    if (fileInfo?.previewUrl) URL.revokeObjectURL(fileInfo.previewUrl);
    setFileInfo(null);
    setError(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await validateFile(file, rules);
    if (!result.ok) {
      clear();
      setError(result.error);
      return;
    }

    if (fileInfo?.previewUrl) URL.revokeObjectURL(fileInfo.previewUrl);
    setFileInfo(result.info);
    setError(undefined);
  };

  useEffect(
    () => () => {
      if (fileInfo?.previewUrl) URL.revokeObjectURL(fileInfo.previewUrl);
    },
    [fileInfo?.previewUrl]
  );

  return { inputRef, fileInfo, error, open, clear, onChange };
}
