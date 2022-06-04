//FoodList

import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, TouchableOpacity, SafeAreaView, Keyboard, Image, ScrollView } from "react-native";
import { Container, Header, Content, Body, Right, Button, Icon, Title } from "native-base";
import { styles } from "./HeaderContainer-styles";

function HeaderContainer(props) {
  let back = (props.back) ? props.back : false;
  let disableScroll = (props.disableScroll) ? props.disableScroll : false;
  console.log(disableScroll);
  
  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header}>
        <View style={styles.e_layout_large_title}>
          <TouchableOpacity  onPress={() => props.navigation.navigate(props.back)}>
          { back &&
            <Image style={{ width: 39, height: 39, marginTop: 0, marginRight: 15 } } source={require("~/assets/images/btn-back.png")} />
          }
          </TouchableOpacity>
          <Title style={[styles.headerText, {fontSize: 22}]}>{props.title}</Title>
        </View>
      </Header>
      { disableScroll ? (
        <View>
          <View style={styles.e_layout_container}>{props.children}</View>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.e_layout_container}>{props.children}</View>
        </ScrollView>
      ) }
      
    </SafeAreaView>
  );
}

export default HeaderContainer;
