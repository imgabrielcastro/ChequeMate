import { View, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { useRef, useState } from "react";
import { theme } from "../../themes/theme";
import LogoHeader from "./components/LogoHeader";
import LoginShowcase from "./components/LoginShowcase";
import LoginForm from "./components/LoginForm";
import PasswordForm from "./components/PasswordForm";

export default function LoginScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [firstPage, setFirstPage] = useState<boolean>(true);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleConfirm = (enteredEmail: string) => {
    setEmail(enteredEmail);
    setFirstPage(false);
  };

  const handleContinue = () => {
    setShowLoginForm(true);
    setFirstPage(false);
  };
  
  const handleBack = () => {
    setShowLoginForm(false);
    setFirstPage(true);
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
        {!firstPage ? null : <LoginShowcase />}
        {firstPage ? <LoginForm onInputFocus={handleFocus} onConfirm={(enteredEmail) => handleConfirm(enteredEmail)} /> : <PasswordForm onInputFocus={handleFocus} onConfirm={handleConfirm} onSwitch={handleBack} email={email} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
