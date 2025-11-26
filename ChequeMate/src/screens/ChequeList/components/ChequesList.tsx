import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme, Text, Card, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../themes/theme";
import { getCheques } from "../../../services/chequesService";

interface Cheque {
  id: number;
  cliente_nome: string;
  numero_cheque: string;
  data_cheque: string;
  valor_original: number;
  status: string;
  vencimento: string;
}

export const ChequeList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [cheques, setCheques] = useState<Cheque[]>([]);

  const renderItem = ({ item }: { item: Cheque }) => {
    const formatarVencimento = (dataISO: string) => {
      if (!dataISO) return "";

      try {
        const data = new Date(dataISO);

        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
      } catch (error) {
        console.log("Erro ao formatar data:", error);
        return dataISO;
      }
    };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PerfilCliente")}
        style={{ marginBottom: 8 }}
      >
        <Card
          style={{
            marginBottom: 8,
            borderRadius: 12,
            backgroundColor: theme.colors.input,
          }}
        >
          <Card.Content>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    variant="titleMedium"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 4,
                      color: theme.colors.primary,
                    }}
                  >
                    {item?.cliente_nome || "Nome não disponível"}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.primary, fontWeight: "bold" }}
                  >
                    {/* R$ {item?.valor || ""} */}
                    R$ {item?.valor_original || ""}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.text }}
                  >
                    {/* {item?.datacheque.split("-").reverse().join("/") || ""} */}
                    {formatarVencimento(item?.vencimento) || ""}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.text }}
                  >
                   {item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase() : ""}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCheques();
        setCheques(data);
        console.log(data);
      } catch (err) {
        console.log("Erro ao carregar cheques:", err);
      }
    }
    fetchData();
  }, []);

  if (!cheques.length) {
    return (
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <Text variant="titleMedium">Nenhum cheque encontrado</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cheques}
      renderItem={renderItem}
      keyExtractor={(item, index) => `user-${item?.id || index}`}
      contentContainerStyle={styles.listContainer}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {},
});
