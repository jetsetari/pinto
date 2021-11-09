import React, { useEffect, useState } from "react";
import { View, RefreshControl } from "react-native";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { getEmployeeOrders } from "../../firebase/firestore/getData";

//Redux
import { connect } from "react-redux";
import FoodList from "../../components/FoodList";
import { globalStyles } from "../../globalStyles";
import OrderedFood from "../../components/OrderedFood";
import { StatusBar } from "expo-status-bar";

function OrdersScreen(props) {
  const [orders, setOrders] = useState([]);
  const [loading, seLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getOrders()
  }, []);

  function getOrders(){
    getEmployeeOrders(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, (result) => {
      setOrders(result);
      seLoading(false)
      setRefreshing(false)
    });
  }

  function onRefresh(){
    setRefreshing(true)
    getOrders()
  }

  return (
    <ScrollHeaderContainer title="Orders" backButton="Account" navigation={props.navigation} refreshEnabled={true} onRefresh={() => onRefresh()} refreshing={refreshing}>
       <StatusBar style="light" hidden="false" />
      <View style={globalStyles.e_layout}>
      <OrderedFood dishes={loading ? "loading" : orders} />
      </View>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, null)(OrdersScreen);
