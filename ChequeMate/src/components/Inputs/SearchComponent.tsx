import { theme } from "../../themes/theme";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchComponentProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchComponent({ 
  value, 
  onChangeText, 
  placeholder = "Buscar..." 
}: SearchComponentProps) {
  return (
    <View style={{ width: '100%', paddingHorizontal: 20 }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesomeIcon
                icon={faSearch}
                color={theme.colors.primary}
                size={16}
              />
            )}
          />
        }
        placeholderTextColor={"#A3A3A3"}
        style={{
          backgroundColor: theme.colors.input,
          borderRadius: 12,
          height: 48,
          width: '100%',
        }}
        contentStyle={{
          paddingVertical: 0,
          marginVertical: 0,
          height: 48,
          fontSize: 14, 
        }}
        outlineStyle={{
          borderWidth: 0, 
        }}
        mode="outlined"
        theme={{
          colors: {
            primary: theme.colors.input,
            text: theme.colors.text,
            onSurface: theme.colors.text,
          },
          roundness: 12, 
        }}
      />
    </View>
  );
}
