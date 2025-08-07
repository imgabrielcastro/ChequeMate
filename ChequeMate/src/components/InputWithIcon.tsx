import React, { useState } from "react";
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
    const [email, setEmail] = useState('');
    const { icon, placeholder } = props;
    return (
        <VStack style={{ borderRadius: 10, backgroundColor: theme.colors.input, overflow: 'hidden' }}>
            <HStack style={{ padding: 12, gap: 20, alignItems: 'center' }}>
                <FontAwesomeIcon icon={icon} size={24} color={theme.colors.primary} />
                <TextInput 
                    placeholder={placeholder} 
                    placeholderTextColor={'#A3A3A3'} 
                    style={{
                        flex: 1,
                        color: theme.colors.text, 
                        padding: 0,
                        fontSize: 16,
                        textAlignVertical: 'center'
                    }} 
                    onChangeText={setEmail} 
                    numberOfLines={1}
                />
            </HStack>
        </VStack>
    )
}

export default InputWithIcon;
