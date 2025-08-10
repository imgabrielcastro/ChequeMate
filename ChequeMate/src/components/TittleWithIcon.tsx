import { Text } from "react-native-paper";
import { theme } from "../themes/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HStack from "../components/Stacks/HStack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TittleWithIcon({
  title,
  icon,
}: {
  title: string;
  icon: string;
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
      <Icon name={icon} size={32} color={theme.colors.primary} />
    </HStack>
    </SafeAreaView>
  );
}
