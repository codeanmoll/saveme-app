import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LandScreen from './screens/LandScreen';
import RNBootSplash from "react-native-bootsplash";
import SignUp from './screens/auth/SignUp';
import Login from './screens/auth/Login';
import Home from './screens/Home'  ;
import BottomTab from "./components/BottomTab"
import auth from '@react-native-firebase/auth';
const Stack = createNativeStackNavigator();

const App = () => {

  const onReady = () => {
    RNBootSplash.hide({ fade: true });
  };



useEffect(() => {
  auth().onAuthStateChanged(user => {
    console.log("Firebase user:", user);
  });
}, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer onReady={onReady}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='LandScreen' component={LandScreen} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='LogIn' component={Login}/>
          <Stack.Screen name='Main' component={BottomTab}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;
