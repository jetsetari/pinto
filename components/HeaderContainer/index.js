//FoodList

import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, TouchableOpacity, SafeAreaView, Keyboard, Image } from "react-native";
import { Container, Header, Content, Body, Right, Button, Icon, Title } from "native-base";
import { styles } from "./HeaderContainer-styles";

function HeaderContainer(props) {
  console.log(props.back);
  let back = (props.back) ? props.back : false;
  return (
    <Container style={styles.scrollView}>
      <Header style={styles.hidden_title}>
        <View style={styles.e_layout_small_title}>
          <Title style={styles.smallTitlesText}></Title>
        </View>
      </Header>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#1E8C62" }} />
      <SafeAreaView style={styles.container}>
        <Header style={styles.header}>
          <View style={styles.e_layout_large_title}>
            {/*<TouchableOpacity  onPress={() => navigation.navigate("Company")}>
            { back &&
              <Image style={{ width: 49, height: 49, marginTop: 0, marginRight: 20 } } source={require("../../assets/images/btn-back.png")} />
            }
            </TouchableOpacity>*/}
            <Title style={styles.headerText}>{props.title}</Title>
          </View>
        </Header>
        <View style={styles.e_layout_container}>{props.children}</View>
      </SafeAreaView>
    </Container>
  );
}

export default HeaderContainer;
