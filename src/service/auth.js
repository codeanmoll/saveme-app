import auth from '@react-native-firebase/auth';

export const signup = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

export const login = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

export const logout = () => auth().signOut();
