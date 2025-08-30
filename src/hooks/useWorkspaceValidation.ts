import { useState, useCallback } from 'react';

import { validatePassword } from '../utils/passwordValidation';

export interface WorkspaceForm {
  workspace: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
  logo: File | null;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

const roles = ['Admin'];

export const useWorkspaceValidation = (initialForm: WorkspaceForm) => {
  const [form, setForm] = useState<WorkspaceForm>(initialForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      switch (name) {
        case 'workspace':
          if (!value) return 'Workspace name is required';
          if (value.length < 3) return 'Name must be at least 3 characters';
          if (value.length > 50) return 'Name is too long';
          return undefined;
        case 'name':
          if (!value) return 'Name is required';
          if (!/^[A-Za-z ]+$/.test(value))
            return 'Name must contain only letters and spaces';
          return undefined;
        case 'password':
          return validatePassword(value);
        case 'confirmPassword':
          if (!value) return 'Please confirm your password';
          return value === form.password ? undefined : 'Passwords do not match';
        case 'role':
          return value ? undefined : 'Role is required';
        default:
          return undefined;
      }
    },
    [form.password]
  );

  const validate = useCallback((): boolean => {
    const tempErrors: ValidationErrors = {
      workspace: validateField('workspace', form.workspace),
      name: validateField('name', form.name),
      password: validateField('password', form.password),
      confirmPassword: validateField('confirmPassword', form.confirmPassword),
      role: validateField('role', form.role),
      logo: form.logo ? undefined : 'Logo is required',
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === undefined);
  }, [form, validateField]);

  return {
    form,
    setForm,
    errors,
    setErrors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validateField,
    validate,
  };
};

export { roles };
