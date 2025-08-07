import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

const RootStack = createNativeStackNavigator();

export default function RootStackScreen() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
    </RootStack.Navigator>
  );
}
