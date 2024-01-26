import { Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colours } from "../../constants/colours";

const { width } = Dimensions.get('screen');

export default function ButtonSubmit(props) {
  const {
    text = 'Submit',
    onPress = () => null,
    style = {},
    textStyle = {},
  } = props
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: width * 0.125,
    borderRadius: width * 0.125,
    backgroundColor: Colours.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    color: Colours.background
  }
});