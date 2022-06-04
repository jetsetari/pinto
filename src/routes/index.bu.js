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
import NotificationsScreen from "~/screens/Settings/NotificationsScreen";
import TermsScreen from "~/screens/Settings/TermsScreen";
import WalletScreen from "~/screens/Settings/WalletScreen";

import TabBar from "~/components/TabBar";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const RootStack = createStackNavigator();
const NewStack = createSharedElementStackNavigator();
const MachineStack = createSharedElementStackNavigator();

function HomeStackScreen() {
  return (
    <NewStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NewStack.Screen name="Main" component={HomeScreen} />
      <NewStack.Screen name="Home" component={FoodScreen} />
      <NewStack.Screen name="Cart" component={CartScreen} />
      <NewStack.Screen name="Details" component={FoodDetailScreen} />
    </NewStack.Navigator>
  );
}

function MachineStackScreen(props) {
  return (
    <MachineStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <MachineStack.Screen routeName="Map" name="Map" initialParams={props.route.params} component={MachineMapScreen} />
      <MachineStack.Screen name="MachineDetail" initialParams={props.route.params} component={MachineDetailScreen} />
    </MachineStack.Navigator>
  );
}

function HelpStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <SettingsStack.Screen name="Help" component={HelpScreen} />
      <SettingsStack.Screen name="HelpDetail" component={HelpDetailScreen} />
    </SettingsStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <SettingsStack.Screen name="Account" component={AccountScreen} />
      <SettingsStack.Screen name="Orders" component={OrdersScreen} />
      <SettingsStack.Screen name="Contact" component={ContactScreen} />
      <SettingsStack.Screen name="Terms" component={TermsScreen} />
      <SettingsStack.Screen name="Notifications" component={NotificationsScreen} />
      <SettingsStack.Screen name="Company" component={CompanyScreen} />
      <SettingsStack.Screen name="Wallet" component={WalletScreen} />
    </SettingsStack.Navigator>
  );
}

function PickUpStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen name="PickUp" component={PickUpScreen} />
      <HomeStack.Screen name="ChooseOrder" component={ChooseOrderScreen} initialParams={{ data: [] }} />
    </HomeStack.Navigator>
  );
}
function TabNavigation() {
  let options = {
    headerStyle: {
      backgroundColor: "#1E8C62",
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    cardStyle: { backgroundColor: "red" },
  };
  return (
    <Tab.Navigator
      tabBarPosition="none"
      tabBar={(props) => <TabBar {...props} />}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#fff",
        inactiveTintColor: "#000"
      }}
    >
      <Tab.Screen name="Food" component={HomeStackScreen} options={options} />
      <Tab.Screen name="Pick Up" component={PickUpStackScreen} options={options} />
      <Tab.Screen name="Account" component={SettingsStackScreen} options={options} />
    </Tab.Navigator>
  );
}
function Navigation(props) {
  
  let options = {
    headerShown: false,
    headerStyle: { backgroundColor: "#1E8C62", elevation: 0, shadowOpacity: 0 },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
    cardStyle: { backgroundColor: "#123835" },
  };

  let rootOptions = {
    headerStyle: { backgroundColor: "#1E8C62", elevation: 0, shadowOpacity: 0},
    headerTintColor: "#fff",
  };

  return (
    <NavigationContainer>
      {props.authUser ? (
        <RootStack.Navigator mode="modal">
          <RootStack.Screen name="Back" component={TabNavigation} options={{ headerShown: false }} />
          <RootStack.Screen name="Payment" component={PaymentScreen} options={rootOptions} initialParams={props.route ? props.route.params : {}} />
          <RootStack.Screen name="Map" component={MachineStackScreen} options={{ headerShown: false }} />
          <SettingsStack.Screen name="HelpStackScreen" component={HelpStackScreen}options={{ headerShown: false }}  />
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
