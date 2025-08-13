import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/RootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ButtonChangeProps = {
  value: string;
  page: keyof RootStackParamList;
};

export default function ButtonChange({ value, page }: ButtonChangeProps) {
  type NavProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavProp>();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.input,
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 12,
        marginHorizontal: 16,
        width: "40%",
      }}
      onPress={() => navigation.navigate(page)}
    >
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.primary,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
}
