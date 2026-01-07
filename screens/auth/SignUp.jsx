import { React, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import SignUpStyle from "./style/Signup"
import CustomInput from './CustomInput';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={SignUpStyle.Screen}>
      <Text style={SignUpStyle.headline}>Register</Text>
      <Text style={SignUpStyle.subline}>Login to make use emergency alert, top up & live tracking and more!</Text>
      <View style={SignUpStyle.main}>
          <CustomInput
          placeholder="Enter your usenrame"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")} style={SignUpStyle.primaryBtn} activeOpacity={0.7}>
          <Text style={SignUpStyle.primaryBtnText}>Login to continue</Text>
        </TouchableOpacity>
      </View>
      <View style={SignUpStyle.footer}>
        <View style={SignUpStyle.plainLine}></View>
        <Text style={SignUpStyle.plainLineText}>Or</Text>
        <View style={SignUpStyle.plainLine}></View>
      </View>
      <View style={SignUpStyle.hyperlink}>
        <View style={SignUpStyle.container}>
          <Text style={SignUpStyle.item}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")} style={SignUpStyle.primaryFooterBtn} activeOpacity={0.7}>
            <Text style={SignUpStyle.primaryFooterText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignUp;
