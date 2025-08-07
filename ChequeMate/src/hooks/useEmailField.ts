import { useState } from 'react';
import { isValidEmail } from '../utils/validators';

export function useEmailField() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onChange = (value: string) => {
    setEmail(value);
    if (!isValidEmail(value)) {
      setError('Insira um e-mail válido');
    } else {
      setError('');
    }
  };

  return {
    email,
    error,
    onChange,
  };
}