import React from "react";
import {Button} from 'react-native-paper'
import { theme } from "../../../themes/theme";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";


export default function ButtonConfirm({ onPress }: { onPress: () => void }) {
    return (
        <View style={{marginTop: 20, backgroundColor: theme.colors.primary, borderRadius: 10, borderWidth: 1, borderColor: theme.colors.background, overflow: 'hidden'}}>
       <TouchableOpacity onPress={onPress} style={{padding: 20}}>
            <Text style={{color: theme.colors.background, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Continuar</Text>
       </TouchableOpacity>
       </View>
    );
}
