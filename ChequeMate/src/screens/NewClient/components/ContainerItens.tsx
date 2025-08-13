import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { View } from "react-native";
import TextTitle from "../../../components/Texts/TextTitle";
import TopTitleInput from "../../../components/Inputs/TopTitleInput";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ButtonSave from "../../../components/Buttons/ButtonSave";

export default function ContainerItens() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");

  const [Cidade, setCidade] = useState("");
  const [CidadeError, setCidadeError] = useState("");

  const [dataNasc, setDataNasc] = useState("");
  const [dataNascError, setDataNascError] = useState("");

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <VStack
        style={{
          backgroundColor: theme.colors.secondary,
          width: "auto",
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <ScrollView style={{ height: "auto" }}>
          <View style={{ alignItems: "center", paddingVertical: 16 }}>
            <TextTitle title="Informações" color={theme.colors.primary} />
          </View>

          <TopTitleInput
            value={name}
            setValue={setName}
            title="Nome:"
            error={nameError}
          />

          <TopTitleInput
            value={phone}
            setValue={setPhone}
            title="Telefone:"
            error={phoneError}
          />

          <TopTitleInput
            value={mail}
            setValue={setMail}
            title="E-mail:"
            error={mailError}
          />

          <TopTitleInput
            value={Cidade}
            setValue={setCidade}
            title="Cidade:"
            error={CidadeError}
          />

          <TopTitleInput
            value={dataNasc}
            setValue={setDataNasc}
            title="Data de nascimento:"
            error={dataNascError}
          />

          <ButtonSave value="Salvar" />
        </ScrollView>
      </VStack>
    </View>
  );
}
