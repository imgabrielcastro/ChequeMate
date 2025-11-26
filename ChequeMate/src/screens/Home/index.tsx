import React from "react";
import { View } from "react-native";
import TittleWithIcon from "../../components/Texts/TitleWithIcon";
import ContainerItens from "./components/ContainerItens";
import AddButton from "../../components/Buttons/AddButton";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const { user } = useAuth();
    console.log(user)
    return (
        <View>
            <TittleWithIcon title={`Olá, ${user.nome}!`} icon={faGear} navigation={navigation} />
            <ContainerItens />
            <AddButton page="NewClient" />
        </View>
    );
};

export default HomeScreen;
