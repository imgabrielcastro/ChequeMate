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
import { TextInput } from "react-native-paper";
import HStack from "../../../components/Stacks/HStack/index";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PasswordForm({
  onInputFocus,
  onConfirm,
  onSwitch,
  email,
}: {
  onInputFocus: () => void;
  onConfirm: (password: string) => void;
  onSwitch: () => void;
  email: string;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useEmailField();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

      
      <View style={{ marginBottom: 16 }}>
        <View style={{width: '100%' }}>
          <InputWithIcon 
            icon={faEnvelope}
            placeholder={email}
            value={email}
            editable={false}
            pointerEvents="none"
            style={{color: theme.colors.text, fontSize: 16 }}
          />
          <TouchableOpacity 
            onPress={onSwitch} 
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Alterar
            </Text>
          </TouchableOpacity>
        </View>
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
          secureTextEntry={!showPassword}
          rightIcon={{
            icon: showPassword ? faEyeSlash : faEye,
            onPress: togglePasswordVisibility
          }}
        />


        <ButtonConfirm onPress={() => onConfirm(password)} />
      </VStack>
    </Animatable.View>
  );
}
