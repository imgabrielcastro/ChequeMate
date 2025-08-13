import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useTheme, Text, Card, Avatar } from "react-native-paper";
import mockData from "../../../data/mockData.json";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../themes/theme";

interface Usuario {
  id: number;
  nome: string;
  sexo: string;
  idade: number;
}

export const ClientList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const usuarios = mockData?.usuarios || [];

  const renderItem = ({ item }: { item: Usuario }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PerfilCliente")}
        style={{ marginBottom: 8 }}
      >
        <Card style={{ marginBottom: 8, borderRadius: 12, backgroundColor: theme.colors.input }}>
          <Card.Content>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Avatar.Icon size={40} icon="account" color={theme.colors.primary} style={{ backgroundColor: theme.colors.background  }} />
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: 4, color: theme.colors.primary }}>
                  {item?.nome || "Nome não disponível"}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.text }}
                  >
                    {item?.idade ? `${item.idade} anos` : "Idade não informada"}
                    ,
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.text }}
                  >
                    {item?.sexo || ""}
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  if (!usuarios.length) {
    return (
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <Text variant="titleMedium">Nenhum usuário encontrado</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={usuarios}
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
  card: {

  },
});
