import { Dimensions, TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import { Colours } from "../../constants/colours";
import ButtonText from "../Buttons/ButtonText";

const { width } = Dimensions.get('screen');

export default function InputPromo(props) {
  const {
    text = 'Add your promo code',
    buttonText = 'Apply',
    style,
    onPress = () => null,
  } = props
  return (
    <View onPress={onPress} style={[styles.container, style]}>
      <TextInput placeholderTextColor={Colours.primary} placeholder={text} style={styles.text} textAlign="left" />
      <ButtonText textStyle={{ textAlign: 'right', color: 'lightgray', fontWeight: '500', fontSize: width * 0.035 }} style={{ width: '25%', borderLeftWidth: 1, height: '50%', borderColor: Colours.primary }} text={buttonText} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width * 0.1,
    borderRadius: width * 0.125,
    borderWidth: 1,
    borderColor: Colours.primary,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    color: Colours.background
  }
});