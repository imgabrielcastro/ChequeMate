import { View, Text } from "react-native";
import { theme } from "../../themes/theme";
import LogoHeader from "./components/LogoHeader";
import LoginShowcase from "./components/LoginShowcase"; 
import LoginForm from "./components/LoginForm";

export default function LoginScreen() {
    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}> 
            <LogoHeader />
            <LoginShowcase />
            <LoginForm />
        </View>
    );
}