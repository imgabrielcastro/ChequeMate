import React from "react";
import HStack from "../../components/Stacks/HStack";
import { Text } from "react-native-paper";
import { theme } from "../../themes/theme";
import BackAndTitle from "../../components/Texts/BackAndTitle";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ContainerItems from "./components/ContainerItems";
import VStack from "../../components/Stacks/VStack";
import { SCREEN_WIDTH } from "../../constants";
import { SCREEN_HEIGHT } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

const ClientProfile = ({ navigation }: { navigation: any }) => {
  return (
    <VStack
      style={{
        backgroundColor: theme.colors.background,
        flex: 1
      }}
    >
      <VStack style={{padding: 12}}>
        <BackAndTitle
          title="Perfil"
          icon={faArrowLeft}
          navigation={navigation}
        />
      </VStack>
      <ScrollView style={{flex: 1, width: '100%'}}
      contentContainerStyle={{flexGrow: 1}}> 
      <ContainerItems />
      </ScrollView>
    </VStack>
  );
};

export default ClientProfile;
