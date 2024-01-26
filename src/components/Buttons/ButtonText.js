import { Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colours } from "../../constants/colours";

const { width } = Dimensions.get('screen');

export default function ButtonText(props) {
  const {
    text = 'Click',
    onPress = () => null,
    colour = Colours.primary,
    style = {},
    textStyle = {},
  } = props
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={{ ...styles.text, color: colour, ...textStyle }}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: width * 0.04,
    width: '100%',
  }
});