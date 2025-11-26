import React, { useEffect, useState } from "react";
import { theme } from "../../../themes/theme";
import HStack from "../../../components/Stacks/HStack";
import { Text } from "react-native-paper";
import { getCheques } from "../../../services/chequesService";

interface ReciveInMonthProps {
  name: string;
  value: string;
}

interface Cheque {
  id: number;
  cliente_nome: string;
  numero_cheque: string;
  data_cheque: string;
  valor_original: number;
  status: string;
  vencimento: string;
}

export default function ReciveInMonth({ name, value }: ReciveInMonthProps) {
  const [cheques, setCheques] = useState<Cheque[]>([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getCheques();
          setCheques(data);
          console.log(data);
        } catch (err) {
          console.log("Erro ao carregar cheques:", err);
        }
      }
      fetchData();
    }, []);
  
  return (
    <HStack
      style={{
        justifyContent: "space-between",
        backgroundColor: theme.colors.input,
        padding: 20,
        margin: 10,
        borderRadius: 12,

        shadowColor: "#111112",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 24,
        
      }}
    >
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.text, fontWeight: "bold" }}
      >
        {name}
      </Text>
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.primary, fontWeight: "bold" }}
      >
        R${value},00
      </Text>
    </HStack>
  );
}
