import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { styles, CloseBtn } from "./HelpDetail-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import HeaderContainer from "~/components/HeaderContainer";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function HelpDetailScreen(...props) {
  const item = props[0].route?.params?.item;
  const _props = props[0];

  return (
    <HeaderContainer title={item?.name ?? "Something went wrong"} back="Help" navigation={_props.navigation}>
      <StatusBar hidden={true} style="light" />
      <View style={[globalStyles.e_layout, { marginTop: 0, width: '100%', paddingHorizontal: 30 }]}>
        <Text style={styles.description}>{item?.description ?? "Please try again later."}</Text>
      </View>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(HelpDetailScreen);
