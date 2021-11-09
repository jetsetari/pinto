import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import "firebase/firestore";
import * as firebase from "../../firebase";
import { styles } from "./ForgotPW-styles";
import { globalStyles } from "../../globalStyles/styles.js";
import { doPasswordReset } from "../../firebase/auth";
import { StatusBar } from "expo-status-bar";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";

function ForgotPWScreen({ route, navigation }) {
  const [email, setEmail] = useState(route.params.email);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function onLoginSuccess(result) {
    setSuccess(true);
  }

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
    doPasswordReset(email, (result, error) => {
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
    await firebase.auth
      .sendPasswordResetEmail(email)
      .then((result) => onLoginSuccess(result))
      .catch((error) => {});
  }

  return (
    <ScrollHeaderContainer navigation={navigation} backButton={route.params.previous_screen} title="Forgot Password">
<StatusBar style="light" hidden="false" />
          {success ? (
            <View style={[styles.e_layout, globalStyles.containerLogo]}>
              <Text style={styles.pwreset}>Check your email to reset your password: {email}</Text>
            </View>
          ) : (
            <>
              <View style={[styles.e_layout, globalStyles.containerLogo]}>
                <TextInput autoCapitalize="none" keyboardType="email-address" autoCompleteType="email" style={globalStyles.inputText} placeholder="Email" placeholderTextColor="#B1B1B1" returnKeyType="next" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={(email) => setEmail(email)} />
              </View>
              {renderLoading()}
              <Text style={{ fontSize: 18, textAlign: "center", color: "red", width: "80%" }}>{errorMessage}</Text>

              <View style={styles.e_layout}>
                <TouchableOpacity style={globalStyles.mainButton} onPress={() => signInWithEmail()}>
                  <Text style={globalStyles.mainButtonText}>Send me a link!</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
    </ScrollHeaderContainer>
  );
}

export default ForgotPWScreen;
