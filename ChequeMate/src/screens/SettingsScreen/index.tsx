import { theme } from "../../themes/theme";
import { View } from "react-native";
import VStack from "../../components/Stacks/VStack";
import TextTitle from "../../components/TextTitle";
import { SafeAreaView } from "react-native-safe-area-context";
import HStack from "../../components/Stacks/HStack";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BackAndTitle from "../../components/Texts/BackAndTitle";
import ContainerItens from "./components/ContainerItens";

export default function SettingsScreen({ navigation }: { navigation: any }) {
    return (
        <VStack style={{ backgroundColor: theme.colors.background }}>
            <VStack style={{paddingHorizontal: 20}}>
                <BackAndTitle title="Configurações" icon={faArrowLeft} navigation={navigation} />
            </VStack>
            <ContainerItens />
        </VStack>
    );
}