import React from "react";
import { View } from "react-native";
import TittleWithIcon from "../../components/TitleWithIcon";
import ContainerItens from "./components/ContainerItens";
import AddButton from "../../components/AddButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
    return (
        <View>
            <TittleWithIcon title="Olá, José Gabriel!" icon={faGear} />
            <ContainerItens />
            <AddButton />
        </View>
    );
};

export default HomeScreen;
