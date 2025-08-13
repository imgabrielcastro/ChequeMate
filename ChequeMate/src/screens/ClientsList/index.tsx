import { theme } from "../../themes/theme";
import ContainerItens from "./components/ContainerItens";
import VStack from "../../components/Stacks/VStack";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import { View } from "react-native-animatable";

export default function ClientsScreen() {
  const navigation = useNavigation();
  return (
    <VStack style={{ backgroundColor: theme.colors.background }}>
     <TittleWithIcon title="Clientes" icon={faGear} navigation={navigation} />
     <View style={{marginBottom: 180}}>
      <ContainerItens />      
     </View>
  </VStack>
);
}
