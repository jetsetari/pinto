import React, { useRef, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./Terms-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import HeaderContainer from "~/components/HeaderContainer";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

function TermsScreen(props) {

  return (
    <HeaderContainer title={i18n.t('terms')} back="Account" navigation={props.navigation}>
      <Content>
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.e_layout, { marginTop: 0}]}>
              <H2 style={styles.SubHeadingText}>Agreement to Terms</H2>
              <Text style={styles.description}>
                {i18n.t('terms_text')}
              </Text>

              <H2 style={styles.SubHeadingText}>Intellectual Property Rights</H2>
              <Text style={styles.description}>
                {i18n.t('terms_text2')} 
              </Text>

            </View>
        </SafeAreaView>
      </Content>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(TermsScreen);
