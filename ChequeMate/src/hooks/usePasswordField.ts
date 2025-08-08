import { useState } from 'react';

export function usePasswordField() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (value: string) => {
    setPassword(value);
    if (!value.trim()) {
      setError('Informe sua senha');
    } else {
      setError('');
    }
  };

  return {
    password,
    error,
    onChange,
    setError
  };
}
