import React from "react";
import { theme } from "../../../themes/theme";
import HStack from "../../../components/Stacks/HStack";
import { Text } from "react-native-paper";

interface ReciveInMonthProps {
  name: string;
  value: string;
}

export default function ReciveInMonth({ name, value }: ReciveInMonthProps) {
  return (
    <HStack
      style={{
        justifyContent: "space-between",
        backgroundColor: theme.colors.input,
        padding: 20,
        margin: 10,
        borderRadius: 12,

        shadowColor: "#111112",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 24,
        
      }}
    >
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.text, fontWeight: "bold" }}
      >
        {name}
      </Text>
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.primary, fontWeight: "bold" }}
      >
        R${value},00
      </Text>
    </HStack>
  );
}
