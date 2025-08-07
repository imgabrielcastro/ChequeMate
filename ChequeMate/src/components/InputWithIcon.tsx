import React from "react";
import { TextInput } from "react-native";
import { TextInputProps } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import VStack from "../components/Stacks/VStack";
import HStack from "../components/Stacks/HStack";
import { theme } from "../themes/theme";

interface InputInfoProps extends TextInputProps {
  icon: IconDefinition;
  error?: string;
}

const InputWithIcon = (props: InputInfoProps) => {
  const { icon, error, ...rest } = props;
  return (
    <VStack
      style={{
        borderRadius: 10,
        backgroundColor: theme.colors.input,
        overflow: "hidden",
      }}
    >
      <HStack style={{ padding: 12, gap: 20, alignItems: "center" }}>
        <FontAwesomeIcon icon={icon} size={24} color={theme.colors.primary} />
        <TextInput
          placeholderTextColor={"#A3A3A3"}
          style={{
            flex: 1,
            color: theme.colors.text,
            padding: 0,
            fontSize: 16,
            textAlignVertical: "center",
          }}
          numberOfLines={1}
          {...rest}
        />
      </HStack>
    </VStack>
  );
};

export default InputWithIcon;
