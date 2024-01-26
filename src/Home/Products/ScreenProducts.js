import { Dimensions, FlatList, SafeAreaView, SectionList, StyleSheet, Text, View } from "react-native";
import { Colours } from "../../constants/colours";
import ButtonText from "../../components/Buttons/ButtonText";
import Divider from "../../components/Divider";
import ButtonIcon from "../../components/Buttons/ButtonIcon";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import ItemProduct from "../../components/Items/ItemProduct";
import getProducts from "./ServiceProducts";
import { addToCart } from "../../Checkout/Cart/ReducerCart";
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');

export default function ScreenProducts({ navigation }) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const limit = 40;
  const [offset, setOffset] = useState(0);
  const filterList = ['Apple', 'Samsung', 'Huawei', 'Microsoft']

  useEffect(() => {
    setLoading(true);
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    getProducts(offset, limit)
      .then((response) => {
        setProducts([...products, ...response.products])
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false))
  }

  const filteredProducts = useMemo(() => selectedFilters.size
    ? products.filter(({ brand }) => (Array.from(selectedFilters).includes(brand)))
    : products
    , [selectedFilters, products])
  const tailoredProducts = useMemo(() => {
    const { length } = filteredProducts;
    const tailored = []
    for (let index = 0; index < Math.floor(length / 2); index++) {
      const j = index * 2
      tailored.push([filteredProducts[j], filteredProducts[j + 1]]);
    }
    if (length % 2 == 1) {
      tailored.push([filteredProducts[length - 1]]);
    }
    return tailored
  }, [filteredProducts])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colours.background, justifyContent: 'center', alignItems: 'center' }}>
      {loading
        ? <Loader />
        : <SectionList
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          sections={[{ title: 'Meat', data: tailoredProducts }]}
          keyExtractor={(item, index) => index}
          onEndReached={() => {
            setOffset(offset + 1)
            fetchProducts()
          }}
          onEndReachedThreshold={0.5}
          renderItem={(row) => <FlatList
            scrollEnabled={false}
            key={row.index}
            data={row.item}
            numColumns={2}
            renderItem={({ item }) => <ItemProduct
              onPress={() => {
                dispatch(addToCart(item.id));
                navigation.navigate('Checkout')
              }}
              key={item.id}
              price={item.price}
              name={item.title}
              src={item.images[0]}
            />}
          />}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <View style={styles.navbar}>
                <ButtonIcon text='Back' onPress={() => navigation.goBack()} />
                <ButtonIcon text='Filter' icon="options-outline" onPress={() => { }} />
              </View>
              <View style={styles.header}>
                <Text style={{ ...styles.textHeader, fontFamily: 'AGaramondPro-Bold' }}>Meat</Text>
                <Divider />
              </View>
              <View style={styles.filterBar}>
                <FlatList
                  horizontal
                  contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}
                  data={['All', ...filterList]}
                  renderItem={({ item, index }) => <ButtonText
                    key={item.id}
                    textStyle={{ fontSize: width * 0.025, color: index ? selectedFilters.has(item) ? Colours.primary : 'lightgray' : selectedFilters.size ? 'lightgray' : Colours.primary, fontWeight: '500' }}
                    style={{ width: width * 0.15, justifyContent: 'flex-start' }}
                    text={item}
                    onPress={() => {
                      if (index == 0) return setSelectedFilters(new Set())
                      !selectedFilters.delete(item) && selectedFilters.add(item)
                      setSelectedFilters(new Set(selectedFilters))
                    }} />}
                />
              </View>
              <View style={{ ...styles.header, height: width * 0.2, paddingTop: '5%' }}>
                <Text style={{ ...styles.textHeader, fontSize: width * 0.04, fontFamily: 'AGaramondPro-Regular' }}>Based on your selection</Text>
                <Text style={{ ...styles.textHeader, fontSize: width * 0.08, fontFamily: 'AGaramondPro-Bold' }}>Our products</Text>
              </View>
            </View>
          )}
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%'
  },
  navbar: {
    height: width * 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    height: width * 0.2,
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