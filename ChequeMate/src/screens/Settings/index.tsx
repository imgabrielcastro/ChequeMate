import { theme } from "../../themes/theme";
import VStack from "../../components/Stacks/VStack";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BackAndTitle from "../../components/Texts/BackAndTitle";
import ContainerItens from "./components/ContainerItens";

export default function SettingsScreen({ navigation }: { navigation: any }) {
  return (
    <VStack style={{ backgroundColor: theme.colors.background }}>
      <VStack style={{ paddingHorizontal: 20 }}>
        <BackAndTitle
          title="Configurações"
          icon={faArrowLeft}
          navigation={navigation}
        />
      </VStack>
      <ContainerItens />
    </VStack>
  );
}
