import React from "react";
import { TextInput, Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";

interface PercentageInputProps {
  value: string;
  setValue: (value: string) => void;
  title: string;
  error?: string;
}

export default function PercentageInput({
  value,
  setValue,
  title,
  error,
}: PercentageInputProps) {
  const handleChange = (text: string) => {
    // Permite apenas números e ponto decimal
    const cleaned = text.replace(/[^0-9.]/g, "");

    // Permite apenas um ponto decimal
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return;
    }

    // Limita a 2 casas decimais após o ponto
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setValue(cleaned);
  };

  return (
    <VStack style={{ padding: 12, borderRadius: 12, gap: 2 }}>
      <Text variant="titleMedium" style={{ color: theme.colors.text }}>
        {title}
      </Text>

      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        style={{ backgroundColor: theme.colors.input, height: 38 }}
        mode="outlined"
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        error={!!error}
        right={<TextInput.Affix text="%" />}
        theme={{ colors: { text: theme.colors.text } }}
      />

      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
      )}
    </VStack>
  );
}
