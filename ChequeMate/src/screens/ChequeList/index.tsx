import { theme } from "../../themes/theme";
import ContainerItens from "./components/ContainerItens";
import VStack from "../../components/Stacks/VStack";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import { View } from "react-native-animatable";
import AddButton from "../../components/Buttons/AddButton";

export default function ChequesScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <VStack style={{ flex: 1 }}>
        <TittleWithIcon title="Cheques" icon={faGear} navigation={navigation} />
        <View>
          <ContainerItens />
        </View>
      </VStack>
      <VStack>
        <AddButton page="NewCheque" />
      </VStack>
    </View>
  );
}
