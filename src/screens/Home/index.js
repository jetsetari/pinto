import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { styles, CloseBtn } from "./Home-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import { StatusBar } from "expo-status-bar";
import { getArticles, getCompanyById, getWallet, getUser } from "~/firebase/firestore/getData";
import { NavigationActions } from "react-navigation";
import ScrollHeaderContainer from "~/components/ScrollHeaderContainer";
import NewsCard from "~/components/NewsCard";
import Wallet from "~/components/Wallet";
import Carousel from "react-native-snap-carousel";
import * as Haptics from "expo-haptics";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

//Redux
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen({ navigation, company, ...props }) {
  const [news, setNews] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [banner, setBanner] = useState(false);
  const carousel_news = useRef(null);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    getArticles("VSdGBmehp16UYYXviAqc", (result) => {
      setNews(result);
    });
    getCompanyById(company.selectedCompany.company_id, (result) => {
      setBanner(result.banner);
    });
  }, []);

  const [translation, setTranslation] = useState(i18n);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      i18n.locale = global.language;
      setTranslation(global.language);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUser(company.selectedCompany.user_id, (result) => {
      let _wallet = result.wallet ? result.wallet : 0;
      setWallet(_wallet);
    })
  }, [wallet])

  return (
     <ScrollHeaderContainer backButton={"Home"} navigation={navigation} title="Home" style={{ paddingBottom: 0 }}>
      <ImageBackground source={require("~/assets/images/bow.png")} resizeMode="cover" style={{ width: '100%', flex: 1, height: 130 }}>
        <Image style={{ width: 100, height: 95, marginTop: 65, marginLeft: 'auto', marginRight: 20 } } source={require("~/assets/images/logo.png")} />
      </ImageBackground>
      <View style={[globalStyles.e_layout, { marginTop: 0 }]}>
        <Text style={ styles.HeadingText }>{i18n.t('shortcuts')}</Text>
        <View style={{ width: '100%', flexDirection: 'row', flex: 1,  }}>
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("Home")}>
            <Image style={{ width: 75, height: 81 } } source={require("~/assets/images/order.png")} />
            <Text style={ styles.iconText }>{i18n.t('order')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("PickUp")}>
            <Image style={{ width: 75, height: 81 } } source={require("~/assets/images/pickup.png")} />
            <Text adjustsFontSizeToFit style={ styles.iconText }>{i18n.t('pickup')}</Text>
          </TouchableOpacity>
          
          {/*
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("Wallet")}>
            <Image style={{ width: 75, height: 81 } } source={require("~/assets/images/wallet.png")} />
            <Text style={ styles.iconText }>{i18n.t('wallet')}</Text>
          </TouchableOpacity>*/}
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("Account")}>
            <Image style={{ width: 75, height: 81 } } source={require("~/assets/images/account.png")} />
            <Text style={ styles.iconText }>{i18n.t('account')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("PickUp")}>
          <View style={{ width: '100%', height: 110, backgroundColor: '#122E2B', flexDirection: 'row', marginTop: 40, borderRadius: 8, padding: 20 }}>
            <View style={{ width: '100%', flex: 1 }}>
              <Text style={[styles.HeadingText, { paddingTop: 0, paddingBottom: 0, marginBottom: 0}]}>{i18n.t('pickupfood')}</Text>
              <Text style={[styles.NormalText, { paddingTop: 0}]}>{i18n.t('pickup_txt')}</Text>
            </View>
            <Image style={{ width: 100, height: 140, marginTop: -35, marginLeft: 'auto', marginRight: 0 } } source={require("~/assets/images/vendingmachine.png")} />
          </View>
        </TouchableOpacity>
        <Text style={ styles.HeadingText }>{i18n.t('latestnews')}</Text>
      </View>
      <ImageBackground source={require("~/assets/images/bow-reverse.png")} resizeMode="cover" style={{ width: '100%', flex: 1, height: 165, marginTop: 0 }}>
        <View style={{ paddingLeft: 20 }}>
          {news && (
              <Carousel
                ref={carousel_news}
                data={news}
                onSnapToItem={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                sliderWidth={width}
                activeSlideAlignment="start"
                itemWidth={330}
                renderItem={({ item, index }) => {
                  return <NewsCard article={item} idx={index} language={translation} onPress={(e) => console.log(item)} />;
                }}
              />
            )}
        </View>
      </ImageBackground>
      <View style={{ flex: 1, width: '100%', backgroundColor: '#0E2523',paddingBottom: 50, paddingHorizontal: 20 }}>
        {banner && (
          <>
          <View style={styles.label}><Text style={ styles.labelText }>{i18n.t('promotion')}</Text></View>
          <Image style={styles.bannerImage} source={{uri: banner }}/>
          </>
        )}
        <Wallet wallet={100} />
      </View>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(HomeScreen);
