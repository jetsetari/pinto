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
import TagScreen from "./TagScreen";

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
    <ScrollHeaderContainer title={showQuestions === false ? "Help" : showQuestions[1]} backButton={() => showQuestions === false ? setShowQuestions(false) : {}} navigation={navigation}>
      <StatusBar hidden={false} style="light" />
      <Content>
        {showQuestions === false ? (
          <View style={globalStyles.e_layout_container}>
            <View style={globalStyles.e_layout}>
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
            </View>
          </View>
        ):(
          <TagScreen tag={showQuestions[1]} navigation={navigation} questions={questions} />
        )}
      </Content>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(HelpScreen);
