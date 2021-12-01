import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./Help-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "../../globalStyles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import { getHelp } from "../../firebase/firestore/getData";
import { NavigationActions } from "react-navigation";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function TagScreen({ tag, questions, navigation, company, ...props }) {
  const [showQuestions, setShowQuestions] = useState(false);
  useEffect(() => {
    getLinks();

  }, [tag]);

  function _nav(item) {
    let { created, ...rest } = item;
    // navigation.push(
    //   "Help",
    //   { item: rest },
    //   NavigationActions.navigate({ routeName: "HelpDetail" })
    // );

    navigation.push("HelpDetail",{ item: item } )
  }

  function getLinks() {
    setShowQuestions(questions?.filter(question =>{
      return question?.tags?.some(questionTag => questionTag === tag)
    }))
  }

  return (
      <Content>

          <View style={globalStyles.e_layout_container}>
            <View style={globalStyles.e_layout}>
              {showQuestions ? (
                showQuestions.map((question, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.accountlistitemFirst}
                    onPress={() => {
                      _nav(question);
                    }}
                  >
                    <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
                      <Text style={globalStyles.mainButtonText}>{question.name}</Text>
                      <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
                    </View>
                  </TouchableOpacity>
                ))                    
              ):(
                <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
                  <Text style={globalStyles.mainButtonText}>No items in this section</Text>
                </View>
              )}
            </View>
          </View>
      </Content>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(TagScreen);
