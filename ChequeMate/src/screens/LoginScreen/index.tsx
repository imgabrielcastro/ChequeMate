import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRef, useState } from "react";
import { theme } from "../../themes/theme";
import LogoHeader from "./components/LogoHeader";
import LoginShowcase from "./components/LoginShowcase";
import LoginForm from "./components/LoginForm";
import PasswordForm from "./components/PasswordForm";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/RootStack";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [currentStep, setCurrentStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');

  const handleFocus = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const handleEmailSubmit = (enteredEmail: string) => {
    setEmail(enteredEmail);
    setCurrentStep('password');
  };
  
  const handleBackToEmail = () => {
    setCurrentStep('email');
  };

  const handleLoginSuccess = () => {
    navigation.replace('AppTabs');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LogoHeader />
        
        {currentStep === 'email' ? (
          <>
            <LoginShowcase />
            <LoginForm 
              onInputFocus={handleFocus} 
              onSubmit={handleEmailSubmit} 
            />
          </>
        ) : (
          <PasswordForm 
            onInputFocus={handleFocus}
            onSubmit={handleLoginSuccess} 
            onBack={handleBackToEmail} 
            email={email} 
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}