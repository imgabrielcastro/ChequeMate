import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../themes/theme";

interface ButtonConfirmProps {
  onPress?: () => void;
  disabled?: boolean;
}

export default function ButtonConfirm({ onPress = () => {}, disabled = false }: ButtonConfirmProps) {
  return (
    <View style={{
      marginTop: 20, 
      backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary, 
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: theme.colors.background, 
      overflow: 'hidden',
      opacity: disabled ? 0.6 : 1
    }}>
      <TouchableOpacity 
        onPress={onPress} 
        style={{ padding: 20 }}
        disabled={disabled}
      >
        <Text style={{
          color: theme.colors.background, 
          fontSize: 18, 
          fontWeight: 'bold', 
          textAlign: 'center'
        }}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
