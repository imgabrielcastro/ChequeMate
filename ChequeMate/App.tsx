import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./src/navigation/RootStack";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <RootStackScreen />
          <StatusBar style="light" />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
