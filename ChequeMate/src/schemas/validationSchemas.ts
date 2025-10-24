import * as yup from 'yup';

export const emailSchema = yup.object({
  email: yup
    .string()
    .email('Insira um e-mail válido')
    .required('Informe seu e-mail'),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Informe sua senha'),
});

export const loginSchema = emailSchema.concat(passwordSchema);

export type EmailFormData = yup.InferType<typeof emailSchema>;
export type PasswordFormData = yup.InferType<typeof passwordSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;