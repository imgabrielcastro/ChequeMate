import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { TextInput, Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";

export default function DataPicker({
  value,
  onChangeText,
  title,
  error,
  editable,
  pointerEvents,
}: {
  value: string;
  onChangeText: (value: string) => void;
  title: string;
  error?: string;
  editable?: boolean;
  pointerEvents?: string;
}) {
  return (
    <VStack style={{ padding: 12, borderRadius: 12, flex: 1, marginBottom: -12, zIndex: 20 }}>
      <Text variant="titleMedium" style={{ color: theme.colors.text }}>{title}</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          mode="outlined"
          style={styles.input}
          error={!!error}
          pointerEvents="none"
          editable={false}
          theme={{
            colors: {
              primary: theme.colors.input,
              text: theme.colors.text,
              onSurface: theme.colors.text,
              placeholder: "#FFFFFF",
            },
          }}
        />
      </View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: theme.colors.input,
    height: 38,
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1,
  },
});