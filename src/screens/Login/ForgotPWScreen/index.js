import React, { useState } from "react";
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import "firebase/firestore";
import * as firebase from "~/firebase";
import { styles } from "./ForgotPW-styles";
import { globalStyles } from "~/assets/styles/styles.js";
import { doPasswordReset } from "~/firebase/auth";
import { StatusBar } from "expo-status-bar";

import { Feather } from "@expo/vector-icons";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

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
    <View style={ globalStyles.mainLoginContainer }>
      <TouchableOpacity style={globalStyles.backButton} onPress={ () => navigation.navigate("Sign In", { previous_screen: "Forgot Password" }) }>
        <Feather name="chevron-left" size={20} color="#FFF" />
      </TouchableOpacity>
      <Image style={{ width: 155, height: 190, marginTop: 100 } } source={require("~/assets/images/logo-full.png")} />
        <StatusBar style="light" hidden={true} />
          {success ? (
            <View style={[styles.e_layout, globalStyles.containerLogo]}>
              <Text style={styles.pwreset}>Check your email to reset your password: {email}</Text>
            </View>
          ) : (
            <>
              <View style={[styles.e_layout, globalStyles.containerLogo]}>
                <TextInput autoCapitalize="none" keyboardType="email-address" autoCompleteType="email" style={globalStyles.inputText} placeholder={i18n.t('email')} placeholderTextColor="#B1B1B1" returnKeyType="next" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={(email) => setEmail(email)} />
              </View>
              {renderLoading()}
              <Text style={ globalStyles.errorMsg }>{errorMessage}</Text>

              <View style={styles.e_layout}>
                <TouchableOpacity style={globalStyles.mainButton} onPress={() => signInWithEmail()}>
                  <Text style={globalStyles.mainButtonText}>{i18n.t('sendlink')}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
    </View>
  );
}

export default ForgotPWScreen;
