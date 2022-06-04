import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Sign up
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPWScreen from "../screens/ForgotPWScreen";

import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

function Navigation(props) {
  let options = {};
  return (
    <NavigationContainer>
    	{props.authUser ? (
    		<Stack.Navigator>
		      <Stack.Screen options={options} name="Home" component={HomeScreen} />
		    </Stack.Navigator>
    	) : (
		    <Stack.Navigator>
		      <Stack.Screen options={options} name="SignIn" component={SignInScreen} />
		      <Stack.Screen options={options} name="SignUp" component={SignUpScreen} />
		      <Stack.Screen options={options} name="ForgotPW" component={ForgotPWScreen} />
		    </Stack.Navigator>
		   )} 
    </NavigationContainer>
  );
}

export default Navigation;