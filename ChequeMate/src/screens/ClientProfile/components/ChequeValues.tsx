import { theme } from "../../../themes/theme";
import { Text } from "react-native-paper";
import VStack from "../../../components/Stacks/VStack";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import HStack from "../../../components/Stacks/HStack";

interface Cheque {
  id: number;
  numero_cheque: string;
  valor_com_juros: number;
  vencimento: string;
  status: string;
}

interface ChequeValuesProps {
  cheque: Cheque;
}

export default function ChequeValues({ cheque }: ChequeValuesProps) {
  const formatarData = (dataISO: string) => {
    if (!dataISO) return "Data não informada";
    try {
      const data = new Date(dataISO);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    } catch {
      return dataISO;
    }
  };

  const getCorStatus = (status: string) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "pago":
      case "recebido":
        return "#4CAF50";
      case "pendente":
        return "#FF9800";
      case "vencido":
      case "devolvido":
        return "#F44336";
      default:
        return theme.colors.text;
    }
  };

  return (
    <VStack
      style={{
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH * 0.95,
        backgroundColor: theme.colors.input,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        shadowColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <HStack style={{ justifyContent: "space-between", width: "100%" }}>
        <VStack style={{ alignItems: "flex-start" }}>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            {formatarData(cheque.vencimento)}
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 12 }}>
            Nº: {cheque.numero_cheque}
          </Text>
        </VStack>

        <VStack style={{ alignItems: "flex-end" }}>
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
            R$ {cheque.valor_com_juros || "0,00"}
          </Text>
          <Text
            style={{
              color: getCorStatus(cheque.status),
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {cheque.status?.toUpperCase() || "Pendente"}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
