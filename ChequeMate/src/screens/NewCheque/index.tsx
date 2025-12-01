import { theme } from "../../themes/theme";
import VStack from "../../components/Stacks/VStack";
import ContainerItens from "./components/ContainerItens";
import BackAndTitle from "../../components/Texts/BackAndTitle";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function NewCheque({ navigation }: { navigation: any }) {
    return (
      <VStack style={{ backgroundColor: theme.colors.background }}>
        <VStack style={{ paddingHorizontal: 20}}>
          <BackAndTitle
            title="Novo cheque"
            icon={faArrowLeft}
            navigation={navigation}
          />
        </VStack>
        <VStack style={{marginBottom: 180}}>
        <ContainerItens navigation={navigation} />
        </VStack>
      </VStack>
    );
  }