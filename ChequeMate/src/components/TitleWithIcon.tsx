import { Text } from "react-native-paper";
import { theme } from "../themes/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HStack from "./Stacks/HStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TouchableOpacity } from "react-native";

export default function TittleWithIcon({
  title,
  icon,
  navigation,
}: {
  title: string;
  icon: IconDefinition;
  navigation: any;
}) {
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
    <HStack style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, height: 36}}>
      <Text
        variant="headlineMedium"
        style={{
          color: theme.colors.primary,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => {navigation.navigate("Settings")}}>
      <FontAwesomeIcon icon={icon} size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </HStack>
    </SafeAreaView>
  );
}
