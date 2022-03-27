import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Button, ActivityIndicator, Image } from "react-native";
import { Content } from "native-base";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
//Redux
import { connect } from "react-redux";
import { getCartProductsOnce, getUser } from "../../firebase/firestore/getData";
import { deleteFromCart } from "../../firebase/firestore/deleteData";
import { View } from "react-native-animatable";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { globalStyles } from "../../globalStyles/styles.js";
import { styles, CloseBtn, PriceSymbol, Price } from "./Cart-styles.js";
import { addProductToCart } from "../../firebase/firestore/saveData";
import Loading from "../../components/Loading";

import CachedImage from "../../components/CachedImage";
import { SharedElement } from 'react-navigation-shared-element';


function CartScreen(props) {
  const [products, setProducts] = useState([]);
  const [productsGroup, setProductsGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  const [promo, setPromo] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [found_promo, set_found_promo] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [totalprice, setTotalprice] = useState(0);

  const getCart = () => {
    let price = 0;
    let productsCountMap = new Map();
    getCartProductsOnce(props.company.selectedCompany.user_id, (result) => {
      setProducts(result);
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
  }, []);

  const onRefresh = ()  => {
    setLoading(true);
    setRefreshing(true);
    getCart();
  }

  const deleteItem = (product_id) => {
    setLoading(true);
    deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, product_id, () => {
      getCart();
    })
  }

  const addToCart = (productFull) => {
    setLoading(true);
    let product = {
      deleted: false,
      description: productFull.description,
      id: productFull.food_id,
      ingredients: productFull.ingredients,
      picture: productFull.picture,
      price: productFull.price,
      title: productFull.title,
    };
    addProductToCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, product, productFull.date, () => {
      getCart();
    });
  }

  const getPromoCode = () =>  {
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

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const chooseDishes = (dishes) => {
    if (props.company.selectedCompany.individual_mode) {
      // rest.price = price - found_promo
      props.navigation.navigate("Map", { dishes: dishes });
    } else {
      setLoading(true);
      addOrderesDishToAisle(false, props.company.selectedCompany.type, props.company.selectedCompany.company_id, props.route.params.machine_id, formatDate(Date.parse(dish.date)), dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
        if (result === true) {
          if (props.company.selectedCompany.type === "payment_by_user") {
            setLoading(false);
            setMachineIndex(machine_index);
            const {price, ...rest} = dish
            rest.price = price - found_promo
            props.navigation.navigate("Payment", { dish: rest, aisle: idx, date: dish.date, machine: props.route.params.machine, machine_index: machine_index, result: result });
          } else {
            addEmployeesOrder(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish, idx, dish.date, props.route.params.machine[machine_index].name, props.route.params.machine[machine_index].machine_id, props.route.params.machine[machine_index].id, () => {
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

  const purchase = (products) => {
    //products.forEach(product => {
       chooseDishes(products);
    //})
  }

  return (
    <ScrollHeaderContainer headerVisible={false} title="Cart" refreshEnabled={true} onRefresh={() => onRefresh()} refreshing={refreshing}>
      <StatusBar style="light" hidden={true} />
      <CloseBtn>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Image source={require("../../assets/images/back.png")} />
        </TouchableOpacity>
      </CloseBtn>
      <View style={[ styles.container, {marginTop: 100} ] }>
        <Text style={[ styles.headerText, { marginBottom: 20 } ]}>Cart</Text>
        { loading ? (<Loading/>) : (
          <>
          {productsGroup.map((product, key) => (
            <View key={ key } style={ styles.item }>
              <View style={ styles.itemcontent }>
                <CachedImage style={styles.listImage} source={{ uri: product?.picture }} resizeMode="cover" />
                <View style={ styles.textWrap }>
                  <Text style={ styles.productTitle }>{product?.title}</Text>
                  <Text style={ styles.productDate }>{product?.date}</Text>
                </View>
                <View style={ styles.countWrap }>
                  <Text style={ styles.productCount }>{product?.count}</Text>
                </View>
              </View>
              <View style={ styles.itemtools }>
                <TouchableOpacity  style={styles.editItem} onPress={() => addToCart(product)}>
                  <Feather name="plus" size={16} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.editItem} onPress={() => deleteItem(product.id)}>
                  <Feather name="minus" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          </>
          ) 
        }
        {/*
        <View >
          <View style={{ flexDirection: "row" }}>
            <TextInput textAlign={"left"} placeholder="Promo code" style={globalStyles.inputText} placeholderTextColor="#A8A8A8" value={promo} onChangeText={(e) => setPromo(e)} />
            <TouchableOpacity style={ styles.promoButton } onPress={() => getPromoCode()}>
              {promoLoading ? <ActivityIndicator size="small" color="#fff" /> : <Feather name="chevrons-right" size={22} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>*/}
        <View style={{ width: '100%', height: 1, backgroundColor: '#FFFFFF', marginTop: 20, marginBottom: 25 }}></View>
        <View style={{ flexDirection: "row" }}>
          <View><Price>Total</Price></View>
          <View style={styles.price_inner_wrap}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 5 }}>
              <PriceSymbol />
              <Price>{totalprice}</Price>
            </View>
          </View>
        </View>


        <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, marginBottom: 0, width: '100%'}]} onPress={() => purchase(products)}>
            <Text style={globalStyles.mainButtonText}>Proceed to select location</Text>
        </TouchableOpacity>

      </View>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(CartScreen);
