import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import "firebase/firestore";
import * as firebase from "../../firebase";
import { styles } from "./SignIn-styles";
import { globalStyles } from "../../globalStyles/styles.js";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function onLoginSuccess(result) {}

  function onLoginFailure(errorMessage) {
    setLoading(false);
    setErrorMessage(errorMessage);
  }

  function renderLoading() {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }

  async function signInWithEmail() {
    doSignInWithEmailAndPassword(email, password, (result, error) => {
      if (result === "error") {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          onLoginFailure("Weak Password!");
        } else {
          onLoginFailure(errorMessage);
        }
      }
    });
  }

  return (
    <ScrollHeaderContainer title="Sign In">
      <StatusBar style="light" hidden={false} />
      <View style={[styles.e_layout, globalStyles.containerLogo ]}>
        <TextInput autoCapitalize="none" keyboardType="email-address" autoCompleteType="email" style={globalStyles.inputText} placeholder="Email" placeholderTextColor="#B1B1B1" returnKeyType="next" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={(email) => setEmail(email)} />
        <TextInput autoCapitalize="none" autoCompleteType="password" style={globalStyles.inputText} placeholder="Password" placeholderTextColor="#B1B1B1" returnKeyType="done" textContentType="newPassword" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} />
      </View>
      {renderLoading()}
      <Text style={{ fontSize: 18, textAlign: "center", color: "red", width: "80%" }}>{errorMessage}</Text>

      <View style={styles.e_layout}>
        <TouchableOpacity style={globalStyles.mainButton}  onPress={() => signInWithEmail()}>
          <Text style={globalStyles.mainButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => {
            navigation.navigate("Forgot password", { email: email, previous_screen: "Sign In" });
          }}
        >
          <Text style={styles.forgotButtonText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.e_layout}>
        <View style={styles.or}>
          <View style={styles.leftOr}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.rightOr}></View>
        </View>
        <TouchableOpacity
          style={globalStyles.mainLineButton}
          onPress={() => {
            navigation.navigate("Sign Up", { previous_screen: "Sign In" });
          }}
        >
          <Text style={globalStyles.mainLineButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollHeaderContainer>
  );
}

export default SignInScreen;
