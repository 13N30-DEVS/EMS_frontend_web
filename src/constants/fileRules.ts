export const FILE_RULES = {
  workspaceLogo: {
    acceptMime: ['image/png', 'image/jpeg'],
    maxSizeMB: 2,
    minWidth: 64,
    minHeight: 64,
    maxWidth: 1024,
    maxHeight: 1024,
  },
  employeePhoto: {
    acceptMime: ['image/png', 'image/jpeg'],
    maxSizeMB: 2,
    minWidth: 128,
    minHeight: 128,
    maxWidth: 2048,
    maxHeight: 2048,
  },
  employeeDoc: {
    acceptMime: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSizeMB: 10,
  },
} as const;

