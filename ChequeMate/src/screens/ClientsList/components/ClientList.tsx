import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme, Text, Card, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../themes/theme";
import { getClientes } from "../../../services/clientService";
import { TextInputMask } from 'react-native-masked-text';

interface Usuario {
  id: number;
  nome: string;
  cpf_cnpj: string;
  telefone: string;
}

export const ClientList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClientes();
        setUsuarios(data);
      } catch (err) {
        console.log("Erro ao carregar clientes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!usuarios.length) {
    return (
      <View style={styles.container}>
        <Text variant="titleMedium">Nenhum usuário encontrado</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Usuario }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PerfilCliente")}
      style={{ marginBottom: 8 }}
    >
      <Card style={{ marginBottom: 8, borderRadius: 12, backgroundColor: theme.colors.input }}>
        <Card.Content>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Avatar.Icon
              size={40}
              icon="account"
              color={theme.colors.primary}
              style={{ backgroundColor: theme.colors.background }}
            />
            <View style={{ flex: 1 }}>
              <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: 4, color: theme.colors.primary }}>
                {item.nome}
              </Text>

              <View style={{ flexDirection: "row", gap: 8 }}>
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  value={item.telefone}
                  style={{
                    color: theme.colors.text,
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={usuarios}
      renderItem={renderItem}
      keyExtractor={(item) => `user-${item.id}`}
      contentContainerStyle={styles.listContainer}
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
});
