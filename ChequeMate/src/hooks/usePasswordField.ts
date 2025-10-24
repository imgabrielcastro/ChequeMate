import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema, PasswordFormData } from '../schemas/validationSchemas';

export function usePasswordField() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const password = watch('password') || '';
  const error = errors.password?.message;

  const onChange = (value: string) => {
    setValue('password', value, { shouldValidate: true });
  };

  return {
    password,
    error,
    onChange,
    handleSubmit,
    register,
  };
}