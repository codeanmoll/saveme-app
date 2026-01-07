import { React, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native'
import SignUpStyle from "./style/Signup"
import CustomInput from './CustomInput';
import { useNavigation } from '@react-navigation/native';
import { googleLogin } from '../../src/service/googleAuth';
const Login = () => {
 const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={SignUpStyle.Screen}>
      <Text style={SignUpStyle.headline}>Login</Text>
      <Text style={SignUpStyle.subline}>Login to make use emergency alert, top up & live tracking and more!</Text>
      <View style={SignUpStyle.main}>
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
        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={SignUpStyle.primaryBtn} activeOpacity={0.7}>
          <Text style={SignUpStyle.primaryBtnText}>Login to continue</Text>
        </TouchableOpacity>
      </View>
      <View style={SignUpStyle.footer}>
        <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <View style={SignUpStyle.plainLine}></View>
        <Text style={SignUpStyle.plainLineText}>Or</Text>
        <View style={SignUpStyle.plainLine}></View>
        </View>


<View style={{display:"flex",flexDirection:"column"}}> 
  <Button
        title="Sign in with Google"
        onPress={googleLogin}
      />
      </View>
       
      </View>
      <View style={SignUpStyle.hyperlink}>
        <View style={SignUpStyle.container}>
          <Text style={SignUpStyle.item}>Don't Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={SignUpStyle.primaryFooterBtn} activeOpacity={0.7}>
          <Text style={SignUpStyle.primaryFooterText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login
