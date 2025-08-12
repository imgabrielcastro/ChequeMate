import { Text } from "react-native-paper";
import { theme } from "../themes/theme";
import { View } from "react-native";

export default function TextTitle({
    title,
    color,
}: {
    title: string;
    color: string;
}) {
    return (
        <View>
            <Text variant="headlineSmall" style={{ color: color, fontWeight: 'bold'}}>{title}</Text>
        </View>
    );
}
