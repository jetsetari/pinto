import React, { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { styles } from "./Food-styles";
import { Container, Header, Left, Content, TabHeading, ScrollableTab, Title, Tab, Tabs } from "native-base";
import { globalStyles } from "../../globalStyles";
import FoodList from "../../components/FoodList";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { getDateDishes, getMachines } from "../../firebase/firestore/getData";
import { StatusBar } from "expo-status-bar";
//Redux
import { connect } from "react-redux";

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

  useEffect(() => {
    setLoading(true);
    getDishes();
  }, []);

  useEffect(() => {
    company.selectedCompany.company_id !== undefined &&
      getMachines(company.selectedCompany.company_id, (result) => {
        setMachineId(result);
        setMachine(result);
      });
  }, [company.selectedCompany]);

  function getDishes() {
    company.selectedCompany.company_id !== undefined &&
      getMachines(company.selectedCompany.company_id, (result) => {
        setMachineId(result);
        setMachine(result);
      });

    let days = [1, 2, 3, 4, 5];
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
    // if (now.getDay() === 0) {
    //   now.setDate(now.getDate() + 1);
    // }
    // else if (now.getDay() === 6) {
    //   now.setDate(now.getDate() + 2);
    // }
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

  return (
    <ScrollHeaderContainer title="Meals" refreshEnabled={true} onRefresh={() => onRefresh()} refreshing={refreshing}>
    <StatusBar style="light" hidden="false" />
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
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});

export default connect(mapStateToProps, null)(FoodScreen);
