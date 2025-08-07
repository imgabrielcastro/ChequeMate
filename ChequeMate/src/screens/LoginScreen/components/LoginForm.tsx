import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { theme } from "../../../themes/theme";
import { Text } from "react-native-paper";
import VStack from "../../../components/Stacks/VStack/index";
import InputWithIcon from "../../../components/InputWithIcon";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonConfirm from "./ButtonConfirm";

export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  const onToggleCheck = () => setChecked(!checked);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.secondary,
        padding: 22,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <VStack style={{ paddingTop: 16 }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 18,
            marginTop: 10,
            marginBottom: 18,
          }}
        >
          Informe seu e-mail para acessar:
        </Text>

        <InputWithIcon icon={faEnvelope} placeholder="seuemail@email.com" />

        <View style={{ flexDirection: "row", paddingVertical: 30 }}>
          <TouchableOpacity
            onPress={onToggleCheck}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={
                checked ? "checkbox-marked-outline" : "checkbox-blank-outline"
              }
              size={24}
              color={theme.colors.primary}
            />

            <Text
              style={{ color: theme.colors.text, marginLeft: 8, fontSize: 16 }}
            >
              Lembrar meu e-mail
            </Text>
          </TouchableOpacity>
        </View>

        <ButtonConfirm />
      </VStack>
    </View>
  );
}
