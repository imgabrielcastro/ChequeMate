import React from "react";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { Text } from "react-native-paper";

interface PhoneInputProps {
  value: string;
  setValue: (value: string) => void;
  title: string;
  error?: string;
}

export default function PhoneInput({
  value,
  setValue,
  title,
  error,
}: PhoneInputProps) {
  return (
    <VStack style={{ padding: 12, borderRadius: 12, gap: 2 }}>
      <Text variant="titleMedium" style={{ color: theme.colors.text }}>
        {title}
      </Text>

      <TextInput
        render={({ onChangeText, ...props }) => (
          <TextInputMask
            type="cel-phone"
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            value={value}
            onChangeText={setValue}
            keyboardType="phone-pad"
            keyboardAppearance="dark"
            style={{
              color: theme.colors.text,
              flex: 1,
              padding: 12,
              backgroundColor: "transparent",
            }}
          />
        )}
        value={value}
        onChangeText={setValue}
        style={{ backgroundColor: theme.colors.input, height: 38 }}
        mode="outlined"
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        error={!!error}
      />

      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
      )}
    </VStack>
  );
}
