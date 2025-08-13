import React from "react";
import { View } from "react-native";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import ContainerItens from "./components/ContainerItens";
import AddButton from "../../components/Buttons/AddButton";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View>
            <TittleWithIcon title="Olá, José Gabriel!" icon={faGear} navigation={navigation} />
            <ContainerItens />
            <AddButton page="NewClient" />
        </View>
    );
};

export default HomeScreen;
