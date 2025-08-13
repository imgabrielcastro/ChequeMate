import { Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import { View } from "react-native";
import VStack from "../../../components/Stacks/VStack";
import TextTitle from "../../../components/Texts/TextTitle";
import { ScrollView } from "react-native-gesture-handler";
import ReciveInMonth from "./ReciveInMonth";
import ReceivingAmounts from "./ReceivingAmounts";
import HStack from "../../../components/Stacks/HStack";

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
          style={{
            paddingHorizontal: 20,
            paddingVertical: 12,
            marginTop: 28,
            gap: 10,
          }}
          contentContainerStyle={{
            paddingBottom: 300,
          }}
        >
          <TextTitle title="Mais controle." color={theme.colors.primary} />
          <TextTitle title="Menos estresse." color={"#A3A3A3"} />

          <HStack
            style={{
              justifyContent: "space-between",
              paddingVertical: 12,
              gap: 12,
            }}
          >
            <ReceivingAmounts text="Recebidos no mês:" value="600,00" />
            <ReceivingAmounts text="Valores a receber:" value="1200,00" />
          </HStack>

          <Text
            variant="titleMedium"
            style={{ color: theme.colors.text, paddingVertical: 16 }}
          >
            Valores a receber durante o mês:{" "}
          </Text>

          <VStack
            style={{ backgroundColor: theme.colors.input, borderRadius: 10 }}
          >
            <ReciveInMonth name="José Gabriel" value="100" />
            <ReciveInMonth name="Vinicius de Moraes" value="200" />
            <ReciveInMonth name="Maria da Silva" value="300" />
            <ReciveInMonth name="Maria da Silva" value="300" />
          </VStack>
        </ScrollView>
      </VStack>
    </View>
  );
}
