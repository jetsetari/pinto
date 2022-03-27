import React, { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, SafeAreaView, Dimensions, ScrollView, Image } from "react-native";
import { styles } from "./Food-styles";
import { Container, Header, Left, Content, TabHeading, ScrollableTab, Title, Tab, Tabs } from "native-base";
import { globalStyles } from "../../globalStyles";
import FoodList from "../../components/FoodList";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { getDateDishes, getMachines, getCompanyById, getCartProducts } from "../../firebase/firestore/getData";
import { StatusBar } from "expo-status-bar";
import CachedImage from "../../components/CachedImage";
import Loading from "../../components/Loading";

//Redux
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

function FoodScreen({ navigation, company }) {

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  var _date_array = [];
  const [currentTab, setCurrentTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const [dishes, setDishes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [machineId, setMachineId] = useState("");
  const [machine, setMachine] = useState("");
  const [banner, setBanner] = useState("");
  const [cart, setCart] = useState(false);
  const [cartprice, setCartprice] = useState(false);
  const [promo, setPromo] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDishes();
    company.selectedCompany.company_id !== undefined &&
      getCartProducts(company.selectedCompany.user_id, (result) => {
        console.log(result);
        
        if(result.length > 0){
          let price = 0;
          result.map(function(element, index) {
            price = price+parseFloat(element.price);
          });
          setCartprice(price);
          setCart(result.length);
        }
        
      })
  }, []);

  useEffect(() => {
    company.selectedCompany.company_id !== undefined &&
      getMachines(company.selectedCompany.company_id, (result) => {
        setMachineId(result);
        setMachine(result);
      });
  }, [company.selectedCompany]);

  useEffect(() => {
    company.selectedCompany.company_id !== undefined &&
      getCompanyById(company.selectedCompany.company_id, (result) => {
        setBanner(result.banner);
        console.log(result.promo);
        setPromo(result.promo);
      });
  }, [company.selectedCompany]);

  

  function getDishes() {
    company.selectedCompany.company_id !== undefined &&
      getMachines(company.selectedCompany.company_id, (result) => {
        setMachineId(result);
        setMachine(result);
      });

    let days = [0, 1, 2, 3, 4, 5];
    let _next_days_dishes = [];
    iteration(days, 0, _next_days_dishes);
  }

  function iteration(keys, index, _next_days_dishes) {
    let _next_day = nextDay(keys[index]);
    getDateDishes(formatDate(_next_day).toString(), (result) => {
      _next_days_dishes.push({
        dishes: result,
        date: _next_day.getDate() + " " + months[_next_day.getMonth()] + " " + _next_day.getFullYear(),
        weekDay: weekDays[_next_day.getDay()],
        fullDate: _next_day
      });

      next();
    });

    function next() {
      ++index;
      if (index < keys.length) {
        iteration(keys, index, _next_days_dishes);
      } else {
        setLoading(false);
        setRefreshing(false);
        setDishes(_next_days_dishes);
      }
    }
  }
  // function nextDay(x) {
  //   var now = new Date();
  //   let _next_day = now.getDay() + x
  //   now.setDate(now.getDate() + ((_next_day + (5 - now.getDay())) % 5));
  //   return now;
  // }

  function nextDay(x) {
    var now = new Date();
    let _next_day = now.getDay() + x;
    now.setDate(now.getDate() + ((_next_day + (7 - now.getDay())) % 7));
    return now;
  }

  const onDetailNavigationPress = (dish, fullDate) => {
    navigation.navigate("Details", { dish: dish, date: fullDate.toString(), machine_id: machineId, machine: machine });
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function onRefresh() {
    setRefreshing(true);
    getDishes();
  }

  let _link = banner;

  return (
    <>
      <StatusBar style="light" hidden={true} />
      { promo ? (
        <Modal
            animationType="slide"
            transparent={true}
            visible={promoVisible}
            onRequestClose={() => {
              setPromoVisible(!promoVisible);
            }}
          >
            <View style={ styles.modalPromo }>
              <TouchableOpacity style={styles.modalPromoView} onPress={() => setPromoVisible(false)}>
                <Feather name="x" size={20} color="#000" />
              </TouchableOpacity>
              <Image style={styles.modalPromoImage} source={{uri: promo }}/>
              <Loading />
            </View>
        </Modal>
      ): <></>}
      <ScrollHeaderContainer headerVisible={false} title="Meals" refreshEnabled={true} onRefresh={() => onRefresh()} refreshing={refreshing}>
        <ScrollView style={{ height: height-(cart ? 100 : 0) }}>
          <View style={{ position: 'absolute', left: 20, top: 20 }}>
            <TouchableOpacity  onPress={() => navigation.navigate("Main")}>
              <Image style={{ width: 49, height: 49, marginTop: 0, marginRight: 20 } } source={require("../../assets/images/btn-back.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', marginTop: 120 }}></View>
          { cart ? (
          <TouchableOpacity style={ styles.cart } onPress={() => navigation.navigate("Cart") }>
            <View style={styles.cartlogo}>
              <Feather name="shopping-cart" size={22} color="#000" />
            </View>
            <View style={ styles.cartvalue }><Text style={ styles.carttext }>{ cart }</Text></View>
          </TouchableOpacity> ) : <></> }
          {/*
          <View style={styles.bannerWrapper}>
            <Image style={styles.bannerImage} source={{uri: _link }}/>
            <Image style={styles.arcImage} source={require("../../assets/images/arc.png")}/>
          </View>*/}
          
          {dishes ? (
            <Tabs renderTabBar={() => <ScrollableTab style={styles.ScrollableTab} tabsContainerStyle={styles.tabsContainerStyle} />} style={styles.TabBarStyle} underlineStyle={styles.underlineStyle} tabBarUnderlineStyle={styles.tabBarUnderlineStyle} tabContainerStyle={styles.tabContainerStyle} onChangeTab={({ i }) => setCurrentTab(i)}>
              {dishes.map((item, idx) => (
               
                <Tab
                  key={idx}
                  heading={
                    <TabHeading style={styles.TabHeadingContainer}>
                      <Text style={currentTab === idx ? styles.ActiveTabHeading : styles.TabHeading}>{item.weekDay}</Text>
                      <Text style={currentTab === idx ? styles.ActiveTabSubHeading : styles.TabSubHeading}>{item.date}</Text>
                    </TabHeading>
                  }
                  style={styles.backgroundTabBar}
                  tabStyle={styles.tabStyle}
                  textStyle={styles.textStyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTextStyle={styles.activeTextStyle}
                >
                  <FoodList dishes={loading ? "loading" : item.dishes} onDetailNavigationPress={(dish) => onDetailNavigationPress(dish, item.fullDate)} />
                </Tab>
              ))}
            </Tabs>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={"small"} color="#fff" />
            </View>
          )}
        </ScrollView>
        { cart && (
        <View style={{ width: '100%', height: 100, paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Cart") }>
            <Text style={[styles.buttonText, {marginRight: 'auto'}]}>Cart - { cart } items</Text>
            <Text style={styles.buttonText}>{cartprice} THB</Text>
          </TouchableOpacity>
        </View>) }
      </ScrollHeaderContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(FoodScreen);
