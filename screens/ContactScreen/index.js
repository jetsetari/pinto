import React, { useRef, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./Contact-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "../../globalStyles/styles.js";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function ContactScreen({ navigation }) {
  return (
    <ScrollHeaderContainer title="Contact" backButton="Account" navigation={navigation}>
      <StatusBar style="light" hidden={false} />

      <View style={{ ...globalStyles.e_layout, marginTop: 0 }}>
        <H1 style={styles.HeadingText}>Pinto New Gen</H1>
        <H2 style={styles.SubHeadingText}>
          <Ionicons name="home-outline" size={22} color={"#ACC63C"} /> Address
        </H2>
        <Text style={styles.description}>
          17/26 moo15 Bangna-trad road Bangkaew{"\n"}
          Bangplee District {"\n"}
          Samut Prakan 10540
        </Text>

        <H2 style={styles.SubHeadingText}>
          <Ionicons name="call-outline" size={22} color={"#ACC63C"} /> Contact
        </H2>
        <Text style={styles.description}>
          0066855556556{"\n"}
          info@pintonewgen.com
        </Text>
      </View>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(ContactScreen);
