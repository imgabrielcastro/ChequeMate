// services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.16.114:5000/api",  
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("🔐 Token no interceptor:", token); // DEBUG
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token adicionado aos headers"); // DEBUG
    } else {
      console.log("❌ Token não encontrado no AsyncStorage"); // DEBUG
    }
  } catch (error) {
    console.log("❌ Erro ao buscar token:", error); // DEBUG
  }

  console.log("📤 Headers da requisição:", config.headers); // DEBUG
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Resposta recebida:", response.status);
    return response;
  },
  (error) => {
    console.log("❌ Erro na resposta:", {
      status: error.response?.status,
      message: error.response?.data,
      headers: error.config?.headers
    });
    return Promise.reject(error);
  }
);

export default api;