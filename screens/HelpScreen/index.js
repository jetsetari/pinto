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

function HelpScreen({ navigation, company, ...props }) {
  const [questions, setquestions] = useState(false);

  useEffect(() => {
    if(company?.selectedCompany?.company_holder_id){
      getHelp(company.selectedCompany.company_holder_id, (data) => {
        setquestions(data);
      });
    }
  }, []);

  function _nav(item) {
    let { created, ...rest } = item;
    // navigation.push(
    //   "Help",
    //   { item: rest },
    //   NavigationActions.navigate({ routeName: "HelpDetail" })
    // );

    navigation.push("HelpDetail",{ item: item } )
  }

  return (
    <ScrollHeaderContainer title="Help" backButton="Account" navigation={navigation}>
      <StatusBar hidden={false} style="light" />
      <Content>

          <View style={globalStyles.e_layout_container}>
            <View style={globalStyles.e_layout}>
              {questions &&
                questions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.accountlistitemFirst}
                    onPress={() => {
                      _nav(item);
                    }}
                  >
                    <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
                      <Text style={globalStyles.mainButtonText}>{item.name}</Text>
                      <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
      </Content>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(HelpScreen);
