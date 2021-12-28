//FoodList

import React, { useEffect, useState, useRef } from "react";
import { RefreshControl, View, Animated, Text, SafeAreaView, Dimensions, Image, TouchableOpacity } from "react-native";
import { Container, Header, Content, Body, Right, Button, Icon, Title } from "native-base";
import { styles } from "./ScrollHeaderContainer-styles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
const { width, height } = Dimensions.get("window");

function ScrollHeaderContainer(props) {
  const insets = useSafeAreaInsets();

  const [showLargeTitles, setShowLargeTitles] = useState(true);
  const scale = useRef(new Animated.Value(0)).current;
  const translate_y = useRef(new Animated.Value(0)).current;
  const translate_x = useRef(new Animated.Value(0)).current;
  function handleScroll(event) {
    if (event.nativeEvent.contentOffset.y > 30) {
      setShowLargeTitles(false);
    }
    if (event.nativeEvent.contentOffset.y <= 30) {
      setShowLargeTitles(true);
    }
  }

  useEffect(() => {
    if (!showLargeTitles) {
      Animated.timing(scale, {
        toValue: 0.4,
        duration: 500,
        useNativeDriver: false
      }).start();
      Animated.timing(translate_y, {
        toValue: -140,
        duration: 500,
        useNativeDriver: false
      }).start();
      Animated.timing(translate_x, {
        toValue: 70,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
      Animated.timing(translate_y, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start();
      Animated.timing(translate_x, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start();
    }
  }, [showLargeTitles]);

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      if (!showLargeTitles) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }).start();
      }
    }, [fadeAnim, scale]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

  return (
    <Container style={{ ...styles.scrollView, paddingTop: insets.top }}>
      <StatusBar style="light" hidden={false} />
      <Animated.Image
        source={require("../../assets/images/logo.png")}
        style={[
          styles.headerImage,
          {
            top: 30 + insets.top,
            transform: [
              {
                scale: scale
              },
              { translateY: translate_y },
              { translateX: translate_x }
            ]
          }
        ]}
      />
      {!showLargeTitles ? (
        <Header style={styles.smallTitles} hasTabs>
          <View style={styles.e_layout_small_title}>
            <Button style={{ position: "absolute", left: 0, ...styles.backButton }} onPress={() => (props.backButton ? props.navigation.goBack() : {})}>
              <Image style={props.backButton ? { width: 35, height: 35 } : styles.backButtonHidden} source={require("../../assets/images/back.png")} />
            </Button>
            <FadeInView>
              <Title style={styles.smallTitlesText}>{props.title}</Title>
            </FadeInView>

          </View>
        </Header>
      ) : (
        <>
          <Header style={styles.hidden_title}>
            <View style={styles.e_layout_small_title}>
              <Title style={styles.smallTitlesText}></Title>
            </View>
            <Button style={{ position: "absolute", left: 0, ...styles.backButton }} onPress={() => (props.backButton ? props.navigation.goBack() : {})}>
                <Image style={props.backButton ? { width: 35, height: 35 } : styles.backButtonHidden} source={require("../../assets/images/back.png")} />
              </Button>
          </Header>
        </>
      )}
      <Content
        onScroll={(e) => handleScroll(e)}
        refreshControl={
          props.refreshEnabled && (
            <RefreshControl
              onRefresh={() => props.onRefresh()}
              refreshing={props.refreshing}
              colors={["#fff"]} //android
              tintColor="#fff" //ios
            />
          )
        }
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: "#1E8C62" }} />
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={() => (props.backButton ? props.navigation.goBack() : {})}>
            <Header style={styles.header}>
              <View style={styles.e_layout_large_title}>
                {/* <Ionicons style={props.backButton ? styles.backIcon : styles.backButtonHidden} name="chevron-back" size={30} color="#ffffff" /> */}
                <Title style={styles.headerText}>{props.title}</Title>
                <Image style={{ width: width, height: 20}} source={require("../../assets/line.png")} />
              </View>
            </Header>

          </TouchableOpacity>
          <View style={styles.e_layout_container}>{props.children}</View>
        </SafeAreaView>
      </Content>
    </Container>
  );
}

export default ScrollHeaderContainer;
