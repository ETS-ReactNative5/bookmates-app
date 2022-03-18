import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts, Baloo2_800ExtraBold} from '@expo-google-fonts/baloo-2';
import SplashScreen from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPW from './screens/ForgotPW';
import ChangePW from './screens/ChangePW';

const Stack = createNativeStackNavigator();

function App() {

  const [fontsLoaded] = useFonts({
    Baloo2_800ExtraBold
  });

  if (!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component = {Login} />
        <Stack.Screen name="Signup" component = {Signup} />
        <Stack.Screen name="ForgotPW" component = {ForgotPW} />
        <Stack.Screen name="ChangePW" component = {ChangePW} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

