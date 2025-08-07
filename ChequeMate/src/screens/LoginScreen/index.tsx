import { View, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { useRef } from "react";
import { theme } from "../../themes/theme";
import LogoHeader from "./components/LogoHeader";
import LoginShowcase from "./components/LoginShowcase";
import LoginForm from "./components/LoginForm";

export default function LoginScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const handleFocus = () => {
    // Timeout para garantir que o teclado já abriu antes de dar scroll
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LogoHeader />
        <LoginShowcase />
        <LoginForm onInputFocus={handleFocus} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
