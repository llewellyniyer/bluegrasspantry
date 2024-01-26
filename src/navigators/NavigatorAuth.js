import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenSignUp from '../Auth/SignUp/ScreenSignUp';

export default function NavigatorAuth() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign Up" component={ScreenSignUp} />
    </Stack.Navigator>
  )
}