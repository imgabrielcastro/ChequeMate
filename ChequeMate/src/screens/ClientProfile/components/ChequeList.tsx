import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native-paper";
import VStack from "../../../components/Stacks/VStack";
import { theme } from "../../../themes/theme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import ChequeValues from "../components/ChequeValues";
import { getChequesByClienteId } from "../../../services/chequesService";

interface Cheque {
  id: number;
  numero_cheque: string;
  valor_com_juros: number;
  vencimento: string;
  status: string;
  cliente_nome: string;
}

interface ChequeListProps {
  clienteId?: number;
}

export default function ChequeList({ clienteId }: ChequeListProps) {
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChequesDoCliente = async () => {
      try {
        if (!clienteId) {
          setLoading(false);
          return;
        }

        const data = await getChequesByClienteId(clienteId);
        setCheques(data);
      } catch (error) {
        console.log("Erro ao carregar cheques do cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChequesDoCliente();
  }, [clienteId]);

  if (!clienteId) {
    return (
      <VStack style={{ padding: 12, gap: 8 }}>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.primary, fontWeight: "bold" }}
        >
          Cheques do Cliente
        </Text>
        <Text
          style={{ textAlign: "center", color: theme.colors.text, padding: 20 }}
        >
          ID do cliente não informado
        </Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <VStack style={{ padding: 12, gap: 8, alignItems: "center" }}>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.primary, fontWeight: "bold" }}
        >
          Cheques do Cliente
        </Text>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </VStack>
    );
  }

  if (!cheques.length) {
    return (
      <VStack style={{ padding: 12, gap: 8 }}>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.primary, fontWeight: "bold" }}
        >
          Cheques do Cliente
        </Text>
        <Text
          style={{ textAlign: "center", color: theme.colors.text, padding: 20 }}
        >
          Nenhum cheque encontrado para este cliente
        </Text>
      </VStack>
    );
  }

  return (
    <VStack style={{ padding: 12, gap: 8 }}>
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.primary, fontWeight: "bold" }}
      >
        Cheques do Cliente ({cheques.length})
      </Text>
      <VStack
        style={{
          backgroundColor: theme.colors.input,
          width: SCREEN_WIDTH * 0.95,
          minHeight: SCREEN_HEIGHT * 0.25,
          borderRadius: 8,
          flexGrow: 1,
        }}
      >
        {cheques.map((cheque) => (
          <ChequeValues key={cheque.id} cheque={cheque} />
        ))}
      </VStack>
    </VStack>
  );
}
