import { theme } from "../../themes/theme";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddButton({ page }: { page: string }) {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity style={{
            backgroundColor: theme.colors.primary,
            padding: 12,
            width: "14%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            bottom: 20,
            right: 20,
            shadowColor: "#111112",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 24,
            position: "absolute",
            zIndex: 2,
            marginBottom: "15%",
        }} onPress={() => navigation.navigate(page)}>
            <FontAwesomeIcon icon={faPlus} color={theme.colors.background} size={24} />
        </TouchableOpacity>
    );
}
