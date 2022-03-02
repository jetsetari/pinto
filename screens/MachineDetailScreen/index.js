import React, { useState, useEffect, useRef } from "react";
import { styles, CloseBtn } from "./MachineDetailScreen-styles.js";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "../../globalStyles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { addEmployeesOrder, addOrderesDishToAisle } from "../../firebase/firestore/saveData";
import CachedImage from "../../components/CachedImage";
import { formatDate } from "../../functions/formatDate.js";

function MachineDetail(props) {
  const [loading, setLoading] = useState(false);
  const [itemOrdered, setItemOrdered] = useState(false);
  const [machineIndex, setMachineIndex] = useState(0);
  const [machineIsFull, setMachineIsFull] = useState(false);
  const buttonRef = useRef();
  useEffect(() => {
    
  },  [])


  function chooseDish() {
    setLoading(true);
    
    if (props.route.params.dishes !== undefined) {
      let lastItem = props.route.params.dishes.length - 1;
      props.route.params.dishes.forEach((dish, i) => {
        addOrderesDishToAisle(props.company.selectedCompany.individual_mode, props.company.selectedCompany.type, props.company.selectedCompany.company_id, [props.route.params.machine], formatDate(Date.parse(dish.date)), dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
          if (result === true) {
            setLoading(false);
            setMachineIndex(machine_index);
            if(i === lastItem){
              props.navigation.navigate("Payment", { date: formatDate(Date.parse(dish.date)), dishes: props.route.params.dishes, aisle: idx, machine: [props.route.params.machine], machine_index: machine_index, result: result });
            }
          } else {
            setMachineIsFull(true);
            if(i === lastItem){
              props.navigation.navigate("Payment", { date: formatDate(Date.parse(dish.date)), dishes: props.route.params.dishes, aisle: idx, machine: [props.route.params.machine], machine_index: machine_index, result: result });
            }
          }
        });
      })
      
     } else {
      addOrderesDishToAisle(props.company.selectedCompany.individual_mode, props.company.selectedCompany.type, props.company.selectedCompany.company_id, [props.route.params.machine], formatDate(Date.parse(props.route.params.date)), props.route.params.dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
        if (result === true) {
          setLoading(false);
          setMachineIndex(machine_index);
          props.navigation.navigate("Payment", { dish: props.route.params.dish, aisle: idx, date: props.route.params.date, machine: [props.route.params.machine], machine_index: machine_index, result: result });
        } else {
          setMachineIsFull(true);
        }
      });
     }
  }

  return (
    <Container style={globalStyles.scrollView}>
<StatusBar style="light" hidden={false} />
      <SharedElement id={`item.${props.route.params.machine.id}.image_url`}>
        <CachedImage style={styles.image} source={{ uri: props.route.params.machine.picture }} resizeMode="cover" />
        {/* <FastImage  source={{uri: props.route.params.machine.picture,  priority: FastImage.priority.high}} style={styles.image} resizeMode={FastImage.resizeMode.cover}></FastImage> */}
      </SharedElement>

      <Animatable.View ref={buttonRef} animation="fadeIn" duration={600} delay={300} style={[StyleSheet.absoluteFillObject]}>
        <CloseBtn>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={require("../../assets/images/back.png")} />
          </TouchableOpacity>
        </CloseBtn>
      </Animatable.View>

      <Content>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#1E8C62" }} />
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.e_layout_container}>
            {/* {itemOrdered ? ( */}
            {itemOrdered ? (
              <View style={(globalStyles.e_layout, styles.orderSuccess)}>
                <H1 style={styles.HeadingText}>Order placement succesfull.</H1>
                <H2 style={styles.SubHeadingText}>Your order:</H2>
                <Text style={styles.IngredientsText}>Dish: {dish.title}</Text>
                <Text style={styles.IngredientsText}>Date: {formatDate(Date.parse(props.route.params.date))}</Text>
                <Text style={styles.IngredientsText}>
                  Machine: {props.route.params.machine.name} ({props.route.params.machine.machine_id})
                </Text>
                </View>
            ) : machineIsFull ? (
              <View style={(globalStyles.e_layout, styles.orderSuccess)}>
                <H1 style={styles.HeadingText}>Order can't be placed.</H1>
                <H2 style={styles.SubHeadingText}>This dish can't be added becausse the machine is almost full. Try to add another dish or select another date.</H2>
              </View>
            ) : (
              <>
                <View style={globalStyles.e_layout}>
                  <SharedElement id={`item.${props.route.params.machine.id}.title`}>
                    <H1 style={styles.HeadingText}>{props.route.params.machine.name}</H1>
                  </SharedElement>
                  <H3 style={styles.SubHeadingText}>Address</H3>
                  <SharedElement id={`item.${props.route.params.machine.id}.address`}>
                    <Text style={styles.description}>{props.route.params.machine.formatted_address}</Text>
                  </SharedElement>

                  {props.route.params.dish !== undefined ? (
                    <>
                      <H3 style={styles.SubHeadingText}>Dish</H3>
                      <Text style={styles.description}>{props.route.params.dish.title}</Text>
                    </>
                  ):(
                    <>
                      <H3 style={styles.SubHeadingText}>Dishes</H3>
                      {props.route.params.dishes.map(dish => (
                        <>
                          <Text style={styles.description}>{dish.title}</Text>
                          <Text style={styles.description}>{formatDate(dish.date)}</Text>
                        </>
                      ))}
                    </>
                  )}
                   {props.route.params.dish !== undefined &&
                    <>
                      <H3 style={styles.SubHeadingText}>Date</H3>
                      <Text style={styles.description}>{formatDate(props.route.params.date)}</Text>
                    </>
                   }
                  <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20}]} onPress={() => (!loading ? chooseDish() : {})}>
                    {!loading ? <Text style={globalStyles.mainButtonText}>{props.route.params.dishes !== undefined ? ('Add dishes to machine') : ('Add dish to machine')}</Text> : <ActivityIndicator size={"small"} color="#000" />}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

MachineDetail.sharedElements = (route) => {
  const { machine } = route.params;

  return [
    {
      id: `item.${machine.id}.image_url`,
      animation: "move",
      resize: "clip",
    },
    {
      id: `item.${machine.id}.title`,
      animation: "fade",
      resize: "clip",
    },
    {
      id: `item.${machine.id}.address`,
      animation: "fade",
      resize: "clip",
    },
  ];
};

export default connect(mapStateToProps, null)(MachineDetail);
