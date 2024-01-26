import { Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colours } from "../../constants/colours";

const {width} = Dimensions.get('screen');

export default function ButtonIcon(props) {
  const {
    text,
    icon = "chevron-back",
    onPress = () => null,
    size = 20,
    colour= Colours.primary,
style = {}
  } = props
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Ionicons name={icon} size={size} color={colour} />
      {text && (<Text style={{...styles.text, color: colour}}>{text}</Text>)}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
  }
});