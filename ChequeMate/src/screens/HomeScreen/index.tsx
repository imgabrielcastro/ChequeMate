import React from "react";
import { View } from "react-native";
import TittleWithIcon from "../../components/TittleWithIcon";
import ContainerItens from "./components/ContainerItens";

const HomeScreen = () => {
    return (
        <View>
            <TittleWithIcon title="Olá, José Gabriel!" icon="menu" />
            <ContainerItens />
        </View>
    );
};

export default HomeScreen;
