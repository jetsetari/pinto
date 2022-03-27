import React, { useRef, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./Terms-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "../../globalStyles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function TermsScreen(props) {

  return (
    <ScrollHeaderContainer title="Terms & Conditions" backButton="Account" navigation={props.navigation}>
      <StatusBar hidden={false} style="light" />
      <Content>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#1E8C62" }} />
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.e_layout_container}>
            <View style={globalStyles.e_layout}>
              <View style={[globalStyles.e_layout, { marginTop: 60}]}>
                <Text style={globalStyles.h1}>Terms and conditions</Text>
              </View>
              <H2 style={styles.SubHeadingText}>Agreement to Terms</H2>
              <Text style={styles.description}>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and [business entity name] (“we,” “us” or “our”), concerning your access to and use of the [website name.com] website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). 
              </Text>

              <H2 style={styles.SubHeadingText}>Intellectual Property Rights</H2>
              <Text style={styles.description}>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions. 
              </Text>

            </View>
          </View>
        </SafeAreaView>
      </Content>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(TermsScreen);
