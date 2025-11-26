import api from "./api";

export async function getCheques(){
    const response = await api.get("/cheques");
    return response.data;
}
