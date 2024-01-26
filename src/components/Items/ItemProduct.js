import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colours } from "../../constants/colours";
import ButtonIcon from "../Buttons/ButtonIcon";
import ImageProduct from "../ImageProduct";

const { width } = Dimensions.get('screen');

export default function ItemProduct(props) {
  const {
    name = 'Click',
    price = '100',
    src = 'https://reactnative.dev/img/tiny_logo.png',
    fallback = 'https://reactnative.dev/img/tiny_logo.png',
    onPress = () => null,
    style = {},
  } = props
  return (
    <View onPress={onPress} style={[styles.container, style]}>
      <ImageProduct
        src={src}
        fallback={fallback}
      />
      <View style={{ justifyContent: "space-between", flex: 1, paddingTop: '10%' }}>
        <Text style={{
          color: 'gray',
          fontFamily: 'AGaramondPro-Regular',
          fontSize: width * 0.04,
        }}>{name}</Text>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: "space-between",
          alignItems: 'flex-end'
        }}>
          <Text style={{
            fontSize: width * 0.04,
            color: Colours.primary,
            fontFamily: 'AGaramondPro-Bold'
          }}>{`R ${(price / 100).toFixed(2)}`}</Text>
          <ButtonIcon
            onPress={onPress}
            size={15}
            icon='cart-outline'
            style={{
              borderWidth: 1,
              width: width * 0.05,
              height: width * 0.05,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: width * 0.05
            }} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.425,
    height: width * 0.625,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: width * 0.01,
    marginVertical: width * 0.05,
  },
  text: {
    fontSize: width * 0.06,
  },
  image: {
    width: width * 0.425,
    height: width * 0.425,
    borderRadius: width * 0.05,
  }
});