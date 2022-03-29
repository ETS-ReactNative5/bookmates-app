import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts, Baloo2_800ExtraBold, Baloo2_600SemiBold} from '@expo-google-fonts/baloo-2';
import {Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto'
import SplashScreen from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPW from './screens/ForgotPW';
import ChangePW from './screens/ChangePW';
import BookmatesMap from './screens/BookmatesMap';
import MyTabs from './screens/Tabs';
import EditProfile from './screens/EditProfile';
import BookDetails from './screens/BookDetails';
import BookmateProfile from './screens/BookmateProfile';
import WriteReview from './screens/WriteReview';
import { AuthContext } from './context/AuthContext';

function App() {
  
  const Stack = createNativeStackNavigator();
  const [authState, setAuthState] = useState({
    LoggedIn: true,
  })

  const [fontsLoaded] = useFonts({
    Baloo2_800ExtraBold,
    Baloo2_600SemiBold,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_700Bold
  });

  if (!fontsLoaded){
    return null;
  }

  return (
    <AuthContext.Provider value={authState.LoggedIn}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{
          headerShown: false
        }}>
        {authState.LoggedIn ? (
          <>
            <Stack.Screen name="BookmatesMap" component = {MyTabs} />
            <Stack.Screen name="EditProfile" component = {EditProfile} />
            <Stack.Screen name="BookDetails" component = {BookDetails} />
            <Stack.Screen name="BookmateProfile" component = {BookmateProfile} />
            <Stack.Screen name="WriteReview" component = {WriteReview} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component = {Login} />
            <Stack.Screen name="Signup" component = {Signup} />
            <Stack.Screen name="ForgotPW" component = {ForgotPW} />
            <Stack.Screen name="ChangePW" component = {ChangePW} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

