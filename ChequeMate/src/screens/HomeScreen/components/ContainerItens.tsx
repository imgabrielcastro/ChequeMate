import { Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import { View } from "react-native";
import VStack from "../../../components/Stacks/VStack";
import TextTitle from "../../../components/TextTitle";
import { ScrollView } from "react-native-gesture-handler";

export default function ContainerItens() {
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <VStack
        style={{
          backgroundColor: theme.colors.secondary,
          width: "100%",
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <ScrollView
          style={{ paddingHorizontal: 20, paddingVertical: 12, marginTop: 28, gap: 10 }}
        >
          <TextTitle title="Mais controle." color={theme.colors.primary} />
          <TextTitle title="Menos estresse." color={"#A3A3A3"} />

        <Text variant="titleLarge" style={{ color: theme.colors.text, paddingVertical: 32 }}>Valores a receber durante o mês: </Text>

        <VStack style={{ backgroundColor: theme.colors.input, borderRadius: 10 }}>
            

        </VStack>

        </ScrollView>
      </VStack>
    </View>
  );
}
