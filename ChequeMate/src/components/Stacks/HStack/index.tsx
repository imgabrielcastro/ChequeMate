import { View, StyleProp, ViewStyle } from "react-native";

interface HStackProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const HStack = (props: HStackProps) => {
  const { children, style } = props;
  return (
    <View style={[{ display: "flex", flexDirection: "row" }, style]}>{children}</View>
  );
};

export default HStack;