import { theme } from "../../themes/theme";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import HStack from "../Stacks/HStack";
import { View } from "react-native";

interface ButtonSaveProps {
  value: string;
  onPress?: () => void;
}

export default function ButtonSave({ value, onPress }: ButtonSaveProps) {
  return (
    <View
      style={{
        width: "100%", 
        alignItems: "flex-end",
        paddingVertical: 20,
        paddingHorizontal: 22,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: theme.colors.input,
          borderRadius: 12,
          alignItems: "center",
          width: "45%",
          paddingVertical: 16,
        }}
        disabled={!onPress}
      >
        <HStack style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FontAwesomeIcon
            icon={faSave}
            size={24}
            color={theme.colors.primary}
          />
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {value}
          </Text>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}
