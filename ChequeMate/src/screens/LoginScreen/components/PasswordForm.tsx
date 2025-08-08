import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { theme } from "../../../themes/theme";
import { Text } from "react-native-paper";
import VStack from "../../../components/Stacks/VStack/index";
import InputWithIcon from "../../../components/InputWithIcon";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonConfirm from "./ButtonConfirm";
import * as Animatable from "react-native-animatable";
import { useEmailField } from "../../../hooks/useEmailField";

export default function PasswordForm({ onInputFocus, onConfirm, onSwitch, email }: { onInputFocus: () => void; onConfirm: (password: string) => void; onSwitch: () => void; email: string }) {
  const [checked, setChecked] = useState(false);
  const onToggleCheck = () => setChecked(!checked);
  const [password, setPassword] = useState('');

  const { error, onChange } = useEmailField();

  return (
    <Animatable.View
      style={{
        flex: 1,
        backgroundColor: theme.colors.secondary,
        padding: 22,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
      }}
      animation="fadeInUp"
    >
      <VStack style={{ paddingTop: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ color: theme.colors.text, fontSize: 16 }}>
            {email}
          </Text>
          <TouchableOpacity onPress={onSwitch}>
            <Text style={{ color: theme.colors.primary, fontSize: 16 }}>
              Trocar
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 18,
            marginTop: 10,
            marginBottom: 18,
          }}
        >
          Informe sua senha:
        </Text>

        <InputWithIcon 
          icon={faLock} 
          placeholder="Informe sua Senha" 
          onChangeText={setPassword}
          value={password}
          onFocus={onInputFocus}
        />
        {error ? (
          <Text style={{ color: 'red', marginTop: 4, fontSize: 14 }}>
            {error}
          </Text>
        ) : null}

        <ButtonConfirm onPress={() => onConfirm(password)} />
      </VStack>
    </Animatable.View>
  );
}
