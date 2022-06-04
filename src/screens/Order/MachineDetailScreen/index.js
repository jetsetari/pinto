import React, { useState, useEffect, useRef } from "react";
import { styles, CloseBtn, PriceSymbol, Price } from "./MachineDetailScreen-styles.js";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
//Redux
import { connect } from "react-redux";
import { addEmployeesOrder, addOrderesDishToAisle } from "~/firebase/firestore/saveData";
import CachedImage from "~/components/CachedImage";
import { formatDate } from "~/functions/formatDate.js";
import { getUser, getCartProductsOnce } from "~/firebase/firestore/getData.js";
import { updateWalletAmount } from "~/firebase/firestore/updateData.js";
import { deleteFromCart, deletePendingOrder } from "~/firebase/firestore/deleteData";


import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

let lang_i = i18n.locale == 'th' ? 0 : 1;

function MachineDetail(props) {
  const [loading, setLoading] = useState(false);
  const [itemOrdered, setItemOrdered] = useState(false);
  const [machineIndex, setMachineIndex] = useState(0);
  const [machineIsFull, setMachineIsFull] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [moneyCount, setMoneyCount] = useState(null);
  const [productsGroup, setProductsGroup] = useState([]);
  const [totalprice, setTotalprice] = useState(0);

  const buttonRef = useRef();

  const getCart = () => {
    let price = 0;
    let productsCountMap = new Map();
    getCartProductsOnce(props.company.selectedCompany.user_id, (result) => {
      result.forEach(function(el){
        if(productsCountMap.has(el["food_id"])){
          productsCountMap.get(el["food_id"]).count++;
        } else {
          productsCountMap.set(el["food_id"],Object.assign(el,{count:1}));
        }
      });
      let productsCount = [...productsCountMap.values()];
      productsCount = productsCount.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      setProductsGroup(productsCount);
      result.map(function(element, index) {
        price = price+parseFloat(element.price);
      });
      setTotalprice(price);
      setLoading(false);
    })
  };



  useEffect(() => {
    getCart();
    getUser(props.company.selectedCompany.user_id, (result) => {
      let _wallet = result.wallet ? result.wallet : 0;
      setWallet(_wallet);
    })

    if (props.route.params.dishes !== undefined) {
      let money = props.route.params.dishes.map(item => Number(item.price)).reduce((prev, next) => prev + next);
      setMoneyCount(money);
    }else if (props.route.params.dish !== undefined) {
      let money = props.route.params.dish.price;
      setMoneyCount(money);
    }
  }, [])


//  props.route.params.dishes.forEach((dish) =>{
//   deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish.id, () => {})
// })


  function payWallet() {
    setLoading(true);

    if (wallet >= moneyCount) {
      if (props.route.params.dishes !== undefined) {
        let lastItem = props.route.params.dishes.length - 1;
        props.route.params.dishes.forEach((dish, i) => {
          addOrderesDishToAisle(props.company.selectedCompany.individual_mode, props.company.selectedCompany.type, props.company.selectedCompany.company_id, [props.route.params.machine], formatDate(Date.parse(dish.date)), dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
            if (result === true) {
              setLoading(false);
              setMachineIndex(machine_index);
              updateWalletAmount(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, (Number(wallet) - Number(moneyCount)), (callback) => {
                setWallet(Number(wallet)-Number(moneyCount));
                deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish.id, () => {})
              })

              if(i === lastItem){
                setItemOrdered(true);
                //props.navigation.navigate("Orders", { date: formatDate(Date.parse(dish.date)), dishes: props.route.params.dishes, aisle: idx, machine: [props.route.params.machine], machine_index: machine_index, result: result });
              }
            } else {
              setMachineIsFull(true);
              if(i === lastItem){
                setItemOrdered(true);
                //props.navigation.navigate("Orders", { date: formatDate(Date.parse(dish.date)), dishes: props.route.params.dishes, aisle: idx, machine: [props.route.params.machine], machine_index: machine_index, result: result });
              }
            }
          });
        })
        
       } else {
          addOrderesDishToAisle(props.company.selectedCompany.individual_mode, props.company.selectedCompany.type, props.company.selectedCompany.company_id, [props.route.params.machine], formatDate(Date.parse(props.route.params.date)), props.route.params.dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
            if (result === true) {
              setLoading(false);
              setMachineIndex(machine_index);
              updateWalletAmount(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, (Number(wallet) - Number(moneyCount)), (callback) => {
                setWallet(Number(wallet)-Number(moneyCount));
              })
              setItemOrdered(true);
              //props.navigation.navigate("Orders", { dish: props.route.params.dish, aisle: idx, date: props.route.params.date, machine: [props.route.params.machine], machine_index: machine_index, result: result });
            } else {
              setMachineIsFull(true);
            }
          });
       }

    } else{
      setLoading(false);
      alert('Not enough in wallet');
    }
  }

  function chooseDish() {
    setLoading(true);
    
    if (props.route.params.dishes !== undefined) {
      let lastItem = props.route.params.dishes.length - 1;
      props.route.params.dishes.forEach((dish, i) => {
        addOrderesDishToAisle(props.company.selectedCompany.individual_mode, props.company.selectedCompany.type, props.company.selectedCompany.company_id, [props.route.params.machine], formatDate(Date.parse(dish.date)), dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
          if (result === true) {
            //setLoading(false);
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
      <SharedElement id={`item.${props.route.params.machine.id}.image_url`}>
        <CachedImage style={styles.image} source={{ uri: props.route.params.machine.picture }} resizeMode="cover" />
      </SharedElement>

      <Animatable.View ref={buttonRef} animation="fadeIn" duration={600} delay={300} style={[StyleSheet.absoluteFillObject]}>
        <CloseBtn>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={require("~/assets/images/back.png")} />
          </TouchableOpacity>
        </CloseBtn>
      </Animatable.View>

      <Content>
        <SafeAreaView style={globalStyles.container}>
          <View       >
            {/* {itemOrdered ? ( */}
            {itemOrdered ? (
              <Container style={{backgroundColor: "#123835", paddingBottom: 60 }}>
                <Content >
                  <View style={{ flex: 1, width: 100+'%',paddingTop: 0, paddingBottom: 60, alignItems: "center", }}>
                  { props.route.params.dishes ===  undefined &&
                    <Image style={(globalStyles.e_layout, styles.image)} source={{ uri: props.route.params.dish.picture, }} />
                  }
                    <View style={(globalStyles.e_layout)}>
                      <H1 style={styles.HeadingText}>{i18n.t('ordersucces')}</H1>
                      <H2 style={styles.SubHeadingText}>{i18n.t('address')}</H2>
                      <Text style={styles.descriptionname}>{props.route.params.machine.name}</Text>
                      <Text style={styles.description}>{props.route.params.machine.formatted_address}</Text>
                      <H2 style={styles.SubHeadingText}>{i18n.t('order')}</H2>
                      {
                        productsGroup !==  undefined ? (
                          productsGroup.map((dish, key)=> (
                            <>
                              <View key={key} style={ styles.item }>
                                <View style={ styles.itemcontent }>
                                  <CachedImage style={styles.listImage} source={{ uri: dish?.picture }} resizeMode="cover" />
                                  <View style={ styles.textWrap }>
                                    <Text style={ styles.productTitle }>{dish?.title.split(/–|-/, 2)[lang_i]}</Text>
                                    <Text style={ styles.productDate }>{dish?.date}</Text>
                                  </View>
                                  <View style={ styles.countWrap }>
                                    <Text style={ styles.productCount }>{dish?.count}</Text>
                                  </View>
                                </View>
                              </View>
                            </>
                          ))
                        ):(
                          <>
                            <Text style={styles.IngredientsText}>{i18n.t('dish')}: {props.route.params.dish.title}</Text>
                            <Text style={styles.IngredientsText}>{i18n.t('date')}: {formatDate(Date.parse(props.route.params.date))}</Text>
                          </>
                        )
                      }
                      <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, height: 60, paddingLeft: 20}]} onPress={() => props.navigation.navigate("PickUp")}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} source={require('./images/qr.png')}/>
                        <Text style={globalStyles.mainButtonText}>{i18n.t('pickupfood')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, height: 50, paddingLeft: 20, backgroundColor: '#1F504C'}]} onPress={() => props.navigation.navigate("Main")}>
                        <Text style={[globalStyles.mainButtonText, { color: '#6FA09D' }]}>{i18n.t('backhome')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Content>
              </Container>

              
            ) : machineIsFull ? (
              <View style={(globalStyles.e_layout)}>
                <H1 style={styles.productTitle}>{i18n.t('ordercantbeplaced')}</H1>
                <H2 style={styles.IngredientsText}>{i18n.t('ordercantbeplaced_txt')}</H2>
                <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, height: 50, paddingLeft: 20, backgroundColor: '#1F504C'}]} onPress={() => props.navigation.navigate("Main")}>
                  <Text style={[globalStyles.mainButtonText, { color: '#6FA09D' }]}>{i18n.t('backhome')}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={[globalStyles.e_layout, { paddingBottom: 40 }]}>
                  <SharedElement id={`item.${props.route.params.machine.id}.title`}>
                    <H1 style={styles.HeadingText}>{i18n.t('checkout')}</H1>
                  </SharedElement>
                  <H3 style={styles.SubHeadingText}>{i18n.t('address')}</H3>
                  <SharedElement id={`item.${props.route.params.machine.id}.address`}>
                    <Text style={styles.descriptionname}>{props.route.params.machine.name}</Text>
                  </SharedElement>
                  <Text style={styles.description}>{props.route.params.machine.formatted_address}</Text>

                  { !loading ? (
                    <>
                      <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 10, marginBottom: 10, width: '100%', backgroundColor: '#1F504C'}]} onPress={() => props.navigation.goBack() }>
                        <Text style={globalStyles.mainButtonText}>{i18n.t('changelocation')}</Text>
                      </TouchableOpacity>

                      {props.route.params.dish !== undefined ? (
                        <>
                          <H3 style={styles.SubHeadingText}>{i18n.t('dish')}</H3>
                          <Text style={styles.description}>{props.route.params.dish.title}</Text>
                        </>
                      ):(
                        <>
                          <H3 style={styles.SubHeadingText}>{i18n.t('order')}</H3>
                          {productsGroup.map((dish, key)=> (
                            <View key={key} style={ styles.item }>
                              <View style={ styles.itemcontent }>
                                <CachedImage style={styles.listImage} source={{ uri: dish?.picture }} resizeMode="cover" />
                                <View style={ styles.textWrap }>
                                  <Text style={ styles.productTitle }>{dish?.title.split(/–|-/, 2)[lang_i]}</Text>
                                  <Text style={ styles.productDate }>{dish?.date}</Text>
                                </View>
                                <View style={ styles.countWrap }>
                                  <Text style={ styles.productCount }>{dish?.count}</Text>
                                </View>
                              </View>
                            </View>
                          ))}
                          <View style={{ width: '100%', height: 1, backgroundColor: '#FFFFFF', marginTop: 20, marginBottom: 25 }}></View>
                          <View style={{ flexDirection: "row" }}>
                            <View><Price>{i18n.t('total')}</Price></View>
                            <View style={styles.price_inner_wrap}>
                              <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 5 }}>
                                <PriceSymbol />
                                <Price>{totalprice}</Price>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                       {props.route.params.dish !== undefined &&
                        <>
                          <H3 style={styles.SubHeadingText}>Date</H3>
                          <Text style={styles.description}>{formatDate(props.route.params.date)}</Text>
                        </>
                       }
                       <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, height: 60, paddingLeft: 20}]} onPress={() => (!loading ? chooseDish() : {})}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} source={require('./images/card.png')}/>
                        <Text style={globalStyles.mainButtonText}>{props.route.params.dishes !== undefined ? (i18n.t('paywithcard')) : (i18n.t('paywithcard'))}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 10, height: 60, backgroundColor: '#123835', borderWidth: 1, borderColor: '#438984' }]} onPress={() => (!loading ? payWallet() : {})}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} source={require('./images/wallet.png')}/>
                        <Text style={globalStyles.mainButtonText}>{props.route.params.dishes !== undefined ? (i18n.t('paydisheswithwallet')  + ' - '+ wallet+' THB') : (i18n.t('paydishwithwallet') + ' - '+wallet+' THB')}</Text>
                      </TouchableOpacity>
                      <Text style={ styles.walletnote }>{wallet} THB {i18n.t('wallet')} - {totalprice}THB =  {wallet-totalprice}THB</Text>
                    </>
                    ): <View style={{ marginTop: 50 }}><ActivityIndicator size={"small"} color="#fff" /></View> }
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
