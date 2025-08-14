import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFileUpload } from '../../hooks/useFileUpload';
import { FileRules, FileInfo } from '../../utils/fileValidation';

type Props = {
  label: string;
  rules: FileRules;
  accept?: string;
  placeholder?: string;
  helperWhenEmpty?: string;
  onChange?: (file: FileInfo | null) => void;
};

export const FileUploadField: React.FC<Props> = ({
  label,
  rules,
  accept,
  placeholder = 'Choose a file…',
  helperWhenEmpty = 'Select a file',
  onChange,
}) => {
  const { inputRef, fileInfo, error, open, onChange: handleChange } = useFileUpload(rules);

  React.useEffect(() => { onChange?.(fileInfo ?? null); }, [fileInfo, onChange]);

  return (
    <>
      <TextField
        label={label}
        value={fileInfo?.name ?? ''}
        placeholder={placeholder}
        onClick={open}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <CloudUploadIcon sx={{ color: '#3855b3' }} />
            </InputAdornment>
          ),
          sx: { cursor: 'pointer' },
        }}
        error={!!error}
        helperText={error || (fileInfo ? fileInfo.sizeLabel : helperWhenEmpty)}
        fullWidth
      />
      <input ref={inputRef} type="file" hidden accept={accept} onChange={handleChange} />
    </>
  );
};

export default FileUploadField;

