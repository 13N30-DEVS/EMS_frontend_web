export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required';
  if (!PASSWORD_REGEX.test(password)) {
    return 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
  }
  return undefined;
}
