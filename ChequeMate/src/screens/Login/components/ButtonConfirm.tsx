import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { theme } from "../../../themes/theme";

interface ButtonConfirmProps {
  onPress: () => void;
}

export default function ButtonConfirm({ onPress }: ButtonConfirmProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.button}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Confirmar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});