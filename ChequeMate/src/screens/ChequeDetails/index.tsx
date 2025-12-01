import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../../themes/theme";
import VStack from "../../components/Stacks/VStack";
import HStack from "../../components/Stacks/HStack";
import {
  getChequeById,
  receberCheque,
  cancelarCheque,
} from "../../services/chequesService";

interface ChequeDetails {
  id: number;
  numero_cheque: string;
  valor_original: number;
  valor_com_juros: number;
  vencimento: string;
  data_entrada: string;
  status: string;
  cliente_id: number;
  cliente_nome: string;
  created_at: string;
  updated_at: string;
}

export default function ChequeDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chequeId } = route.params as { chequeId: number };

  const [cheque, setCheque] = useState<ChequeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadChequeDetails();
  }, [chequeId]);

  const loadChequeDetails = async () => {
    try {
      setLoading(true);
      const data = await getChequeById(chequeId);
      setCheque(data);
    } catch (error) {
      console.error("Erro ao carregar detalhes do cheque:", error);
      Alert.alert("Erro", "Não foi possível carregar os detalhes do cheque.");
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataISO: string) => {
    if (!dataISO) return "";
    try {
      const data = new Date(dataISO);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      return dataISO;
    }
  };

  const formatarMoeda = (valor: number) => {
    return valor ? `R$ ${valor}` : "R$ 0";
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pago":
        return "#4CAF50";
      case "cancelado":
        return "#F44336";
      case "vencido":
        return "#FF9800";
      case "pendente":
        return "#2196F3";
      default:
        return theme.colors.text;
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pago":
        return "Pago";
      case "cancelado":
        return "Cancelado";
      case "vencido":
        return "Vencido";
      case "pendente":
        return "Pendente";
      default:
        return status;
    }
  };

  // ✅ FUNÇÃO PARA RECEBER CHEQUE
  const handleReceberCheque = async () => {
    setActionLoading(true);
    try {
      await receberCheque(chequeId);
      Alert.alert("Sucesso", "Cheque marcado como recebido!");
      loadChequeDetails(); // Recarrega os dados
    } catch (error) {
      console.error("Erro ao receber cheque:", error);
      Alert.alert("Erro", "Não foi possível receber o cheque.");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ FUNÇÃO PARA CANCELAR CHEQUE
  const handleCancelarCheque = async () => {
    Alert.alert(
      "Confirmar Cancelamento",
      "Tem certeza que deseja cancelar este cheque?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            setActionLoading(true);
            try {
              await cancelarCheque(chequeId);
              Alert.alert("Sucesso", "Cheque cancelado com sucesso!");
              loadChequeDetails(); // Recarrega os dados
            } catch (error) {
              console.error("Erro ao cancelar cheque:", error);
              Alert.alert("Erro", "Não foi possível cancelar o cheque.");
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16 }}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!cheque) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text>Cheque não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <VStack style={styles.content}>
          {/* Cabeçalho */}
          <Card style={styles.headerCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.clienteNome}>
                {cheque.cliente_nome}
              </Text>
              <Text
                variant="titleMedium"
                style={[
                  styles.status,
                  { color: getStatusColor(cheque.status) },
                ]}
              >
                {getStatusText(cheque.status)}
              </Text>
            </Card.Content>
          </Card>

          {/* Informações do Cheque */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Informações do Cheque
              </Text>

              <VStack style={styles.infoGrid}>
                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Número do Cheque:</Text>
                  <Text style={styles.infoValue}>{cheque.numero_cheque}</Text>
                </HStack>

                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Valor Original:</Text>
                  <Text style={styles.infoValue}>
                    {formatarMoeda(cheque.valor_original)}
                  </Text>
                </HStack>

                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Valor com Juros:</Text>
                  <Text style={styles.infoValue}>
                    {formatarMoeda(cheque.valor_com_juros)}
                  </Text>
                </HStack>

                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Data de Vencimento:</Text>
                  <Text style={styles.infoValue}>
                    {formatarData(cheque.vencimento)}
                  </Text>
                </HStack>

                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Data de Entrada:</Text>
                  <Text style={styles.infoValue}>
                    {formatarData(cheque.data_entrada)}
                  </Text>
                </HStack>
              </VStack>
            </Card.Content>
          </Card>

          {/* Datas do Sistema */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Datas do Sistema
              </Text>

              <VStack style={styles.infoGrid}>
                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Criado em:</Text>
                  <Text style={styles.infoValue}>
                    {formatarData(cheque.created_at)}
                  </Text>
                </HStack>

                <HStack style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Última atualização:</Text>
                  <Text style={styles.infoValue}>
                    {formatarData(cheque.updated_at)}
                  </Text>
                </HStack>
              </VStack>
            </Card.Content>
          </Card>

          {/* Ações - Só mostra se o cheque estiver pendente ou vencido */}
          {(cheque.status === "pendente" || cheque.status === "vencido") && (
            <Card style={styles.actionsCard}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Ações
                </Text>

                <VStack style={styles.actionsGrid}>
                  <Button
                    mode="contained"
                    onPress={handleReceberCheque}
                    loading={actionLoading}
                    disabled={actionLoading}
                    style={[styles.actionButton, styles.receberButton]}
                    labelStyle={styles.buttonLabel}
                  >
                    Marcar como Recebido
                  </Button>

                  <Button
                    mode="outlined"
                    onPress={handleCancelarCheque}
                    loading={actionLoading}
                    disabled={actionLoading}
                    style={[styles.actionButton, styles.cancelarButton]}
                    labelStyle={[
                      styles.buttonLabel,
                      { color: theme.colors.error },
                    ]}
                  >
                    Cancelar Cheque
                  </Button>
                </VStack>
              </Card.Content>
            </Card>
          )}

          {/* Mensagem para cheques já finalizados */}
          {(cheque.status === "pago" || cheque.status === "cancelado") && (
            <Card style={styles.finalizadoCard}>
              <Card.Content>
                <Text style={styles.finalizadoText}>
                  Este cheque já foi{" "}
                  {cheque.status === "pago" ? "recebido" : "cancelado"} e não
                  permite mais alterações.
                </Text>
              </Card.Content>
            </Card>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    gap: 16,
  },
  headerCard: {
    borderRadius: 12,
    backgroundColor: theme.colors.input,
  },
  clienteNome: {
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 8,
  },
  status: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoCard: {
    borderRadius: 12,
    backgroundColor: theme.colors.input,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    color: theme.colors.text,
    fontSize: 14,
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
  actionsCard: {
    borderRadius: 12,
    backgroundColor: theme.colors.input,
  },
  actionsGrid: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  receberButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelarButton: {
    borderColor: theme.colors.error,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  finalizadoCard: {
    borderRadius: 12,
    backgroundColor: theme.colors.input,
  },
  finalizadoText: {
    color: theme.colors.text,
    textAlign: "center",
    fontStyle: "italic",
  },
});
