import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./Help-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import { getHelp } from "~/firebase/firestore/getData";
import { NavigationActions } from "react-navigation";
import HeaderContainer from "~/components/HeaderContainer";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import TagScreen from "./TagScreen";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;



function HelpScreen({ navigation, company, ...props }) {
  const [questions, setquestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    if(company?.selectedCompany?.company_holder_id){
      getHelp(company.selectedCompany.company_holder_id, (data) => {
        setquestions(data);
        getTags(data);
      });
    }


  }, []);

  function getTags(data) {
    let _tags = []
    data.forEach(question => {
      if(question.tags){
        question.tags.forEach(tag => {
          _tags.indexOf(tag) === -1 &&  _tags.push(tag);
        })}
      });
    setTags(_tags);
  }



  return (
     <HeaderContainer back={"Account"} navigation={navigation} title={i18n.t('help')}>
      <View style={[globalStyles.e_layout, { marginTop: 10 }]}>
        <View style={{ width: '100%' }}>
          {showQuestions === false ? (
            <>
                {tags &&
                  tags.map((tag, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.accountlistitemFirst}
                      onPress={() => {
                        setShowQuestions([true, tag]);
                      }}
                    >
                      <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
                        <Text style={globalStyles.mainButtonText}>{tag}</Text>
                        <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
                      </View>
                    </TouchableOpacity>
                  ))}
            </>
          ):(
            <TagScreen tag={showQuestions[1]} navigation={navigation} questions={questions} />
          )}
        </View>
      </View>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(HelpScreen);
