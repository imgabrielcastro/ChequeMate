import api from "./api";

export interface ClienteData {
  nome: string;
  telefone: string;
  cpf_cnpj?: string;
  email?: string;
  data_nascimento?: string;
}

export async function getClientes() {
  const response = await api.get("/clients");
  return response.data;
}

export async function postClientes(clienteData: ClienteData) {
  const response = await api.post("/clients", clienteData);
  return response.data;
}

export async function getClienteById(id: number) {
  const response = await api.get(`/clients/${id}`);
  return response.data;
}
