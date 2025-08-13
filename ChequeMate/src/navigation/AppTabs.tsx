import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { theme } from "../../src/themes/theme";
import { TouchableOpacity } from "react-native";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import ClientsScreen from "../screens/ClientsScreen";
import ChequesScreen from "../screens/ChequesScreen";

export type AppTabsParamList = {
  Início: undefined;
  Clientes: undefined;
  Cheques: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

const CustomTabBarButton = (props: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={props.style}
    >
      {props.children}
    </TouchableOpacity>
  );
};

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
          fontWeight: "bold",
          fontSize: 18,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: () => null,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Clientes"
        component={ClientsScreen}
        options={{
          tabBarLabel: "Clientes",
          tabBarIcon: () => null,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Cheques"
        component={ChequesScreen}
        options={{
          tabBarLabel: "Cheques",
          tabBarIcon: () => null,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
