import { View, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { useRef, useState } from "react";
import { theme } from "../../themes/theme";
import LogoHeader from "./components/LogoHeader";
import LoginShowcase from "./components/LoginShowcase";
import LoginForm from "./components/LoginForm";
import PasswordForm from "./components/PasswordForm";
import type { FC } from 'react';

const LoginScreen: FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [firstPage, setFirstPage] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  const handleFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleEmailConfirm = (enteredEmail: string) => {
    setEmail(enteredEmail);
    setFirstPage(false);
  };
  
  const handleBack = () => {
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
        {firstPage && <LoginShowcase />}
        {firstPage ? (
          <LoginForm 
            onInputFocus={handleFocus} 
            onConfirm={handleEmailConfirm} 
          />
        ) : (
          <PasswordForm 
            onInputFocus={handleFocus} 
            onConfirm={(enteredPassword) => {
              console.log('Password submitted for email:', email);
            }} 
            onSwitch={handleBack} 
            email={email} 
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
