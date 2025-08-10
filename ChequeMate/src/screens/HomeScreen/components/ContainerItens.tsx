import { Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import { View } from "react-native";
import VStack from "../../../components/Stacks/VStack";

export default function ContainerItens() {
    return (
        <View style={{backgroundColor: theme.colors.background}}>
        <VStack style={{backgroundColor: theme.colors.secondary, width: '100%', height: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
            <Text>ContainerItens</Text>
        </VStack>
        </View>
    );
}
