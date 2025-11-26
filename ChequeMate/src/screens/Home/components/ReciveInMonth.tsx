import React, { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import HStack from "../../../components/Stacks/HStack";
import { Text, ActivityIndicator } from "react-native-paper";
import { getCheques } from "../../../services/chequesService";
import VStack from "../../../components/Stacks/VStack";

interface Cheque {
  id: number;
  cliente_nome: string;
  valor_com_juros: number;  
}

export default function ReciveInMonth() {
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCheques();
        setCheques(data);
      } catch (err) {
        console.log("Erro ao carregar cheques:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <VStack style={{ 
        justifyContent: "center", 
        alignItems: "center",
        padding: 20 
      }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </VStack>
    );
  }

  if (!cheques.length) {
    return (
      <VStack style={{ 
        justifyContent: "center", 
        alignItems: "center",
        padding: 20 
      }}>
        <Text variant="titleMedium">Nenhum cheque encontrado</Text>
      </VStack>
    );
  }

  return (
    <VStack>
      {cheques.map((item) => (
        <HStack
          key={item.id.toString()}
          style={{
            justifyContent: "space-between",
            backgroundColor: theme.colors.input,
            padding: 16,
            marginHorizontal: 16,
            marginVertical: 6,
            borderRadius: 12,
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.text, fontWeight: "bold" }}
          >
            {item.cliente_nome}
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            R$ {item.valor_com_juros || '0,00'}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}