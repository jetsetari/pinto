import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { styles, CloseBtn } from "./Home-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "../../globalStyles/styles.js";
import { StatusBar } from "expo-status-bar";
import { getArticles, getCompanyById, getWallet, getUser } from "../../firebase/firestore/getData";
import { NavigationActions } from "react-navigation";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import NewsCard from "../../components/NewsCard";
import Carousel from "react-native-snap-carousel";
import * as Haptics from "expo-haptics";

// import i18n from 'i18n-js';
// import translate from '../../assets/locales/';

// //I18N
// i18n.translations = {
//   en: translate.en, th: translate.th
// };
// i18n.locale = Localization.locale;
// i18n.fallbacks = true;

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
    getArticles("UTcBQoWhOZuwJG6YzS9D", (result) => {
      setNews(result);
    });
    getCompanyById(company.selectedCompany.company_id, (result) => {
      console.log(result);
      setBanner(result.banner);
    });
  }, []);

  useEffect(() => {
    getUser(company.selectedCompany.user_id, (result) => {
      setWallet(result.wallet);
    })
  }, [wallet])

  return (
     <ScrollHeaderContainer backButton={"Home"} navigation={navigation} title="Notifications" style={{ paddingBottom: 0 }}>
      <StatusBar style="light"  hidden={false} />
      <ImageBackground source={require("../../assets/images/bow.png")} resizeMode="cover" style={{ width: '100%', flex: 1, height: 130 }}>
        <Image style={{ width: 100, height: 95, marginTop: 65, marginLeft: 'auto', marginRight: 20 } } source={require("../../assets/images/logo.png")} />
      </ImageBackground>
        
      <View style={[globalStyles.e_layout, { marginTop: 0 }]}>
        <Text style={ styles.HeadingText }>Shortcuts</Text>
        <View style={{ width: '100%', flexDirection: 'row', flex: 1,  }}>
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("PickUp")}>
            <Image style={{ width: 75, height: 81 } } source={require("../../assets/images/pickup.png")} />
            <Text style={ styles.iconText }>Pick up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("Home")}>
            <Image style={{ width: 75, height: 81 } } source={require("../../assets/images/order.png")} />
            <Text style={ styles.iconText }>Order Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("Wallet")}>
            <Image style={{ width: 75, height: 81 } } source={require("../../assets/images/wallet.png")} />
            <Text style={ styles.iconText }>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.icon } onPress={() => navigation.navigate("Account")}>
            <Image style={{ width: 75, height: 81 } } source={require("../../assets/images/account.png")} />
            <Text style={ styles.iconText }>Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', height: 110, backgroundColor: '#122E2B', flexDirection: 'row', marginTop: 40, borderRadius: 8, padding: 20 }}>
          <View style={{ width: '100%', flex: 1 }}>
            <Text style={[styles.HeadingText, { paddingTop: 3, paddingBottom: 0, marginBottom: 0}]}>Pickup Food</Text>
            <Text style={[styles.NormalText, { paddingTop: 0}]}>At your local vending machine</Text>
          </View>
          <Image style={{ width: 100, height: 140, marginTop: -35, marginLeft: 'auto', marginRight: 0 } } source={require("../../assets/images/vendingmachine.png")} />
        </View>

        <Text style={ styles.HeadingText }>Latest News</Text>
        
      </View>
      <ImageBackground source={require("../../assets/images/bow-reverse.png")} resizeMode="cover" style={{ width: '100%', flex: 1, height: 180, marginTop: 0 }}>
        <View style={{ paddingLeft: 30 }}>
          {news && (
              <Carousel
                ref={carousel_news}
                data={news}
                onSnapToItem={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                sliderWidth={width}
                activeSlideAlignment="start"
                itemWidth={330}
                renderItem={({ item, index }) => {
                  return <NewsCard article={item} idx={index} onPress={(e) => console.log(item)} />;
                }}
              />
            )}
        </View>
      </ImageBackground>
      <View style={{ flex: 1, width: '100%', backgroundColor: '#0E2523', height: 400, paddingHorizontal: 30 }}>
        {banner && (
          <>
          <View style={styles.label}><Text style={ styles.labelText }>Promotion</Text></View>
          <Image style={styles.bannerImage} source={{uri: banner }}/>
          </>
        )}
        <View style={{width: '100%',marginBottom: 0, marginTop: 30}}>
          <View style={{ width: '100%', ...globalStyles.mainLineWhiteButton}} onPress={() => navigation.navigate("Wallet") }>
            <View style={styles.icon}>
              <Ionicons name="card-outline" size={40} color={"#ffffff"} />
            </View>
            <Text style={[globalStyles.mainButtonText, styles.btnText, { marginLeft: 0, lineHeight: 35}]}> Wallet {"\n"}<Text style={{ fontSize: 30, fontFamily: "TitilliumLight" }}>{ wallet } bth</Text></Text>
            <View style={{marginLeft: 'auto', marginRight: 20, width: 100, ...globalStyles.mainLineButton}}>
              <Text style={globalStyles.mainLineButtonText}>Add credit</Text>
            </View>
          </View>
        </View>
      </View>
      

    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(HomeScreen);
