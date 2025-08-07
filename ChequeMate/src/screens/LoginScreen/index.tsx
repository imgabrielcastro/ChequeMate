import { View, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { theme } from "../../themes/theme";
import LogoHeader from "./components/LogoHeader";
import LoginShowcase from "./components/LoginShowcase";
import LoginForm from "./components/LoginForm";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LogoHeader />
        <LoginShowcase />
        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
