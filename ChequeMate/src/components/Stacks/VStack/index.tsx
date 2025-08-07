import { View, StyleProp, ViewStyle } from "react-native";

interface VStackProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const VStack = (props: VStackProps) => {
  const { children, style } = props;
  return (
    <View style={[{ display: "flex", flexDirection: "column" }, style]}>
      {children}
    </View>
  );
};

export default VStack;
