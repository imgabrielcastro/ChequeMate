import { TextInput } from "react-native-paper";
import { theme } from "../../themes/theme";
import VStack from "../Stacks/VStack";

export default function TopTitleInput({
  value,
  setValue,
  title,
  error,
}: {
  value: string;
  setValue: (value: string) => void;
  title: string;
  error?: string;
}) {
  return (
    <VStack style={{ padding: 20, borderRadius: 12, gap: 8 }}>
      <TextInput
        label={title}
        value={value}
        onChangeText={(text: string) => setValue(text)}
        style={{ backgroundColor: theme.colors.input }}
        theme={{
          colors: { primary: theme.colors.text, text: theme.colors.text, placeholder: theme.colors.text },
        }}
      />
    </VStack>
  );
}
