import { Alert, Dimensions, FlatList, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colours } from "../../constants/colours";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonText from "../../components/Buttons/ButtonText";
import Divider from "../../components/Divider";
import FormField from "../../components/Inputs/FormField";
import ButtonIcon from "../../components/Buttons/ButtonIcon";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit";
import ButtonLink from "../../components/Buttons/ButtonLink";
import { useState } from "react";

const { width, height } = Dimensions.get('screen');

export default function ScreenSignUp({ navigation }) {
  const header = 'Welcome to Pantry by Marble'
  const subHeader = 'Sign up for easy payment, collection and much more'
  const footer = 'By signing up you agree to our, '

  const [formMap, setFormMap] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const goHome = () => navigation.navigate('Home')

  return (
    <KeyboardAwareScrollView
      horizontal={false}
      contentContainerStyle={{
        height: height * 1.25,
        width: '100%',
        backgroundColor: Colours.background,
        paddingHorizontal: width * 0.05
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
          <ButtonIcon onPress={() => navigation.goBack()} />
          <ButtonText text={'Explore App'} onPress={goHome} />
        </View>
        <View style={styles.header}>
          <Text style={{ ...styles.textHeader, fontFamily: 'AGaramondPro-BoldItalic' }}>{header}</Text>
          <Text style={styles.textSubHeader}>{subHeader}</Text>
          <Divider />
        </View>
        <View style={styles.form}>
          <FlatList
            scrollEnabled={false}
            data={Object.keys(formMap)}
            renderItem={({ item, index }) => <FormField key={index} type={item} value={formMap[item]} setValue={(value) => setFormMap({ ...formMap, [item]: value })} />}
            style={{ width: '100%' }}
            contentContainerStyle={styles.flatlist}
          />
          <View style={styles.buttonContainer}>
            <ButtonSubmit text='Sign Up' onPress={() => {
              const index = Object.values(formMap).findIndex((value) => !value);
              if (index == -1) return goHome();
              Alert.alert(`Please enter a valid ${Object.keys(formMap)[index]}`)
            }} />
            <ButtonLink onPress={() => alert('Navigate to Sign in')} >
              <Text style={styles.textLink}>Have an account?<Text style={{ ...styles.textLink, fontWeight: 'bold' }}>{' Login'}</Text></Text>
            </ButtonLink>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Divider style={{ height: width * 0.002 }} />
            <Text style={{ width: width * 0.1, textAlign: "center" }}>or</Text>
            <Divider style={{ height: width * 0.002 }} />
          </View>
          <ButtonSubmit text='Explore our app' onPress={goHome} />
          <ButtonLink onPress={() => Linking.openURL('https://www.bluegrassdigital.com/blog/')}>
            <Text style={styles.textLink}>
              {footer}
              <Text style={{ ...styles.textLink, fontWeight: 'bold' }}>
                {' Terms, Data Policy, '}
              </Text>
              and
              <Text style={{ ...styles.textLink, fontWeight: 'bold' }}>
                {' Cookies Policy'}
              </Text>
            </Text>
          </ButtonLink>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    overflow: 'scroll'
  },
  navbar: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flex: 4,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 44,
    paddingRight: width * 0.15,
    color: Colours.primary,
  },
  textSubHeader: {
    fontSize: 18,
    fontWeight: '300',
    paddingRight: width * 0.15,
    color: Colours.primary,
    lineHeight: width * 0.06,
    paddingVertical: width * 0.02
  },
  form: {
    flex: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textLink: {
    fontSize: width * 0.03,
    color: Colours.primary,
    textAlign: 'center'
  },
  flatlist: {
    width: '100%',
    justifyContent: 'space-around',
    flex: 1,
    paddingTop: '25%',
    paddingBottom: '5%'
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingVertical: '5%'
  }
});