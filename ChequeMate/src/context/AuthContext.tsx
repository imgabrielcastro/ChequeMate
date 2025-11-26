import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api  from "../services/api";

interface AuthContextData {
  user: any;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadStoredData() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    loadStoredData();
  }, []);

  async function login(email: string, senha: string) {
    const response = await api.post("/users/login", { email, senha });

    const token = response.data.token;
    const user = response.data.user;

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setToken(token);
    setUser(user);
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
