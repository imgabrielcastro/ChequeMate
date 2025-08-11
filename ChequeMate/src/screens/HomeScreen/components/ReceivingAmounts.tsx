import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { Text } from "react-native-paper";

export default function ReceivingAmounts({ text, value }: { text: string, value: string }) {
  return (
    <VStack style={{ padding: 20, borderRadius: 12, backgroundColor: theme.colors.input, gap: 8}}>
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>{text}</Text>
      <Text style={{ color: theme.colors.primary, fontSize: 16, fontWeight: 'bold' }}>R${value}</Text>
    </VStack>
  );
}
