import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import TextTitle from "../../../components/Texts/TextTitle";
import TopTitleInput from "../../../components/Inputs/TopTitleInput";
import { useState } from "react";
import ButtonSave from "../../../components/Buttons/ButtonSave";
import PhoneInput from "./PhoneInput";
import DataPicker from "./DataPicker";
import { TouchableOpacity } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "react-native-paper";
import { Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useEmailField } from "../../../hooks/useEmailField";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CitySelector from "./ModalCity";
import { City } from "./ModalCity";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";

interface ContainerItensProps {
  onSubmit: (email: string) => void;
  navigation: any;
}

export default function ContainerItens({
  onSubmit,
  navigation,
}: ContainerItensProps) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { email, error, onChange: onEmailChange } = useEmailField();

  const [Cidade, setCidade] = useState("");
  const [CidadeError, setCidadeError] = useState("");

  const [dataNasc, setDataNasc] = useState("");
  const [dataNascError, setDataNascError] = useState("");

  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const showError =
    (submitAttempted && !email.trim()) || (submitAttempted && error) || error;
  const errorMessage = error || "Informe seu e-mail";

  const showDatepicker = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setDateModalVisible(true);
    }, 100);
  };

  const hideDatepicker = () => {
    setDateModalVisible(false);
    setTimeout(() => {}, 100);
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const handleConfirmDate = () => {
    if (tempDate > new Date()) {
      Alert.alert(
        "Erro",
        "A data de nascimento não pode ser maior que a data atual."
      );
      setTempDate(new Date());
      setDataNasc("");
      setDateModalVisible(false);
      return;
    }

    setDate(tempDate);
    setDataNasc(tempDate.toLocaleDateString("pt-BR"));
    setDateModalVisible(false);
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (email.trim() && !error) {
      onSubmit(email);
      navigation.navigate("AppTabs", {
        screen: "Clientes",
      });
    }
  };

  const closeModalIfClickedOutside = () => {
    if (dateModalVisible) setDateModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.secondary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!dateModalVisible}
      >
        <View style={{ padding: 16, paddingBottom: 50 }}>
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <TextTitle title="Informações" color={theme.colors.primary} />
          </View>

          <VStack style={{ gap: 16 }}>
            <TopTitleInput
              value={name}
              setValue={setName}
              title="Nome:"
              error={nameError}
            />

            <PhoneInput
              value={phone}
              setValue={setPhone}
              title="Telefone"
              error={phoneError}
            />

            <TopTitleInput
              value={email}
              setValue={onEmailChange}
              title="E-mail:"
              error={showError ? errorMessage : undefined}
            />

            {showError && (
              <Text
                style={{
                  color: "red",
                  marginTop: -32,
                  marginBottom: -24,
                  fontSize: 14,
                  padding: 12,
                }}
              >
                {errorMessage}
              </Text>
            )}

            <GestureHandlerRootView style={{ flex: 1 }}>
              <View>
                <CitySelector
                  selectedCity={selectedCity}
                  onSelectCity={(city) => setSelectedCity(city)}
                />
              </View>
            </GestureHandlerRootView>

            <TouchableOpacity
              onPress={showDatepicker}
              disabled={dateModalVisible}
            >
              <DataPicker
                value={dataNasc}
                onChangeText={setDataNasc}
                title="Data de nascimento:"
                error={dataNascError}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {dateModalVisible && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
                pointerEvents="box-none"
              >
                <TouchableWithoutFeedback onPress={hideDatepicker}>
                  <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>
                <Animatable.View
                  animation="fadeInUp"
                  style={{
                    gap: 12,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: theme.colors.input,
                    padding: 20,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}
                  pointerEvents="box-none"
                >
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate}
                    locale="pt-BR"
                    textColor={theme.colors.text}
                    themeVariant="dark"
                  />
                  <TouchableOpacity
                    style={{
                      padding: 0,
                      borderRadius: 5,
                      alignItems: "center",
                      marginTop: 10,
                      paddingVertical: 10,
                      backgroundColor: theme.colors.primary,
                    }}
                    onPress={handleConfirmDate}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#fff",
                        fontWeight: "bold",
                        padding: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Confirmar
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            )}

            <ButtonSave value="Salvar" onPress={handleSubmit} />
          </VStack>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
