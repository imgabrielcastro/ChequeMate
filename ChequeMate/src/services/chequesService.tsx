import api from "./api";

export async function getCheques(){
    const response = await api.get("/cheques");
    return response.data;
}

export async function getChequesEstatisticas(){
    const response = await api.get(`/cheques/estatisticas`);
    return response.data;
}

export async function getChequesByClienteId(clienteId: number) {
    const todosCheques = await getCheques();
    console.log(`Filtrando ${todosCheques.length} cheques para cliente ${clienteId}`);
    const chequesDoCliente = todosCheques.filter((cheque: any) => {
        console.log(`Cheque ${cheque.id}: cliente_id=${cheque.cliente_id}, match=${cheque.cliente_id === clienteId}`);
        return cheque.cliente_id === clienteId;
    });
    console.log(`Encontrados ${chequesDoCliente.length} cheques`);
    return chequesDoCliente;
}