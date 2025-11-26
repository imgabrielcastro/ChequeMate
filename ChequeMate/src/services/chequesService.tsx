import api from "./api";

export async function getCheques(){
    const response = await api.get("/cheques");
    return response.data;
}

export async function getChequesEstatisticas(){
    const response = await api.get(`/cheques/estatisticas`);
    return response.data;
}

 