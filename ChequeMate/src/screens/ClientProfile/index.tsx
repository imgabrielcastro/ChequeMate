import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native-paper";
import { theme } from "../../themes/theme";
import BackAndTitle from "../../components/Texts/BackAndTitle";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ContainerItems from "./components/ContainerItems";
import VStack from "../../components/Stacks/VStack";
import { ScrollView } from "react-native-gesture-handler";
import { getClienteById } from "../../services/clientService";
import { RouteProp, useRoute } from "@react-navigation/native";

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  cpf_cnpj: string;
}

type RouteParams = {
  ClientProfile: {
    clienteId: number;
  };
};

const ClientProfile = ({ navigation }: { navigation: any }) => {
  const route = useRoute<RouteProp<RouteParams, "ClientProfile">>();
  const { clienteId } = route.params || {};

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("🔍 clienteId recebido:", clienteId);

  useEffect(() => {
    const loadClienteData = async () => {
      try {
        if (!clienteId) {
          console.log("❌ clienteId é undefined");
          setLoading(false);
          return;
        }

        console.log("Buscando cliente com ID:", clienteId);
        const data = await getClienteById(clienteId);
        setCliente(data);
        console.log("Dados do cliente:", data);
      } catch (error) {
        console.log("Erro ao carregar dados do cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClienteData();
  }, [clienteId]);

  if (loading) {
    return (
      <VStack
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text>Carregando...</Text>
      </VStack>
    );
  }

  if (!cliente) {
    return (
      <VStack
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Cliente não encontrado</Text>
      </VStack>
    );
  }

  return (
    <VStack style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <VStack style={{ padding: 12 }}>
        <BackAndTitle
          title="Perfil"
          icon={faArrowLeft}
          navigation={navigation}
        />
      </VStack>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ContainerItems cliente={cliente} />
      </ScrollView>
    </VStack>
  );
};

export default ClientProfile;
