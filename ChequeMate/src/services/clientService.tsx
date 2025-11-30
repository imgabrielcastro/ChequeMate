import api from "./api";

export async function getClientes(){
    const response = await api.get("/clients");
    return response.data;
}

export async function postClientes(){
    const response = await api.post("/clients");
    return response.data;
}

export async function getClienteById(id: number){
    const response = await api.get(`/clients/${id}`);
    return response.data;
}