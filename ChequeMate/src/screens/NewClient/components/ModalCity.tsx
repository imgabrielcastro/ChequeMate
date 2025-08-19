import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from "react-native-paper";
import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";

const { height } = Dimensions.get("window");

export interface City {
  id: number;
  name: string;
  cidade: string;
  estado: string;
  ufId: string;
}

interface CitySelectorProps {
  selectedCity: City | null;
  onSelectCity: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onSelectCity }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);

      const ufResponse = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const ufs = await ufResponse.json();

      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
      );
      const data = await response.json();

      const ufMap = ufs.reduce((map: Record<string, string>, uf: any) => {
        map[uf.id] = uf.sigla;
        return map;
      }, {});

      const formattedCities: City[] = data
        .map((municipio: any) => {
          const ufId = municipio.microrregiao?.mesorregiao?.UF?.id;
          const ufSigla = ufMap[ufId] || "BR";

          return {
            id: municipio.id,
            name: `${municipio.nome}`,
            cidade: municipio.nome,
            estado: ufSigla,
            ufId: ufId,
          };
        })
        .sort((a: City, b: City) => a.name.localeCompare(b.name));

      setCities(formattedCities);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setError("Erro ao carregar a lista de cidades");
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openModal = () => {
    setIsVisible(true);
    if (cities.length === 0) {
      fetchCities();
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <VStack style={{ padding: 12, borderRadius: 12, gap: 2 }}>
        <Text variant="titleMedium" style={{ color: theme.colors.text }}>Cidade:</Text>
        <TouchableOpacity
          onPress={openModal}
          style={{
            backgroundColor: theme.colors.input,
            height: 38,
            justifyContent: 'center',
            paddingHorizontal: 12,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#666",
          }}
        >
          <Text style={{ color: theme.colors.text }}>
            {selectedCity?.cidade}
          </Text>
        </TouchableOpacity>
      </VStack>

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setIsVisible(false);
        }}
        style={{ margin: 0, justifyContent: "flex-end" }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        coverScreen={true}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection="down"
        propagateSwipe={true}
        backdropOpacity={0.6}
      >
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            width: "100%",
            height: height * 0.9,
            maxHeight: "90%",
            paddingBottom: 30,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 15,
          }}
        >
          <View
            style={{
              width: 60,
              height: 6,
              backgroundColor: theme.colors.primary,
              borderRadius: 4,
              alignSelf: "center",
              marginTop: 12,
              marginBottom: 8,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingVertical: 18,
            }}
          >
            <Text variant="titleLarge" style={{ color: theme.colors.primary, letterSpacing: 0.5 }}>
              Encontre sua cidade
            </Text>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: theme.colors.secondary,
              }}
            >
              <Icon name="close" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              marginHorizontal: 20,
              marginBottom: 15,
              borderRadius: 14,
              backgroundColor: theme.colors.input,
              borderWidth: 1,
              borderColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 50,
                color: theme.colors.text,
                fontSize: 16,
                paddingHorizontal: 15,
                paddingRight: 10,
              }}
              placeholder="Buscar cidade..."
              placeholderTextColor={theme.colors.text}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
            />
            <Icon
              name="search"
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 4 }}
            />
          </View>

          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 40,
                }}
              >
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text
                  style={{
                    marginTop: 15,
                    color: theme.colors.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Buscando cidades...
                </Text>
              </View>
            ) : error ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: theme.colors.input,
                    borderRadius: 16,
                    padding: 30,
                    alignItems: "center",
                    width: "100%",
                    maxWidth: 300,
                    borderWidth: 1,
                    borderColor: theme.colors.error + "20",
                  }}
                >
                  <Icon name="error-outline" size={40} color={theme.colors.error} />
                  <Text
                    style={{
                      color: theme.colors.error,
                      marginVertical: 15,
                      fontSize: 16,
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    {error}
                  </Text>
                  <TouchableOpacity
                    onPress={fetchCities}
                    style={{
                      backgroundColor: theme.colors.primary,
                      paddingHorizontal: 24,
                      paddingVertical: 12,
                      borderRadius: 12,
                      marginTop: 10,
                      shadowColor: theme.colors.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 6,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.background,
                        fontSize: 15,
                        fontWeight: "600",
                      }}
                    >
                      Tentar novamente
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <FlatList
                data={filteredCities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.colors.input,
                      borderRadius: 12,
                      padding: 18,
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderWidth: 1,
                      borderColor: theme.colors.primary,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 2,
                      ...(selectedCity?.id === item.id && {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.secondary,
                        shadowColor: theme.colors.primary,
                      }),
                    }}
                    onPress={() => {
                      onSelectCity(item);
                      setIsVisible(false);
                      setSearchText("");
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: theme.colors.text,
                          fontWeight: "500",
                          marginRight: 12,
                        }}
                      >
                        {item.cidade || item.name}{" "}
                      </Text>
                      <View
                        style={{
                          backgroundColor: theme.colors.secondary,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: theme.colors.primary,
                            fontWeight: "600",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.estado}
                        </Text>
                      </View>
                    </View>
                    <Icon name="arrow-right" size={30} color={theme.colors.primary} />
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: theme.colors.input,
                        borderRadius: 16,
                        padding: 30,
                        alignItems: "center",
                        width: "100%",
                        maxWidth: 300,
                        borderWidth: 1,
                        borderColor: theme.colors.primary,
                      }}
                    >
                      <Icon name="location-off" size={40} color={theme.colors.primary} />
                      <Text
                        style={{
                          color: theme.colors.primary,
                          marginTop: 15,
                          fontSize: 16,
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                        {searchText
                          ? "Nenhuma cidade encontrada"
                          : "Comece a digitar para buscar"}
                      </Text>
                    </View>
                  </View>
                }
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CitySelector;