import React from "react";
import {  View } from "react-native";
import { theme } from "../../../themes/theme";
import { Text } from "react-native-paper";
import * as Animatable from "react-native-animatable";

export default function LogoHeader() {
  return (
    <View style={{ alignItems: "center", paddingTop: 80, paddingBottom: 20 }}>
      
      <Animatable.Image
        animation="flipInX"
        duration={1000}
        source={require("../../../assets/images/iconCM.png")}
        style={{ width: 180, height: 180, alignItems: "center" }}
      />
      <Text
        style={{
          color: theme.colors.text,
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Cheque-Mate
      </Text>
    </View>
  );
}
