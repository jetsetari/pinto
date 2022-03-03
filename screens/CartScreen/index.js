import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Button, ActivityIndicator } from "react-native";
import { Content } from "native-base";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
//Redux
import { connect } from "react-redux";
import { getCartProducts, getUser } from "../../firebase/firestore/getData";
import { deleteFromCart } from "../../firebase/firestore/deleteData";
import { View } from "react-native-animatable";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { globalStyles } from "../../globalStyles/styles.js";
import { styles } from "./Cart-styles.js";
import CachedImage from "../../components/CachedImage";


function CartScreen(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [promo, setPromo] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [found_promo, set_found_promo] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [totalprice, setTotalprice] = useState(0);

  const getCart = () => {
    getCartProducts(props.company.selectedCompany.user_id, (result) => {
      setProducts(result);
    })
  };

  useEffect(() => {
    getCart();
    let price = 0;
    products.map(function(element, index) { 
      price = price+parseFloat(element.price);
    });
    setTotalprice(price);
  }, [products]);

  const onRefresh = ()  => {
    setRefreshing(true);
    getCart();
  }

  const deleteItem = (product_id) => {
    deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, product_id, () => {
      getCartProducts(props.company.selectedCompany.user_id, (result) => {
        setProducts(result);
      });
    })
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
      <View style={ styles.container }>
        <Text style={ styles.headerText }>Cart</Text>
        {products.map(product => (
          <View style={ styles.item }>
            <CachedImage style={styles.listImage} source={{ uri: product?.picture }} resizeMode="cover" />
            <View style={ styles.textWrap }>
              <Text style={ styles.productTitle }>{product?.title}</Text>
              <Text style={ styles.productDate }>{product?.date}</Text>
            </View>
            <TouchableOpacity  style={styles.deleteItem} onPress={() => deleteItem(product.id)}>
              <Feather name="trash-2" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}

        <View >
          <View style={{ flexDirection: "row" }}>
            <TextInput textAlign={"left"} placeholder="Promo code" style={globalStyles.inputText} placeholderTextColor="#A8A8A8" value={promo} onChangeText={(e) => setPromo(e)} />
            <TouchableOpacity style={ styles.promoButton } onPress={() => getPromoCode()}>
              {promoLoading ? <ActivityIndicator size="small" color="#fff" /> : <Feather name="chevrons-right" size={22} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>


        <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, marginBottom: 70, width: '100%'}]} onPress={() => purchase(products)}>
            <Text style={globalStyles.mainButtonText}>Purchase Items ( {totalprice} thb)</Text>
        </TouchableOpacity>

      </View>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(CartScreen);
