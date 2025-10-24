import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema, EmailFormData } from '../schemas/validationSchemas';

export function useEmailField() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  });

  const email = watch('email') || '';
  const error = errors.email?.message;

  const onChange = (value: string) => {
    setValue('email', value, { shouldValidate: true });
  };

  return {
    email,
    error,
    onChange,
    handleSubmit,
    register,
  };
}