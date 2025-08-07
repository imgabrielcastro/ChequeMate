import React from "react";
import {TextInput} from "react-native";
import {TextInputProps} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {Icon, Text} from 'react-native-paper'
import VStack from "../components/Stacks/VStack";
import HStack from "../components/Stacks/HStack";
import { theme } from "../themes/theme"; 

interface InputInfoProps {
    icon: IconDefinition;
    placeholder?: string;
}

const InputWithIcon = (props: InputInfoProps) => {
    const { icon, placeholder } = props;
    return (
        <VStack style={{ gap: 12, padding: 12, borderRadius: 10, backgroundColor: theme.colors.input }}>
            <HStack style={{gap: 20, alignItems: 'center'}}>
                <FontAwesomeIcon icon={icon} size={30} color={theme.colors.primary}/>
                <TextInput placeholder={placeholder} placeholderTextColor={'#A3A3A3'} />
            </HStack>
        </VStack>
    )
}

export default InputWithIcon;
