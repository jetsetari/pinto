import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import HeaderContainer from "~/components/HeaderContainer";
import { globalStyles } from "~/assets/styles/styles.js";
import { getnotify, getUser } from "~/firebase/firestore/getData";
import DropDownSearch from "~/components/DropDownSearch";
import i18n from 'i18n-js';
i18n.locale = global.language;

let languages = { 'th' : 'Thai', 'en': 'English' };
let language = global.language;

function LanguageScreen({ navigation, company }) {
  const [latestNews, setLatestNews] = useState(false);
  const [orderPick, setOrderPick] = useState(true);
  const [notify, setnotify] = useState(false);
  const [language, setLanguage] = useState(global.language);
  const [languages, setLanguages] = useState([
      {label: 'Thai', value: 'th'},
      {label: 'English', value: 'en'}
    ]);

  useEffect(() => {
    setLanguages([
      {label: 'Thai', value: 'th'},
      {label: 'English', value: 'en'}
    ]);
    i18n.locale = language;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      i18n.locale = global.language;
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    global.language = language;
    i18n.locale = language;// == 'th') ? 'en' : 'th';
  }, [language]);

  const changeLanguage = (e) => {
    
  }

  return (
    <HeaderContainer back={"Account"} navigation={navigation} title="Language" >
      <View style={[globalStyles.e_layout, { marginTop: 20, height: 400 }]}>
        <DropDownSearch placeholder="Select a language" searchable={false} items={languages} value={language} setValue={ setLanguage } setItems={setLanguages} />
      </View>
    </HeaderContainer>
    );
  }

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});
  
  export default connect(mapStateToProps, null)(LanguageScreen);