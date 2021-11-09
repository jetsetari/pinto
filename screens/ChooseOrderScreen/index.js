import React, { useEffect, useState } from "react";
import { View, RefreshControl } from "react-native";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { pickUpDish, updateOrderPicked, scannedQrCode } from "../../firebase/firestore/updateData";
import { Container, Content, H1, H3, H2 } from "native-base";

//Redux
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import { globalStyles } from "../../globalStyles";
import { styles } from "./Food-styles.js";
import OrderedFood from "../../components/OrderedFood";

function ChooseOrderScreen(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const doPickUpDish = (dish) => {
    setLoading(true);
    pickUpDish(props.company.selectedCompany.company_id, dish.machine_docId, dish.dish_aisle, (result) => {
      
      if (result) {
        
        updateOrderPicked(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish.id, () => {
          setLoading(false);
          setSucces(true);
          setTimeout(() => {
            setSucces(false);
            props.navigation.goBack();
          }, 5000);
        })
      } else {
        setLoading(false);
      }
    });
  };

  return loading ? <Loading/> : (
    <ScrollHeaderContainer title={succes ? "" : "Pick your dish"}>
      {succes ? (
        <View style={(globalStyles.e_layout, styles.orderSuccess)}>
          <H1 style={styles.HeadingText}>Getting selected dish</H1>
          <H2 style={styles.SubHeadingText}>The Machine will get your food now. Please wait.</H2>
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
