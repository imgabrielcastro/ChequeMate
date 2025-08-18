import { theme } from "../../themes/theme";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import HStack from "../Stacks/HStack";
import { View } from "react-native";

export default function ButtonSave({ value }: { value: string }) {
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
        style={{
          backgroundColor: theme.colors.input,
          borderRadius: 12,
          alignItems: "center",
          width: "45%",
          paddingVertical: 16,
        }}
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
