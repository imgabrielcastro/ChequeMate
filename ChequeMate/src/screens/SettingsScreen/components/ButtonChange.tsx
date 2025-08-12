import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../../themes/theme";

export default function ButtonChange({ value }: { value: string }) {
    return (
        <TouchableOpacity style={{ backgroundColor: theme.colors.input,  paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12, marginHorizontal: 16, width: '40%'}}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary, fontWeight: 'bold', textAlign: 'center' }}>{value}</Text>
        </TouchableOpacity>
    )
}