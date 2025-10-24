import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { faLock, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Animatable from "react-native-animatable";

import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import InputWithIcon from "../../../components/Inputs/InputWithIcon";
import ButtonConfirm from "./ButtonConfirm";
import { usePasswordField } from "../../../hooks/usePasswordField";
import { PasswordFormData } from "../../../schemas/validationSchemas";

interface PasswordFormProps {
  onInputFocus: () => void;
  onSubmit: () => void;
  onBack: () => void;
  email: string;
}

export default function PasswordForm({
  onInputFocus,
  onSubmit,
  onBack,
  email,
}: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { password, error, onChange, handleSubmit } = usePasswordField();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const onFormSubmit = (formData: PasswordFormData) => {
    // Aqui você pode fazer a validação da senha com a API
    console.log('Senha submetida:', formData.password);
    onSubmit();
  };

  const handleFormSubmit = () => {
    handleSubmit(onFormSubmit)();
  };

  const handlePasswordChange = (value: string) => {
    onChange(value);
  };

  const handleInputFocus = () => {
    onInputFocus();
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
          <View style={{ width: '100%' }}>
            <InputWithIcon 
              icon={faEnvelope}
              placeholder={email}
              value={email}
              editable={false}
              pointerEvents="none"
              style={{ color: theme.colors.text, fontSize: 16 }}
            />
            <TouchableOpacity 
              onPress={onBack}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                justifyContent: 'center',
                paddingHorizontal: 12,
              }}
            >
              <Text style={{
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
                Alterar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{
          color: theme.colors.text,
          fontSize: 18,
          marginTop: 10,
          marginBottom: 18,
        }}>
          Informe sua senha:
        </Text>

        <InputWithIcon
          icon={faLock}
          placeholder="Informe sua Senha"
          onChangeText={handlePasswordChange}
          value={password}
          onFocus={handleInputFocus}
          secureTextEntry={!showPassword}
          error={error ? error : undefined}
          rightIcon={{
            icon: showPassword ? faEyeSlash : faEye,
            onPress: togglePasswordVisibility
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {error && (
          <Text style={{ color: 'red', marginTop: 4, fontSize: 14 }}>
            {error}
          </Text>
        )}

        <ButtonConfirm onPress={handleFormSubmit} />
      </VStack>
    </Animatable.View>
  );
}