import { Dimensions, FlatList, SafeAreaView, SectionList, StyleSheet, Text, View } from "react-native";
import { Colours } from "../../constants/colours";
import ButtonIcon from "../../components/Buttons/ButtonIcon";
import Divider from "../../components/Divider";
import InputPromo from "../../components/Inputs/InputPromo";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit";
import ImageProduct from "../../components/ImageProduct";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, subtractFromCart } from "./ReducerCart";
import { useEffect, useMemo, useState } from "react";
import getProducts from "../../Home/Products/ServiceProducts";

const { width } = Dimensions.get('screen');

export default function ScreenCart({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProducts(0, 99).then((response) => {
      setProducts(response.products.reduce((collection, product) => {
        collection[product.id] = product;
        return collection
      }, {}));
    }).catch((e) => alert('Something went wrong'))
  }, [])

  const tailoredCart = useMemo(() => {
    const cartCopy = { ...cart }
    Object.keys(cart).forEach((id) => {
      const quantity = cart[id];
      const product = products[id];
      cartCopy[id] = { quantity, product }
    })
    return cartCopy
  }, [cart, products])

  const subTotal = useMemo(() => Object.values(tailoredCart).reduce((total, { quantity, product }) => total + ((product ? product.price : 0) * quantity), 0), [tailoredCart])

  const entrys = {
    'Sub total': subTotal,
    'Delivery': 28.00,
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colours.background, justifyContent: 'center', alignItems: 'center' }}>
      <SectionList
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        sections={[{ title: 'Cart', data: Object.values(tailoredCart) }]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <View style={{ width: width * 0.9, height: width * 0.4, borderTopWidth: 1, flexDirection: 'row', paddingVertical: '5%' }}>
          <ImageProduct
            style={{ width: width * 0.3 }}
            imageStyle={{ borderRadius: 0, height: width * 0.3, width: width * 0.3 }}
          />
          <View style={{ flex: 1, width: width * 0.5, paddingHorizontal: '7%', padding: '2%', justifyContent: "space-between" }}>
            <Text style={{ fontSize: width * 0.057, color: Colours.primary, fontFamily: 'AGaramondPro-Italic' }}>{item?.product?.title ?? ''}</Text>
            <Text style={{ fontSize: width * 0.037, color: Colours.primary, fontFamily: 'AGaramondPro-Bold' }}>{`R ${(item?.product?.price ?? 0).toFixed(2)}`}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ButtonSubmit onPress={() => {
                item?.product?.id && dispatch(removeFromCart(item?.product?.id))
              }} text="Remove" textStyle={{ color: Colours.primary }} style={{ width: width * 0.2, height: width * 0.075, borderColor: Colours.primary, borderWidth: 2, backgroundColor: 'transparent' }} />
              <View style={{ flexDirection: 'row', alignItems: "center", width: width * 0.25, justifyContent: 'space-around' }}>
                <ButtonIcon icon='remove' onPress={() => {
                  item?.product?.id && dispatch(subtractFromCart(item?.product?.id))
                }} style={{ height: width * 0.075, borderWidth: 2, borderColor: Colours.primary, width: width * 0.075, justifyContent: 'center', alignItems: 'center', borderRadius: width * 0.075 }} />
                <Text style={{ textAlignVertical: "center", fontSize: width * 0.04, height: width * 0.05, fontWeight: 'bold', color: Colours.primary }}>{item?.quantity}</Text>
                <ButtonIcon icon='add' onPress={() => {
                  item?.product?.id && dispatch(addToCart(item?.product?.id))
                }} style={{ height: width * 0.075, borderWidth: 2, borderColor: Colours.primary, width: width * 0.075, justifyContent: 'center', alignItems: 'center', borderRadius: width * 0.075 }} />
              </View>
            </View>
          </View>
        </View>}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ width: width * 0.9 }}>
            <View style={styles.navbar}>
              <ButtonIcon text='Back' onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.header}>
              <Text style={{ ...styles.textHeader, fontFamily: 'AGaramondPro-BoldItalic' }}>Cart</Text>
              <Divider />
            </View>
          </View>
        )}
        renderSectionFooter={({ section: { title } }) => (
          <View style={{ width: width * 0.9 }}>
            <View style={{ height: width * 0.3, justifyContent: "center", alignItems: "center" }}>
              <InputPromo />
            </View>
            <View style={{ backgroundColor: Colours.secondary, height: width * 0.7, width, marginLeft: '-5.5%', paddingTop: '10%', justifyContent: "center", alignItems: "center" }}>
              <View>
                <FlatList
                  data={Object.keys(entrys)}
                  renderItem={({ item }) => (<View style={{ flexDirection: 'row', width, justifyContent: 'space-between', padding: '5%', alignItems: "center", height: width * 0.15 }}>
                    <Text style={{ textAlign: "left", fontSize: width * 0.035, fontWeight: '300', color: Colours.primary }}>{item}</Text>
                    <Text style={{ textAlign: "right", fontSize: width * 0.035, fontFamily: 'AGaramondPro-Bold', color: Colours.primary }}>{`R ${entrys[item].toFixed(2)}`}</Text>
                  </View>)}
                />
              </View>
              <View style={{ width: '90%', marginHorizontal: '5%', borderTopWidth: 1, borderColor: Colours.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", height: width * 0.15 }}>
                <Text style={{ textAlign: "left", fontSize: width * 0.05, fontFamily: 'AGaramondPro-Bold', color: Colours.primary }}>Total</Text>
                <Text style={{ textAlign: "right", fontSize: width * 0.05, fontFamily: 'AGaramondPro-Bold', color: Colours.primary }}>{`R ${Object.values(entrys).reduce((collection, value) => collection + value, 0).toFixed(2)}`}</Text>
              </View>
              <ButtonSubmit text="Checkout" onPress={() => alert('Checkout')} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
  },
  navbar: {
    height: width * 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    height: width * 0.4,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 44,
    paddingRight: width * 0.15,
    color: Colours.primary,
  },
  filterBar: {
    height: width * 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});