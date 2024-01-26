import { Dimensions, TouchableOpacity, StyleSheet, Text, TextInput, View, Animated } from "react-native";
import { Colours } from "../../constants/colours";
import ButtonIcon from "../Buttons/ButtonIcon";
import { useRef, useState } from "react";
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('screen');

export default function FormField(props) {
  const [fontsLoaded, fontError] = useFonts({
    'AGaramondPro-BoldItalic': require('../../../assets/fonts/AGaramondPro-BoldItalic.otf'),
  });

  const {
    type = 'name',
    value = '',
    setValue = () => null,
    style = {}
  } = props
  const sizeAnim = useRef(new Animated.Value((value || type == 'phone') ? 0 : 1)).current; // Initial value for opacity: 0
  const [input, setInput] = useState(value);
  const [valid, setValid] = useState(true);
  const [first, setFirst] = useState(true);
  const [visible, setVisible] = useState(false);

  const animate = (reverse = false) => {
    Animated.timing(sizeAnim, {
      toValue: reverse ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  const validationMap = {
    name: {
      title: 'Full Name',
      message: 'Enter first name and last name',
      validation: (text) => {
        text = text.trim();
        const { length } = text;
        if (!length) return;
        const elements = text.split(' ');
        if (elements.length < 2) return;
        return !elements.find((element) => !element.length)
      }
    },
    email: {
      title: 'Email',
      message: 'Enter a valid email',
      validation: (text) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text),
      inputMode: 'email'
    },
    phone: {
      title: 'Phone Number',
      message: 'Enter a valid phone number',
      validation: (text) => {
        text = text.slice(6)
        if (text.length !== 9 || Number(text[0]) < 6) return;
        return /^\d+$/.test(text)
      },
      prefix: '+27 | ',
      inputMode: 'tel'
    },
    password: {
      password: true,
      title: 'Password',
      message: 'Password must contain 8 characters, special character, capital letter and digit',
      validation: (text) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(text)
    },
  }

  const { title, message, validation, prefix, inputMode, password } = validationMap[type];
  const validate = () => {
    setFirst(false);
    const valid = validation(input)
    if (input) {
      setValid(valid)
      setValue(valid ? input : '');
    } else {
      setValid(true)
      !prefix && animate(true)
    }
  }
  return (
    <TouchableOpacity onPress={() => animate()} style={[styles.container, style]}>
      <Animated.Text
        style={{
          ...styles.label,
          fontWeight: input ? '300' : 'bold',
          fontFamily: input ? '' : 'AGaramondPro-BoldItalic',
          transform: [{
            scale: sizeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1]
            }),
          }, {
            translateY: sizeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0]
            }),
          }]
        }}>{title}</Animated.Text>
      <View style={styles.inputContainer}>
        {prefix && <Text style={{ ...styles.input, width: '18%', fontFamily: 'AGaramondPro-BoldItalic', }}>{prefix}</Text>}
        <TextInput
          onBlur={validate}
          onFocus={() => animate()}
          secureTextEntry={password && !visible}
          inputMode={inputMode ?? "text"}
          style={{ ...styles.input, fontFamily: 'AGaramondPro-BoldItalic', width: prefix ? '80%' : '100%' }}
          value={input}
          onChangeText={(value) => {
            setInput(value);
            !first && validate();
          }}
          placeholderTextColor={Colours.primary}
        />
        <ButtonIcon onPress={() => {
          if (password) return setVisible(!visible)
          setValid(true);
          setFirst(true);
          setValue('');
          setInput('');
          !prefix && animate(true);
        }} icon={password ? `eye-${visible ? '' : 'off-'}outline` : "close"} />
      </View>
      {!valid && <Text style={styles.error} placeholderTextColor={Colours.error} >{message}</Text>}
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: width * 0.175,
  },
  label: {
    fontSize: width * 0.03,
    fontWeight: '300',
    color: Colours.primary,
    position: 'absolute',
    transformOrigin: 'left',
    fontSize: width * 0.06,
    top: width * 0.04,
  },
  input: {
    width: '100%',
    paddingTop: width * 0.03,
    paddingBottom: width * 0.02,
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: Colours.primary,
  },
  error: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: Colours.error,
    paddingBottom: width * 0.02,
  },
  inputContainer: {
    width: '100%',
    paddingRight: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderEndColor: Colours.primary,
    borderStyle: "solid"
  },
});