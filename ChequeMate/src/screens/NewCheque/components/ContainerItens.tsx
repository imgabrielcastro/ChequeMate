import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import TextTitle from "../../../components/Texts/TextTitle";
import TopTitleInput from "../../../components/Inputs/TopTitleInput";
import { useState, useEffect } from "react";
import ButtonSave from "../../../components/Buttons/ButtonSave";
import DataPicker from "./DataPicker";
import { TouchableOpacity } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import ClientSelector from "./ClientSelector";
import PercentageInput from "./PercentageInput";
import InputNumber from "./InputNumber";
import { createCheque } from "../../../services/chequesService";

interface ContainerItensProps {
  navigation: any;
}

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
}

export default function ContainerItens({ navigation }: ContainerItensProps) {
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [valorOriginal, setValorOriginal] = useState("");
  const [porcentagemJuros, setPorcentagemJuros] = useState("");
  const [valorComJuros, setValorComJuros] = useState("");
  const [numeroCheque, setNumeroCheque] = useState("");
  const [banco, setBanco] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (valorOriginal && porcentagemJuros) {
      const valor = parseFloat(valorOriginal.replace(",", "."));
      const juros = parseFloat(porcentagemJuros.replace(",", "."));

      if (!isNaN(valor) && !isNaN(juros)) {
        const valorComJurosCalculado = valor + (valor * juros) / 100;
        setValorComJuros(valorComJurosCalculado.toFixed(2).replace(".", ","));
      }
    } else {
      setValorComJuros("");
    }
  }, [valorOriginal, porcentagemJuros]);

  const showDatepicker = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setDateModalVisible(true);
    }, 100);
  };

  const hideDatepicker = () => {
    setDateModalVisible(false);
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const handleConfirmDate = () => {
    setDate(tempDate);
    setVencimento(tempDate.toLocaleDateString("pt-BR"));
    setDateModalVisible(false);
  };

  const validateForm = () => {
    if (!selectedClient) {
      return "Selecione um cliente";
    }
    if (!valorOriginal.trim()) {
      return "Informe o valor do cheque";
    }
    if (!vencimento.trim()) {
      return "Informe a data de vencimento";
    }
    if (!numeroCheque.trim()) {
      return "Informe o número do cheque";
    }
    return null;
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    const error = validateForm();
    if (error) {
      Alert.alert("Erro", error);
      return;
    }

    try {
      setLoading(true);

      const chequeData = {
        numero_cheque: numeroCheque,
        valor_original: parseFloat(valorOriginal.replace(",", ".")),
        valor_com_juros: valorComJuros
          ? parseFloat(valorComJuros.replace(",", "."))
          : parseFloat(valorOriginal.replace(",", ".")),
        vencimento: new Date(date).toISOString().split("T")[0],
        data_entrada: new Date().toISOString().split("T")[0],
        status: "pendente",
        cliente_id: selectedClient!.id,
      };

      const response = await createCheque(chequeData);

      Alert.alert("Sucesso", "Cheque cadastrado com sucesso!");

      setSelectedClient(null);
      setValorOriginal("");
      setPorcentagemJuros("");
      setValorComJuros("");
      setNumeroCheque("");
      setBanco("");
      setVencimento("");
      setSubmitAttempted(false);

      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao cadastrar cheque:", error);
      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o cheque. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
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
            <TextTitle title="Cadastrar Cheque" color={theme.colors.primary} />
          </View>

          <VStack style={{ gap: 16 }}>
            <ClientSelector
              selectedClient={selectedClient}
              onSelectClient={setSelectedClient}
              error={
                submitAttempted && !selectedClient
                  ? "Selecione um cliente"
                  : undefined
              }
            />

            <TouchableOpacity
              onPress={showDatepicker}
              disabled={dateModalVisible}
            >
              <DataPicker
                value={vencimento}
                onChangeText={setVencimento}
                title="Data de vencimento:"
                editable={false}
                pointerEvents="none"
                error={
                  submitAttempted && !vencimento
                    ? "Informe a data de vencimento"
                    : undefined
                }
              />
            </TouchableOpacity>

            <InputNumber
              value={valorOriginal}
              setValue={setValorOriginal}
              title="Valor do cheque:"
              error={
                submitAttempted && !valorOriginal
                  ? "Informe o valor do cheque"
                  : undefined
              }
            />

            <PercentageInput
              value={porcentagemJuros}
              setValue={setPorcentagemJuros}
              title="Porcentagem de juros:"
            />

            <TopTitleInput
              value={valorComJuros || valorOriginal}
              setValue={() => {}}
              title="Valor com juros:"
            />

            <InputNumber
              value={numeroCheque}
              setValue={setNumeroCheque}
              title="Número do cheque:"
              error={
                submitAttempted && !numeroCheque
                  ? "Informe o número do cheque"
                  : undefined
              }
            />

            <TopTitleInput value={banco} setValue={setBanco} title="Banco:" />

            {dateModalVisible && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  marginBottom: 180,
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

            {/* Botão Salvar */}
            <ButtonSave
              value={loading ? "Salvando..." : "Salvar Cheque"}
              onPress={handleSubmit}
            />
          </VStack>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
