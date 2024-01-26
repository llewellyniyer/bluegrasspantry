import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorHome from './NavigatorHome';
import NavigatorAuth from './NavigatorAuth';
import { useEffect, useState } from "react";
import { loadAsync } from 'expo-font';
import Loader from '../components/Loader';

export default function NavigatorRoot() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadAsync({
        'AGaramondPro-BoldItalic': require('../../assets/fonts/AGaramondPro-BoldItalic.otf'),
        'AGaramondPro-Bold': require('../../assets/fonts/AGaramondPro-Bold.otf'),
        'AGaramondPro-Regular': require('../../assets/fonts/AGaramondPro-Regular.otf'),
        'AGaramondPro-Italic': require('../../assets/fonts/AGaramondPro-Italic.otf'),
        'AGaramondPro-SemiboldItalic': require('../../assets/fonts/AGaramondPro-SemiboldItalic.otf'),
      });
      setFontsLoaded(true)
    })()
  }, [])

  return fontsLoaded ? (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={NavigatorAuth} />
      <Stack.Screen name="Home" component={NavigatorHome} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : <Loader />
}