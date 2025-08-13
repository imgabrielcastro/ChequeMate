import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useTheme, Text, Card, Avatar } from "react-native-paper";
import mockData from "../../../data/mockData.json";
import { useNavigation } from "@react-navigation/native";

interface Usuario {
  id: number;
  nome: string;
  sexo: string;
  idade: number;
}

export const ClientList = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();
    
    // Verifica se mockData e mockData.usuarios existem
    const usuarios = mockData?.usuarios || [];
  
    const renderItem = ({ item }: { item: Usuario }) => {
      return (
        <TouchableOpacity 
          onPress={() => navigation.navigate("PerfilCliente")}
          style={{ marginBottom: 8 }}
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Avatar.Icon size={40} icon="account" />
                <View style={styles.cardInfo}>
                  <Text variant="titleMedium" style={styles.name}>
                    {item?.nome || 'Nome não disponível'}
                  </Text>
                  <View style={styles.statusContainer}>
                    <Text variant="bodyMedium" style={styles.idade}>
                      {item?.idade ? `${item.idade} anos` : 'Idade não informada'},
                    </Text>
                    <Text variant="bodyMedium" style={styles.sexo}>
                      {item?.sexo || ''}
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      paddingBottom: 20,
    },
    card: {
      marginBottom: 8,
      borderRadius: 12,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    cardInfo: {
      flex: 1,
    },
    name: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statusContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    idade: {
      color: '#757575',
    },
    sexo: {
      color: '#757575',
    },
  });