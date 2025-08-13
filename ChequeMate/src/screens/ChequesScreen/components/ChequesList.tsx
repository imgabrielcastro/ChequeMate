import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useTheme, Text, Card, Avatar } from "react-native-paper";
import mockData from "../../../data/mockData.json";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../themes/theme";

interface Cheque {
  id: number;
  cliente: string;
  nomebanco: string;
  numerocheque: string;
  datacheque: string;
  situacao: string;
  valor: number;
  juros: number;
}

export const ChequeList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const cheques = mockData?.cheques || [];

  const renderItem = ({ item }: { item: Cheque }) => {
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
                    {item?.cliente || "Nome não disponível"}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.primary, fontWeight: "bold" }}
                  >
                    R$ {item?.valor.toFixed(2) || ""}
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
                    {item?.datacheque.split("-").reverse().join("/") || ""}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.text }}
                  >
                    {item?.situacao || ""}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

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
