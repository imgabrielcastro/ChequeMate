import React from "react";
import { View } from "react-native";
import { TextInputMask } from "react-native-masked-text"; 
import { theme } from "../../../themes/theme";

interface PhoneInputProps {
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
    maxLength?: number;
    error?: string;
}

export default function PhoneInput({
  value,
  onChangeText,
  keyboardType = "phone-pad",
  maxLength = 15,
  error,
}: PhoneInputProps) {
  return (
    <View style={{backgroundColor: theme.colors.input}}>
      <TextInputMask
        type="cel-phone"
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={{backgroundColor: theme.colors.input, height: 38}}
        selectionColor="#83239F"
      />
    </View>
  );
}
