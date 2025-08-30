import { useState, useCallback } from 'react';

export const useForgotPasswordValidation = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = useCallback((value: string) => {
    const isValid = !!value && /\S+@\S+\.\S+/.test(value);
    setError(isValid ? '' : 'Please enter a valid email address');
    return isValid;
  }, []);

  const onEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      validateEmail(value);
    },
    [validateEmail]
  );

  const isEmailValid = !!email && /\S+@\S+\.\S+/.test(email);

  return { email, error, isEmailValid, validateEmail, onEmailChange, setError };
};
