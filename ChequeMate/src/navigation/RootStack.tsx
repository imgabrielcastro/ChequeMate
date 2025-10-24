import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppTabs } from "./AppTabs";
import Settings from "../screens/Settings";
import NewClient from "../screens/NewClient";
import Login from "../screens/Login";

export type RootStackParamList = {
  Login: undefined;
  AppTabs: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  NewClient: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="NewClient" component={NewClient} />
    </Stack.Navigator>
  );
}