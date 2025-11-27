import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { View, TextInput } from "react-native";
import { ScrollView } from "react-native";
import SearchComponent from "../../../components/Inputs/SearchComponent";
import { ClientList } from "./ClientList";
import AddButton from "../../../components/Buttons/AddButton";
import { useState } from "react";

export default function ContainerItens() {
  const [searchQuery, setSearchQuery] = useState("");
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
        <View style={{ paddingVertical: 12 }}>
          <SearchComponent
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar cliente..."
          />
        </View>

        <View style={{ padding: 12, flex: 1 }}>
          <ClientList searchQuery={searchQuery} />
        </View>
        <View style={{ alignSelf: "flex-end", bottom: 10 }}>
          <AddButton page="NewClient" />
        </View>
      </VStack>
    </View>
  );
}
