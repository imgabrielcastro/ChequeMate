import { theme } from "../../themes/theme";
import ContainerItens from "./components/ContainerItens";
import VStack from "../../components/Stacks/VStack";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import { View } from "react-native-animatable";
import ButtonSave from "../../components/Buttons/ButtonSave";

export default function ChequesScreen() {
  const navigation = useNavigation();
  return (
    <VStack style={{ backgroundColor: theme.colors.background }}>
     <TittleWithIcon title="Cheques" icon={faGear} navigation={navigation} />
     <View style={{marginBottom: 350}}>
      <ContainerItens />    
      <ButtonSave value="Salvar" />
     </View>
  </VStack>
);
}
