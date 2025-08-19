import { TextInput } from "react-native-paper";
import { theme } from "../../themes/theme";
import VStack from "../Stacks/VStack";
import {Text} from "react-native-paper";

export default function TopTitleInput({
  value,
  setValue,
  title,
  error,
  onChange,
}: {
  value: string;
  setValue: (value: string) => void;
  title: string;
  error?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <VStack style={{ padding: 12, borderRadius: 12, gap: 2 }}>
        <Text variant="titleMedium" style={{ color: theme.colors.text }}>{title}</Text>
        
      <TextInput
        value={value}
        onChangeText={(text: string) => {
          setValue(text);
          if (onChange) {
            onChange(text);
          }
        }}
        style={{ backgroundColor: theme.colors.input, height: 38 }}
        mode="outlined"
        theme={{
          colors: {
            primary: theme.colors.input,
            text: theme.colors.text,
            onSurface: theme.colors.text,
            placeholder: "#FFFFFF", 
          },
        }}
      />
    </VStack>
  );
}
