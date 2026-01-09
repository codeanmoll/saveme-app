import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RNBootSplash from "react-native-bootsplash";
import { NativeModules } from 'react-native';

import LandScreen from './screens/LandScreen';
import SignUp from './screens/auth/SignUp';
import Login from './screens/auth/Login';
import BottomTab from "./components/BottomTab"
import AiHelpScreen from './screens/AiHelpScreen';

import { initLlama } from "./src/ai/llama";
import { prepareModel } from "./src/utils/prepareModel";

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import api from "./screens/auth/api/api";

const { Gemma } = NativeModules;
const Stack = createNativeStackNavigator();

const App = () => {

  const onReady = () => {
    RNBootSplash.hide({ fade: true });
  };

  // Load AI
  useEffect(() => {
    (async () => {
      const path = await prepareModel();
      await initLlama(path);
      console.log("Gemma model loaded at:", path);
    })();
  }, []);

  // Setup push notifications
  useEffect(() => {
    async function setupPush() {
      const status = await messaging().requestPermission();
      console.log("Notification permission:", status);

      if (
        status === messaging.AuthorizationStatus.AUTHORIZED ||
        status === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);

        if (token) {
          await api.post("/save_fcm_token.php", { fcm_token: token });
        }
      }

      await notifee.createChannel({
        id: 'alerts',
        name: 'Emergency Alerts',
        importance: notifee.AndroidImportance.HIGH,
      });
    }

    setupPush();
  }, []);

  // Foreground message handler
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Foreground push received:", remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || "Alert",
        body: remoteMessage.notification?.body || "",
        android: {
          channelId: 'alerts',
          importance: notifee.AndroidImportance.HIGH,
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
  setTimeout(async () => {
    await notifee.displayNotification({
      title: 'Test Notification',
      body: 'If you see this, Notifee works',
      android: { channelId: 'alerts' },
    });
  }, 3000);
}, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer onReady={onReady}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='LandScreen' component={LandScreen} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='LogIn' component={Login} />
          <Stack.Screen name='Main' component={BottomTab} />
          <Stack.Screen name='AiScreen' component={AiHelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}


export default App;
