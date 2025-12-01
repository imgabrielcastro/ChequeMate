import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { View } from "react-native";
import SearchComponent from "../../../components/Inputs/SearchComponent";
import { ChequeList } from "./ChequesList";
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
          marginTop: -40, 
        }}
      >
        <View style={{ alignItems: "center", paddingVertical: 12 }}>
          <SearchComponent value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        <View style={{padding: 12, flex: 1}}>
          <ChequeList />
        </View>
      </VStack>
    </View>
  );
}