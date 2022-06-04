import React, { useEffect, useState } from "react";
import { View, RefreshControl } from "react-native";
import ScrollHeaderContainer from "~/components/ScrollHeaderContainer";
import { pickUpDish, updateOrderPicked, scannedQrCode } from "~/firebase/firestore/updateData";
import { Container, Content, H1, H3, H2 } from "native-base";

//Redux
import { connect } from "react-redux";
import Loading from "~/components/Loading";
import { globalStyles } from "~/assets/styles/styles.js";
import { styles } from "./Food-styles.js";
import OrderedFood from "~/components/OrderedFood";
import { createLog } from "~/firebase/firestore/saveData";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

function ChooseOrderScreen(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState("");
  const [dishes, setDishes] = useState("");

  useEffect(() => {

    if(props.route.params.data.length === 1){
      doPickUpDish(props.route.params.data[0])
    }else{
      scannedQrCode(props.company.selectedCompany.company_id, props.route.params.data[0].machine_docId, (result) => {
        setOrders(props.route.params.data);
        setTimeout(() => {
          props.navigation.goBack()
        }, 23000);
      })
    }
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const changeMachine = () => {
    getAllOrderers(date, (e) => {
      setDishes(e)
    });
  }

  const doPickUpDish = (dish) => {
    setLoading(true);
    pickUpDish(props.company.selectedCompany.company_id, dish.machine_docId, dish.dish_aisle, (result) => {
      
      if (result) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
    
        setDate(mm + '- ' + dd + '-' + yyyy);

        let logDate = mm + '-' + dd + '-' + yyyy

        createLog(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish.id, dish.dish_aisle, logDate, props.route.params.data[0].machine_docId, () => {
          setLoading(false);
          setSucces(true);
          setTimeout(() => {
            setSucces(false);
            props.navigation.goBack();
          }, 5000);
        });

        // updateOrderPicked(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish.id, date, props.route.params.data[0].machine_docId, newDishesMachine, )
      } else {
        setLoading(false);
      }
    });
  };

  return loading ? <Loading/> : (
    <ScrollHeaderContainer title={succes ? "" : i18n.t('pickdish')}>
      {succes ? (
        <View style={(globalStyles.e_layout, styles.orderSuccess)}>
          <H1 style={styles.HeadingText}>{i18n.t('gettingdish')}</H1>
          <H2 style={styles.SubHeadingText}>{i18n.t('gettingdish')}</H2>
        </View>
      ) : (
        <View style={globalStyles.e_layout}>
          <OrderedFood dishes={loading ? "loading" : orders} pickup={true} doPickUpDish={(dish) => doPickUpDish(dish)} />
        </View>
      )}
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, null)(ChooseOrderScreen);
