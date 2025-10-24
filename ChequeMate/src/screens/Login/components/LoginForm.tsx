import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import InputWithIcon from "../../../components/Inputs/InputWithIcon";
import ButtonConfirm from "./ButtonConfirm";
import * as Animatable from "react-native-animatable";
import { useEmailField } from "../../../hooks/useEmailField";

interface LoginFormProps {
  onInputFocus: () => void;
  onSubmit: (email: string) => void;
}

export default function LoginForm({ onInputFocus, onSubmit }: LoginFormProps) {
  const [checked, setChecked] = React.useState(false);
  const { email, error, onChange, handleSubmit } = useEmailField();

  const onFormSubmit = (formData: { email: string }) => {
    onSubmit(formData.email);
  };

  const handleFormSubmit = () => {
    handleSubmit(onFormSubmit)();
  };

  const showError = !!error;
  const errorMessage = error || 'Informe seu e-mail';

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
        <Text style={{
          color: theme.colors.text,
          fontSize: 18,
          marginTop: 10,
          marginBottom: 18,
        }}>
          Informe seu e-mail para acessar:
        </Text>

        <InputWithIcon 
          icon={faEnvelope} 
          placeholder="seuemail@email.com" 
          onChangeText={onChange}
          value={email}
          onFocus={onInputFocus}
          error={showError ? errorMessage : undefined}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        {showError && (
          <Text style={{ color: 'red', marginTop: 4, fontSize: 14 }}>
            {errorMessage}
          </Text>
        )}

        <View style={{ flexDirection: "row", paddingVertical: 20 }}>
          <TouchableOpacity
            onPress={() => setChecked(!checked)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={checked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
              size={24}
              color={theme.colors.primary}
            />
            <Text style={{ color: theme.colors.text, marginLeft: 8, fontSize: 16 }}>
              Lembrar meu e-mail
            </Text>
          </TouchableOpacity>
        </View>

        <ButtonConfirm onPress={handleFormSubmit} />
      </VStack>
    </Animatable.View>
  );
}