import { theme } from "../../themes/theme";
import ContainerItens from "./components/ContainerItens";
import VStack from "../../components/Stacks/VStack";
import TextTitle from "../../components/Texts/TextTitle";
import BackAndTitle from "../../components/Texts/BackAndTitle";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import { ClientList } from "./components/ClientList";

export default function ClientsScreen() {
  const navigation = useNavigation();
  return (
    <VStack style={{ backgroundColor: theme.colors.background }}>
     <TittleWithIcon title="Clientes" icon={faGear} navigation={navigation} />
      <ContainerItens />    
  </VStack>
);
}
