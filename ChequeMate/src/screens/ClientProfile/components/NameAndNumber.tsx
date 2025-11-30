import { Text } from "react-native-paper";
import VStack from "../../../components/Stacks/VStack";
import { theme } from "../../../themes/theme";
import { Image } from "react-native";

interface NameAndNumberProps {
  cliente: {
    nome: string;
    telefone: string;
  };
}

export default function NameAndNumber({ cliente }: NameAndNumberProps) {
  return (
    <VStack style={{ alignItems: "center", paddingTop: 20 }}>
      <Image
        source={require("../../../assets/images/IconProfile.png")}
        style={{ width: 100, height: 100, alignItems: "center" }}
      />
      <Text
        variant="headlineSmall"
        style={{
          color: theme.colors.primary,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {cliente.nome}
      </Text>
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.text,
          textAlign: "center",
        }}
      >
        {cliente.telefone}
      </Text>
    </VStack>
  );
}
