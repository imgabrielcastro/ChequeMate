import React from "react";
import { View } from "react-native";
import TittleWithIcon from "../../components/TitleWithIcon";
import ContainerItens from "./components/ContainerItens";
import AddButton from "../../components/AddButton";

const HomeScreen = () => {
    return (
        <View>
            <TittleWithIcon title="Olá, José Gabriel!" icon="menu" />
            <ContainerItens />
            <AddButton />
        </View>
    );
};

export default HomeScreen;
