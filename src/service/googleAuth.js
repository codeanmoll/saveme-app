import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '443608471182-v8d7nbrm962sibnsc15j3fg9ebgutcvn.apps.googleusercontent.com',
  offlineAccess: false,
});

export const googleLogin = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const userInfo = await GoogleSignin.signIn();

  console.log("Google userInfo:", userInfo);

  const { idToken } = userInfo;

  if (!idToken) {
    throw new Error("No idToken received from Google");
  }

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};




// 443608471182-v8d7nbrm962sibnsc15j3fg9ebgutcvn.apps.googleusercontent.com