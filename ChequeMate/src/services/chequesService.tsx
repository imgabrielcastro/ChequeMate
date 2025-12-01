import api from "./api";

export async function getCheques() {
  const response = await api.get("/cheques");
  return response.data;
}

export async function getChequesEstatisticas() {
  const response = await api.get(`/cheques/estatisticas`);
  return response.data;
}

export async function getChequesByClienteId(clienteId: number) {
  const todosCheques = await getCheques();
  console.log(
    `Filtrando ${todosCheques.length} cheques para cliente ${clienteId}`
  );
  const chequesDoCliente = todosCheques.filter((cheque: any) => {
    console.log(
      `Cheque ${cheque.id}: cliente_id=${cheque.cliente_id}, match=${
        cheque.cliente_id === clienteId
      }`
    );
    return cheque.cliente_id === clienteId;
  });
  console.log(`Encontrados ${chequesDoCliente.length} cheques`);
  return chequesDoCliente;
}

export async function createCheque(chequeData: any) {
  const response = await api.post("/cheques", chequeData);
  return response.data;
}

export async function getClientesForCheque() {
  const response = await api.get("/clients");
  return response.data;
}

// ✅ NOVAS FUNÇÕES PARA DETALHES E ATUALIZAÇÃO
export async function getChequeById(id: number) {
  const response = await api.get(`/cheques/${id}`);
  return response.data;
}

export async function updateCheque(id: number, chequeData: any) {
  const response = await api.put(`/cheques/${id}`, chequeData);
  return response.data;
}

export async function deleteCheque(id: number) {
  const response = await api.delete(`/cheques/${id}`);
  return response.data;
}

// ✅ FUNÇÕES ESPECÍFICAS PARA STATUS
export async function receberCheque(id: number) {
  const response = await api.put(`/cheques/${id}`, {
    status: "pago",
    data_entrada: new Date().toISOString().split("T")[0], // Data atual
  });
  return response.data;
}

export async function cancelarCheque(id: number) {
  const response = await api.put(`/cheques/${id}`, {
    status: "cancelado",
  });
  return response.data;
}
