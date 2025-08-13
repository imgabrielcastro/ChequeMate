import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { View } from "react-native";
import { ScrollView } from "react-native";
import SearchComponent from "../../../components/Inputs/SearchComponent";
import { ClientList } from "./ClientList";

export default function ContainerItens() {
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <VStack
        style={{
          backgroundColor: theme.colors.secondary,
          width: "auto",
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: -20, 
        }}
      >
        <View style={{ alignItems: "center", paddingVertical: 12 }}>
          <SearchComponent />
        </View>

        <View style={{padding: 12, flex: 1}}>
          <ClientList />
        </View>
      </VStack>
    </View>
  );
}