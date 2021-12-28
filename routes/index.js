import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FoodScreen from "../screens/FoodScreen";
import PickUpScreen from "../screens/PickUpScreen";
import ChooseOrderScreen from "../screens/ChooseOrderScreen";
import AccountScreen from "../screens/AccountScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPWScreen from "../screens/ForgotPWScreen";
import WalletScreen from "../screens/WalletScreen";
import OrdersScreen from "../screens/OrdersScreen";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import PaymentScreen from "../screens/PaymentScreen";
import MachineMapScreen from "../screens/MachineMapScreen";
import MachineDetailScreen from "../screens/MachineDetailScreen";
import CompanyScreen from "../screens/CompanyScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import TabBar from "../components/TabBar";

import ContactScreen from "../screens/ContactScreen";
import TermsScreen from "../screens/TermsScreen";
import HelpScreen from "../screens/HelpScreen";
import HelpDetailScreen from "../screens/HelpDetailScreen";
import CartScreen from "../screens/CartScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const RootStack = createStackNavigator();
const NewStack = createSharedElementStackNavigator();

function HomeStackScreen() {
  return (
    <NewStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NewStack.Screen name="Home" component={FoodScreen} />
      <NewStack.Screen name="Details" component={FoodDetailScreen} />
    </NewStack.Navigator>
  );
}

function MachineStackScreen(props) {
  return (
    <NewStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NewStack.Screen routeName="Map" name="Map" initialParams={props.route.params} component={MachineMapScreen} />
      <NewStack.Screen name="MachineDetail" initialParams={props.route.params} component={MachineDetailScreen} />
    </NewStack.Navigator>
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
      <SettingsStack.Screen name="Company" component={CompanyScreen} />
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
      tabBarPosition="bottom"
      tabBar={(props) => <TabBar {...props} />}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#fff",
        inactiveTintColor: "#000"
      }}
    >
      <Tab.Screen name="Food" component={HomeStackScreen} options={options} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={options} />
      <Tab.Screen name="Pick Up" component={PickUpStackScreen} options={options} />
      <Tab.Screen name="Shop" component={CartScreen} options={options} />
      <Tab.Screen name="Account" component={SettingsStackScreen} options={options} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={options} />
    </Tab.Navigator>
  );
}
function Navigation(props) {
  let options = {
    headerShown: false,
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
  let rootOptions = {
    headerStyle: {
      backgroundColor: "#1E8C62",
      elevation: 0,
      shadowOpacity: 0
    },
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
