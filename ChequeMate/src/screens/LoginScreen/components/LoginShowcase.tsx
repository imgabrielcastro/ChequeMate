import React from 'react'
import {View} from 'react-native'
import { theme } from '../../../themes/theme';
import {Text} from 'react-native-paper'

export default function LoginShowcase() {
    return (
        <View style={{padding: 26}}>
            <Text style={{color: theme.colors.primary, fontSize: 28, fontWeight: 'bold', marginTop: 10}}>Domine suas finanças com apenas um toque</Text>
        </View>
    );
}
