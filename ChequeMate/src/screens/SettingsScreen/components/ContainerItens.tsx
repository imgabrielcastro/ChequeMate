import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { View } from "react-native";
import HStack from "../../../components/Stacks/HStack";
import TextTitle from "../../../components/Texts/TextTitle";
import TopTitleInput from "../../../components/Inputs/TopTitleInput";
import { useState } from "react";

export default function ContainerItens() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
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
        <View style={{ alignItems: "center", paddingVertical: 16 }}>
          <TextTitle title="Informações" color={theme.colors.primary} />
        </View>

     


        <TopTitleInput
          value={name}
          setValue={setName}
          title="Nome"
          error={nameError}
        />

        <TopTitleInput
          value={name}
          setValue={setName}
          title="Nome"
          error={nameError}
        />
      </VStack>
    </View>
  );
}
