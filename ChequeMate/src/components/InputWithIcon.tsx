import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { TextInputProps } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import VStack from "../components/Stacks/VStack";
import HStack from "../components/Stacks/HStack";
import { theme } from "../themes/theme";

interface InputInfoProps extends Omit<TextInputProps, 'style'> {
  icon: IconDefinition;
  error?: string;
  rightIcon?: {
    icon: IconDefinition;
    onPress: () => void;
  };
  style?: any;
}

const InputWithIcon = (props: InputInfoProps) => {
  const { 
    icon, 
    error, 
    rightIcon,
    style,
    ...rest 
  } = props;
  
  return (
    <VStack
      style={[
        {
          borderRadius: 10,
          backgroundColor: theme.colors.input,
          overflow: "hidden",
        },
        style
      ]}
    >
      <HStack style={{ padding: 12, gap: 20, alignItems: "center" }}>
        <FontAwesomeIcon icon={icon} size={24} color={theme.colors.primary} />
        <TextInput
          placeholderTextColor={"#A3A3A3"}
          keyboardAppearance="dark"
          style={{
            flex: 1,
            color: theme.colors.text,
            padding: 0,
            fontSize: 16,
            textAlignVertical: "center",
            paddingRight: rightIcon ? 40 : 0,
          }}
          numberOfLines={1}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity 
            onPress={rightIcon.onPress}
            style={{
              position: 'absolute',
              right: 12,
              padding: 8,
              margin: -8,
            }}
          >
            <FontAwesomeIcon 
              icon={rightIcon.icon} 
              size={20} 
              color={theme.colors.primary} 
            />
          </TouchableOpacity>
        )}
      </HStack>
    </VStack>
  );
};

export default InputWithIcon;
