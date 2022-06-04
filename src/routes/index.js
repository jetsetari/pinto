import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//LOGIN
import SignInScreen from "~/screens/Login/SignInScreen";
import SignUpScreen from "~/screens/Login/SignUpScreen";
import ForgotPWScreen from "~/screens/Login/ForgotPWScreen";

//HOME
import HomeScreen from "~/screens/Home";

//ORDER
import CartScreen from "~/screens/Order/CartScreen";
import ChooseOrderScreen from "~/screens/Order/ChooseOrderScreen";
import FoodDetailScreen from "~/screens/Order/FoodDetailScreen";
import FoodScreen from "~/screens/Order/FoodScreen";
import MachineDetailScreen from "~/screens/Order/MachineDetailScreen";
import MachineMapScreen from "~/screens/Order/MachineMapScreen";
import OrdersScreen from "~/screens/Order/OrdersScreen";
import PaymentScreen from "~/screens/Order/PaymentScreen";
import PickUpScreen from "~/screens/Order/PickUpScreen";

//SETTINGS
import AccountScreen from "~/screens/Settings/AccountScreen";
import CompanyScreen from "~/screens/Settings/CompanyScreen";
import ContactScreen from "~/screens/Settings/ContactScreen";
import HelpDetailScreen from "~/screens/Settings/HelpDetailScreen";
import HelpScreen from "~/screens/Settings/HelpScreen";
import LanguageScreen from "~/screens/Settings/LanguageScreen";
import NotificationsScreen from "~/screens/Settings/NotificationsScreen";
import TermsScreen from "~/screens/Settings/TermsScreen";
import WalletScreen from "~/screens/Settings/WalletScreen";

import TabBar from "~/components/TabBar";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function Navigation(props) {
  
  let options = {
    headerShown: false,
    headerStyle: { backgroundColor: "#1E8C62", elevation: 0, shadowOpacity: 0 },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
    cardStyle: { backgroundColor: "#123835" },
  };

  // let rootOptions = {
  //   headerStyle: { backgroundColor: "#1E8C62", elevation: 0, shadowOpacity: 0},
  //   headerTintColor: "#fff",
  // };

  return (
    <NavigationContainer>
      {props.authUser ? (
        <RootStack.Navigator mode="modal">
          <RootStack.Screen name="Main" options={options} component={HomeScreen} />
          <RootStack.Screen name="Home" options={options} component={FoodScreen} />
          <RootStack.Screen name="Payment" options={options} component={PaymentScreen} options={options} initialParams={props.route ? props.route.params : {}} />
          <RootStack.Screen name="HelpStackScreen" options={options} component={HelpScreen} options={options}  />
          <RootStack.Screen name="Cart" options={options} component={CartScreen} />
          <RootStack.Screen name="Details" options={options} component={FoodDetailScreen} />
          <RootStack.Screen name="Map" options={options} component={MachineMapScreen} />
          <RootStack.Screen name="MachineDetail" options={options} component={MachineDetailScreen} />
          <RootStack.Screen name="Help" options={options} component={HelpScreen} />
          <RootStack.Screen name="Language" options={options} component={LanguageScreen} />
          <RootStack.Screen name="HelpDetail" options={options} component={HelpDetailScreen} />
          <RootStack.Screen name="Account" options={options} component={AccountScreen} />
          <RootStack.Screen name="Orders" options={options} component={OrdersScreen} />
          <RootStack.Screen name="Contact" options={options} component={ContactScreen} />
          <RootStack.Screen name="Terms" options={options} component={TermsScreen} />
          <RootStack.Screen name="Notifications" options={options} component={NotificationsScreen} />
          <RootStack.Screen name="Company" options={options} component={CompanyScreen} />
          <RootStack.Screen name="Wallet" options={options} component={WalletScreen} />
          <RootStack.Screen name="PickUp" options={options} component={PickUpScreen} />
          <RootStack.Screen name="ChooseOrder" options={options} component={ChooseOrderScreen} initialParams={{ data: [] }} />
        </RootStack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignInScreen} options={options} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={options} />
          <Stack.Screen name="Forgot password" component={ForgotPWScreen} options={options} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;
