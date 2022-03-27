import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { styles, CloseBtn, Price, PriceSymbol, ShoppingCar } from "./FoodDetail-styles";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "../../globalStyles/styles.js";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { addEmployeesOrder, addOrderesDishToAisle, addProductToCart, removeOldProducts, addMultipleProducts } from "../../firebase/firestore/saveData";
import CachedImage from "../../components/CachedImage";
import { findPromo, getCartProducts, getCartProductsOnce } from "../../firebase/firestore/getData";

function FoodDetailScreen(props) {
  const [machineAisles, setMachineAisles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemOrdered, setItemOrdered] = useState(false);
  const [machineIndex, setMachineIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const [machineIsFull, setMachineIsFull] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [found_promo, set_found_promo] = useState(0);
  const buttonRef = useRef();
  const dish = props.route.params.dish;
  const [cart, setCart] = useState(0);
  const [cartcurrent, setCartcurrent] = useState(0);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function chooseDish() {
    if (props.company.selectedCompany.individual_mode) {
      const {price, ...rest} = dish
      rest.price = price - found_promo
      props.navigation.navigate("Map", { dish: rest, date: props.route.params.date });
    } else {
      setLoading(true);
      addOrderesDishToAisle(false, props.company.selectedCompany.type, props.company.selectedCompany.company_id, props.route.params.machine_id, formatDate(Date.parse(props.route.params.date)), dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
        if (result === true) {
          if (props.company.selectedCompany.type === "payment_by_user") {
            setLoading(false);
            setMachineIndex(machine_index);
            const {price, ...rest} = dish
            rest.price = price - found_promo
            props.navigation.navigate("Payment", { dish: rest, aisle: idx, date: props.route.params.date, machine: props.route.params.machine, machine_index: machine_index, result: result });
          } else {
            addEmployeesOrder(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish, idx, props.route.params.date, props.route.params.machine[machine_index].name, props.route.params.machine[machine_index].machine_id, props.route.params.machine[machine_index].id, () => {
              setLoading(false);
              setItemOrdered(true);
              setMachineIndex(machine_index);
            });
          }
        } else {
          setMachineIsFull(true);
        }
      });
    }
  }

  function setCartProducts() {
    getCartProductsOnce(props.company.selectedCompany.user_id, (result) => {
      let _date = formatDate(props.route.params.date);
      let _dish_id = dish.id;
      console.log(result, _dish_id);
      let _filter = result.filter(function (el){ return el.food_id == _dish_id && el.date <= _date });
      setCartcurrent(_filter);
      setCart(result.length);
    })
  }
  function clone(obj) {
      if(obj == null || typeof(obj) != 'object')
          return obj;    
      var temp = new obj.constructor(); 
      for(var key in obj)
          temp[key] = clone(obj[key]);    
      return temp;
  }

  function changeCartCurrent(product, type = 'plus'){
    let _cartcurrent = clone(cartcurrent);
    product.date = formatDate(props.route.params.date);
    product.food_id = props.route.params.dish.id;
    if(type == 'min'){
      _cartcurrent = _cartcurrent.slice(0, -1);
      setCartcurrent(_cartcurrent);
    } else {
      _cartcurrent.push(product);
      setCartcurrent(_cartcurrent);
    }
  }

  function addToCart() {
    if(cartcurrent == 0){
      alert('No products');
    } else {
      console.log(cartcurrent, props.route.params.date);
      removeOldProducts(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, cartcurrent[0].food_id, () => {
        addMultipleProducts(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, cartcurrent, () => {
          props.navigation.navigate('Home');
        })
      });
    }
    
    

    //props.navigation.navigate('Home');
    // addProductToCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, product, formatDate(Date.parse(props.route.params.date)), () => {
    //   setCartProducts();
    // })
  }

  useEffect(() => {
    setCartProducts();
  }, []);

  function getPromoCode() {
    setPromoLoading(true);
    if (promo.length > 0) {
      findPromo(props.company.selectedCompany.company_holder_id, promo, (result) => {
        setPromoLoading(false);
        if (result) {
          set_found_promo(result[0].price);
        }
      });
    }
  }

  return (
    <Container style={globalStyles.scrollView}>
    <StatusBar style="light" hidden={false} />
      { cart ? (
      <TouchableOpacity style={ styles.cart } onPress={() => props.navigation.navigate("Cart", { dish: dish }) }>
        <View style={styles.cartlogo}>
          <Feather name="shopping-cart" size={22} color="#000" />
        </View>
        <View style={ styles.cartvalue }><Text style={ styles.carttext }>{ cart }</Text></View>
      </TouchableOpacity> ) : <></> }

      <View style={styles.bannerWrapper}>
        <SharedElement id={`item.${dish.id}.image_url`}>
          <CachedImage style={styles.image} source={{ uri: dish.picture }} resizeMode="cover" />
        </SharedElement>

      </View>

      <Animatable.View ref={buttonRef} animation="fadeIn" duration={600} delay={300} style={[StyleSheet.absoluteFillObject]}>
        <CloseBtn>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
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
                  Machine: {props.route.params.machine[machineIndex].name} ({props.route.params.machine[machineIndex].machine_id})
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
                  <SharedElement id={`item.${dish.id}.title`}>
                    <H1 style={styles.HeadingText}>{dish.title}</H1>
                  </SharedElement>
                  {/*<Text style={styles.description}>{dish.description}</Text> */}
                  <H3 style={styles.SubHeadingText}>Ingredients</H3>
                  <Text style={styles.IngredientsText}>{dish.ingredients}</Text>

                  {props.company.selectedCompany.type === "payment_by_user" ? (
                    <>
                      <View style={styles.priceWrap}>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ width: '100%', flexDirection: "row", marginTop: 10}}>
                            <TextInput editable={!loading} textAlign={"center"} style={styles.promo} placeholder="Promo code" placeholderTextColor="#B0D0CE" returnKeyType="done" value={promo} onChangeText={(e) => setPromo(e)} />
                            <TouchableOpacity style={{ ...styles.getPromo }} onPress={() => getPromoCode()}>
                              {promoLoading ? <ActivityIndicator size="small" color="#fff" /> : <Feather name="chevrons-right" size={22} color="#fff" />}
                            </TouchableOpacity>
                          </View>
                          <View style={styles.price_inner_wrap}>
                            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 5 }}>
                              <PriceSymbol />
                              <Price>{dish.price - found_promo}</Price>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.priceWrap}>
                        {/*<TouchableOpacity style={styles.button} onPress={() => (!loading ? chooseDish() : {})}>
                          {loading ? (
                            <View>
                              <ActivityIndicator size="small" color="#fff" />
                            </View>
                          ) : (
                            <>
                              <ShoppingCar />
                              <Text style={styles.buttonText}>Buy item</Text>
                            </>
                          )}
                        </TouchableOpacity>*/}
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
                          <TouchableOpacity style={{ ...styles.editCart }} onPress={() => changeCartCurrent(dish, 'min')} >
                            <><Feather name="minus" size={18} color="#fff" /></>
                          </TouchableOpacity>
                          <View style={{ ...styles.cartAmount }}><Text style={{ ...styles.toCartText }}>{cartcurrent.length}</Text></View>
                          <TouchableOpacity style={{ ...styles.editCart }} onPress={() => changeCartCurrent(dish, 'plus')} >
                            <><Feather name="plus" size={18} color="#fff" /></>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.button} onPress={() => addToCart() }>
                        <ShoppingCar />
                        <Text style={styles.buttonText}>Add to cart</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity style={globalStyles.mainButton} onPress={() => (!loading ? chooseDish() : {})}>
                      {!loading ? <Text style={globalStyles.mainButtonText}>Select this dish</Text> : <ActivityIndicator size={"small"} color="#000" />}
                    </TouchableOpacity>
                  )}
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
  company: state.selectedCompany
});

FoodDetailScreen.sharedElements = (route) => {
  const { dish } = route.params;


  return [
    {
      id: `item.${dish.id}.image_url`,
      animation: "move",
      resize: "none"
    },
    {
      id: `item.${dish.id}.title`,
      animation: "fade",
      resize: "clip"
    }
  ];
};

export default connect(mapStateToProps, null)(FoodDetailScreen);
