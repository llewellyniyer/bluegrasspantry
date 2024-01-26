import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenProducts from '../Home/Products/ScreenProducts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colours } from '../constants/colours';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ScreenCart from '../Checkout/Cart/ScreenCart';

const { width } = Dimensions.get('screen');

export default function NavigatorHome() {

  const Tab = createBottomTabNavigator();
  const RenderIcon = (icon) => ({ focused }) => <View style={{ alignItems: 'center' }}><Ionicons name={`${icon}-outline`} size={30} color={'white'} />{focused && <Text style={styles.highlight}>.</Text>}</View>
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: Colours.primary, height: width * 0.25 }, tabBarShowLabel: false }}>
      <Tab.Screen name="Products" component={ScreenProducts} options={{
        tabBarIcon: RenderIcon('storefront')
      }} />
      <Tab.Screen name="Favourites" component={ScreenProducts} options={{
        tabBarIcon: RenderIcon('heart')
      }} />
      <Tab.Screen name="Search" component={ScreenProducts} options={{
        tabBarIcon: RenderIcon('search')
      }} />
      <Tab.Screen name="Checkout" component={ScreenCart} options={{
        tabBarIcon: RenderIcon('cart'),
        tabBarStyle: { display: 'none' }
      }} />
      <Tab.Screen name="Profile" component={ScreenProducts} options={{
        tabBarIcon: RenderIcon('person')
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  highlight: { fontSize: width * 0.1, position: 'absolute', color: 'white' }
});