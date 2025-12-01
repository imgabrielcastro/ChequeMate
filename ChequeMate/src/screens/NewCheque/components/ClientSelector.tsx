import React, { useState, useEffect } from "react";
import { Modal, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Text, Card } from "react-native-paper";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { getClientesForCheque } from "../../../services/chequesService";

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
}

interface ClientSelectorProps {
  selectedClient: Cliente | null;
  onSelectClient: (client: Cliente) => void;
  error?: string;
}

export default function ClientSelector({
  selectedClient,
  onSelectClient,
  error,
}: ClientSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      loadClientes();
    }
  }, [modalVisible]);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientesForCheque();
      setClientes(data);
    } catch (err) {
      console.log("Erro ao carregar clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cliente.telefone && cliente.telefone.includes(searchQuery))
  );

  const handleSelectClient = (client: Cliente) => {
    onSelectClient(client);
    setModalVisible(false);
    setSearchQuery("");
  };

  return (
    <VStack style={{ padding: 12, borderRadius: 12, gap: 2 }}>
      <Text variant="titleMedium" style={{ color: theme.colors.text }}>
        Cliente:
      </Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <TextInput
          value={selectedClient?.nome || " "}
          placeholder="Selecione um cliente..."
          mode="outlined"
          style={[
            {
              backgroundColor: theme.colors.input,
              height: 40,
            },
            !selectedClient?.nome && { borderColor: theme.colors.outline },
          ]}
          textColor={theme.colors.text}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          editable={false}
          pointerEvents="none"
          theme={{
            colors: {
              onSurfaceVariant: theme.colors.text,
              onSurface: theme.colors.text,
              onSurfaceDisabled: theme.colors.text,
              primary: theme.colors.primary,
              placeholder: theme.colors.text,
              text: theme.colors.text,
            },
          }}
          right={
            <TextInput.Icon icon="chevron-down" color={theme.colors.text} />
          }
        />
      </TouchableOpacity>

      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <VStack style={styles.modalContainer}>
          <Card style={styles.modalContent}>
            <Card.Content>
              <Text
                variant="titleLarge"
                style={{ marginBottom: 16, color: theme.colors.text }}
              >
                Selecione um Cliente
              </Text>

              <TextInput
                placeholder="Buscar cliente..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="outlined"
                style={{ marginBottom: 16 }}
                left={<TextInput.Icon icon="magnify" />}
                theme={{ colors: { text: theme.colors.text } }}
              />

              {loading ? (
                <Text
                  style={{
                    textAlign: "center",
                    padding: 20,
                    color: theme.colors.text,
                  }}
                >
                  Carregando clientes...
                </Text>
              ) : (
                <FlatList
                  data={filteredClientes}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.clientItem,
                        selectedClient?.id === item.id && styles.selectedClient,
                      ]}
                      onPress={() => handleSelectClient(item)}
                    >
                      <Text
                        variant="bodyMedium"
                        style={{ fontWeight: "bold", color: theme.colors.text }}
                      >
                        {item.nome}
                      </Text>
                      <Text
                        variant="bodySmall"
                        style={{ color: theme.colors.text }}
                      >
                        {item.telefone}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: 300 }}
                />
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </VStack>
      </Modal>
    </VStack>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    backgroundColor: theme.colors.background,
  },
  clientItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  selectedClient: {
    backgroundColor: theme.colors.primary + "20",
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
