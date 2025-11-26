import { theme } from "../../themes/theme";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HStack from "../Stacks/HStack";

export default function SearchComponent() {
    return (
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <TextInput
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesomeIcon
                  icon={faSearch}
                  size={20}
                  color={theme.colors.primary}
                />
              )}
            />
          }
          placeholder="Pesquisar"
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
