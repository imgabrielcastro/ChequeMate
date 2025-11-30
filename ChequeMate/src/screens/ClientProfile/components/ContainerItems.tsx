// ContainerItems.tsx
import VStack from "../../../components/Stacks/VStack";
import { theme } from "../../../themes/theme";
import { Text } from "react-native-paper";
import NameAndNumber from "./NameAndNumber";
import ChequeList from "./ChequeList";

interface ContainerItemsProps {
  cliente?: {
    id: number;
    nome: string;
    telefone: string;
    cpf_cnpj: string;
  };
}

export default function ContainerItems({ cliente }: ContainerItemsProps) {
  if (!cliente) {
    return (
      <VStack
        style={{
          backgroundColor: theme.colors.secondary,
          width: "100%",
          marginBottom: 16,
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Cliente não encontrado</Text>
      </VStack>
    );
  }

  return (
    <VStack
      style={{
        backgroundColor: theme.colors.secondary,
        width: "100%",
        marginBottom: 16,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <NameAndNumber cliente={cliente} />
      <ChequeList clienteId={cliente.id} />
    </VStack>
  );
}
