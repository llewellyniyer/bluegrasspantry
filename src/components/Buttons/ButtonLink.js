import { Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colours } from "../../constants/colours";

const { width } = Dimensions.get('screen');

export default function ButtonLink(props) {
  const {
    text = 'Submit',
    onPress = () => null,
    children,
    style = {},
  } = props
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {children ? children : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: width * 0.125,
    borderRadius: width * 0.125,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Colours.primary
  }
});