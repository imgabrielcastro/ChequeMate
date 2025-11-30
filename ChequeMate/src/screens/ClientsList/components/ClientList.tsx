import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
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

interface ClientListProps {
  searchQuery?: string;
}

export const ClientList = ({ searchQuery = '' }: ClientListProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await getClientes();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (err) {
      console.log("Erro ao carregar clientes:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = usuarios.filter(
        user => 
          user.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.telefone && user.telefone.includes(searchQuery))
      );
      setFilteredUsuarios(filtered);
    } else {
      setFilteredUsuarios(usuarios);
    }
  }, [searchQuery, usuarios]);

  useEffect(() => {
    loadData(); 
  }, []);

  if (loading && !isRefreshing) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!filteredUsuarios.length) {
    return (
      <View style={styles.container}>
        <Text variant="titleMedium">Nenhum usuário encontrado</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Usuario }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ClientProfile")}
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
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
      data={filteredUsuarios}
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