import  api  from "../services/api";

export async function loginService(email: string, senha: string) {
  const response = await api.post("/users/login", { email, senha });
  return response.data;
}
