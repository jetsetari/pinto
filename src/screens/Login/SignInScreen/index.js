import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, Image } from "react-native";

import "firebase/firestore";
import * as firebase from "~/firebase";

import { styles } from "./SignIn-styles";
import { globalStyles } from "~/assets/styles/styles.js";
import { doSignInWithEmailAndPassword } from "~/firebase/auth";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;


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
    <View style={ globalStyles.mainLoginContainer }>
      <Image style={ globalStyles.loginLogoImg } source={require("~/assets/images/logo-full.png")} />
      <View style={[styles.e_layout, globalStyles.containerLogo ]}>
        <TextInput autoCapitalize="none" keyboardType="email-address" autoCompleteType="email" style={globalStyles.inputText} placeholder={i18n.t('email')} placeholderTextColor="#B1B1B1" returnKeyType="next" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={(email) => setEmail(email)} />
        <TextInput autoCapitalize="none" autoCompleteType="password" style={globalStyles.inputText} placeholder={i18n.t('password')} placeholderTextColor="#B1B1B1" returnKeyType="done" textContentType="newPassword" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} />
      </View>
      {renderLoading()}
      <Text style={ globalStyles.errorMsg }>{errorMessage}</Text>
      <View style={styles.e_layout}>
        <TouchableOpacity style={globalStyles.mainButton}  onPress={() => signInWithEmail()}>
          <Text style={globalStyles.mainButtonText}>{i18n.t('login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => {
            navigation.navigate("Forgot password", { email: email, previous_screen: "Sign In" });
          }}
        >
          <Text style={styles.forgotButtonText}>{i18n.t('forgotpass')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.e_layout}>
        <View style={styles.or}>
          <View style={styles.leftOr}></View>
          <Text style={styles.orText}>{i18n.t('or')}</Text>
          <View style={styles.rightOr}></View>
        </View>
        <TouchableOpacity
          style={globalStyles.mainLineButton}
          onPress={() => {
            navigation.navigate("Sign Up", { previous_screen: "Sign In" });
          }}
        >
          <Text style={globalStyles.mainLineButtonText}>{i18n.t('signup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignInScreen;
