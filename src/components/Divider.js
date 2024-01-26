import { Dimensions, Text, View } from "react-native";
import { Colours } from "../constants/colours";

const {width} = Dimensions.get('screen');

export default function Divider(props) {
  const {
    colour = Colours.primary,
    style = {}
  } = props
  return (
    <View style={{width: '100%', height: width * 0.04, backgroundColor: colour, ...style}}/>
  )
}