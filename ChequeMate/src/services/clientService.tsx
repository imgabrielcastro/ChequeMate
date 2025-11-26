import api from "./api";

export async function getClientes(){
    const response = await api.get("/clients");
    return response.data;
}