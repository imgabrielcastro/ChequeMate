import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { Text } from "react-native-paper";

interface PhoneInputProps {
  value: string;
  setValue: (value: string) => void;
  title: string;
  error?: string;
}

export default function InputNumber({
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
        value={value}
        onChangeText={setValue}
        keyboardType="phone-pad"
        keyboardAppearance="dark"
        style={{
          backgroundColor: theme.colors.input,
          height: 38,
        }}
        textColor={theme.colors.text}
        mode="outlined"
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.input}
        error={!!error}
        theme={{
          colors: {
            text: theme.colors.text,
            onSurface: theme.colors.text,
            onSurfaceVariant: theme.colors.text,
          },
        }}
      />

      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
      )}
    </VStack>
  );
}
