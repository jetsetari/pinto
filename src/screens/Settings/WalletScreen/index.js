import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, TouchableOpacity, TextInput } from "react-native";
import HeaderContainer from "~/components/HeaderContainer";
import { StatusBar } from "expo-status-bar";
import { setSelectedCompany } from "~/redux/actions/selectedCompany-actions";
import { Container, Content, H1, H3, H2 } from "native-base";
import { globalStyles } from "~/assets/styles/styles.js";
import { styles } from "./Wallet-styles.js";

import { Ionicons } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { updateWalletAmount } from "~/firebase/firestore/updateData";
import { getUser } from "~/firebase/firestore/getData";


function WalletScreen(props) {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    getUser(props.company.selectedCompany.user_id, (result) => {
      let _wallet = result.wallet ? result.wallet : 0;
      setWallet(_wallet);
    })
  }, [wallet])

  const addMoney = (amount) => {
    updateWalletAmount(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, props.company.selectedCompany.wallet + amount, (callback) => {
      getUser(props.company.selectedCompany.user_id, (result) => {
        let _wallet = result.wallet ? result.wallet : 0;
        setWallet(_wallet);
      });
    })
  }

  return (
    <HeaderContainer title="Wallet" back="Main" backButton="Account" navigation={props.navigation}>
        <View style={globalStyles.e_layout}>
          <H1 style={styles.HeadingText}>Amount</H1>
          <Text style={styles.description}>Your wallet contains: {wallet} THB</Text>
          <H3 style={{ ...styles.SubHeadingText, marginTop: 40 }}>Add credit to wallet</H3>
          <Text style={styles.description}>Enter the amount you want to add to your wallet and pay</Text>
          <TextInput textAlign={"left"} placeholder="Amount" style={globalStyles.inputText} placeholderTextColor="#A8A8A8" value={amount} onChangeText={(e) => setAmount(e)} />
          <TouchableOpacity style={[globalStyles.mainButton, {marginTop: 20, width: '100%'}]} onPress={() => addMoney(5)}>
              <Text style={globalStyles.mainButtonText}>Add money</Text>
          </TouchableOpacity>
        </View>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(WalletScreen);


