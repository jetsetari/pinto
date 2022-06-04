import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./Contact-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import HeaderContainer from "~/components/HeaderContainer";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { getCompanyById } from "~/firebase/firestore/getData";
import { Feather } from "@expo/vector-icons";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;


function ContactScreen({ navigation }) {
  const [companydata, setCompanydata] = useState({});

  useEffect(() => {
      getCompanyById("VSdGBmehp16UYYXviAqc", (result) => {
        setCompanydata(result);
      });
  }, []);


  return (
    <HeaderContainer title={i18n.t('pinto')} back="Account" navigation={navigation}>
      <View style={{ ...globalStyles.e_layout, marginTop: 0 }}>
        <H2 style={styles.SubHeadingText}>
          <Ionicons name="home-outline" size={22} color={"#ACC63C"} /> {i18n.t('address')}
        </H2>
        <Text style={styles.description}>
          { companydata?.location?.number } { companydata?.location?.street }, { companydata?.location?.region }, Bangkok { companydata?.location?.postal_code }, Thailand
        </Text>

        <H2 style={styles.SubHeadingText}>
          <Ionicons name="call-outline" size={22} color={"#ACC63C"} /> {i18n.t('contact')}
        </H2>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", width: 100+"%", borderRadius: 7, paddingVertical: 5, marginBottom: 0, marginTop: 10 }}>
          <Feather name="phone-call" size={24} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 12, fontFamily: "JakartaRegular", marginLeft: 12 }}>{ companydata?.phone }</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", width: 100+"%", borderRadius: 7, paddingVertical: 5, marginBottom: 10 }}>
          <Feather name="send" size={24} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 12, fontFamily: "JakartaRegular", marginLeft: 12 }}>{ companydata?.mail }</Text>
        </View>
      </View>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(ContactScreen);
