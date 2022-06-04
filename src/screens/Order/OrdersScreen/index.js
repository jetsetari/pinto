import React, { useEffect, useState } from "react";
import { View, RefreshControl, Text } from "react-native";
import HeaderContainer from "~/components/HeaderContainer";
import { getEmployeeOrders } from "~/firebase/firestore/getData";

//Redux
import { connect } from "react-redux";
import FoodList from "~/components/FoodList";
import { globalStyles } from "~/assets/styles/styles.js";
import OrderedFood from "~/components/OrderedFood";
import { StatusBar } from "expo-status-bar";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

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
    <HeaderContainer title={i18n.t('orderhistory')} back="Account" navigation={props.navigation} refreshEnabled={true} onRefresh={() => onRefresh()} refreshing={refreshing}>
      <View style={[globalStyles.e_layout, { marginTop: 0}]}>
        <OrderedFood dishes={loading ? "loading" : orders} />
      </View>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, null)(OrdersScreen);
