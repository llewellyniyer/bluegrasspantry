import { useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, View } from "react-native";
import { Colours } from "../constants/colours";

const { width } = Dimensions.get('screen');

export default function ImageProduct(props) {
  const {
    src = 'https://reactnative.dev/img/tiny_logo.png',
    fallback = 'https://reactnative.dev/img/tiny_logo.png',
    style = {},
    imageStyle = {}
  } = props
  const [uri, setUri] = useState(src);
  const [loaded, setLoaded] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <Image
        style={[styles.image, imageStyle]}
        source={{ uri }}
        onLoadStart={() => setLoaded(false)}
        onLoadEnd={() => setLoaded(true)}
        onError={() => setUri(fallback)}
      />
      <ActivityIndicator style={{
        ...styles.image,
        position: 'absolute',
        backgroundColor: Colours.background,
        display: loaded ? 'none' : 'flex'
      }} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.02,
  }
});