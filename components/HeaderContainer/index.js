//FoodList

import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, TouchableOpacity, SafeAreaView, Keyboard, Image } from "react-native";
import { Container, Header, Content, Body, Right, Button, Icon, Title } from "native-base";
import { styles } from "./HeaderContainer-styles";

function HeaderContainer(props) {
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
            <Title style={styles.headerText}>{props.title}</Title>
          </View>
        </Header>
        <View style={styles.e_layout_container}>{props.children}</View>
      </SafeAreaView>
    </Container>
  );
}

export default HeaderContainer;
