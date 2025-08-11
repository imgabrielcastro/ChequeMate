import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { AppTabs } from "./AppTabs";

export type RootStackParamList = {
  Login: undefined;
  AppTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}