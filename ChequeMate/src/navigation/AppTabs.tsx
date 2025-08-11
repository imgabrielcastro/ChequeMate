import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { theme } from "../../src/themes/theme";
import { TouchableOpacity } from "react-native";


export type AppTabsParamList = {
  Início: undefined;
  Clientes: undefined;
  Cheques: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

export function AppTabs() {
  return (
<Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.colors.input,
      paddingHorizontal: 10,
      height: 110,
      borderTopWidth: 0, 
      
    },
    tabBarLabelStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.text,
  }}
>
  <Tab.Screen
    name="Início"
    component={HomeScreen}
    options={{ tabBarLabel: "Início", tabBarIcon: () => null }}
  />
  <Tab.Screen
    name="Clientes"
    component={HomeScreen}
    options={{ tabBarLabel: "Clientes", tabBarIcon: () => null }}
  />
  <Tab.Screen
    name="Cheques"
    component={HomeScreen}
    options={{ tabBarLabel: "Cheques", tabBarIcon: () => null }}
  />
</Tab.Navigator>
  );
}
