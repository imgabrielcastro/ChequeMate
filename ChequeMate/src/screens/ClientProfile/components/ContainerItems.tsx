import VStack from "../../../components/Stacks/VStack";
import { theme } from "../../../themes/theme";
import { Text } from "react-native-paper";

export default function ContainerItems() {
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
      <Text>Teste</Text>
    </VStack>
  );
}
