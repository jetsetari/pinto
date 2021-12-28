import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { Content } from "native-base";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
//Redux
import { connect } from "react-redux";
import { updateWalletAmount } from "../../firebase/firestore/updateData";
import { getUser } from "../../firebase/firestore/getData";


function WalletScreen(props) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    getUser(props.company.selectedCompany.user_id, (result) => {
      setWallet(result.wallet);
    })
  }, [wallet])

  const addMoney = (amount) => {
    updateWalletAmount(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, props.company.selectedCompany.wallet + amount, (callback) => {
      getUser(props.company.selectedCompany.user_id, (result) => {
        setWallet(result.wallet)
      });
    })
  }

  return (
    <ScrollHeaderContainer title="Wallet" >
      <StatusBar hidden={false} style="light" />
      <Content style={{marginTop: 50, color: "white"}}>
        <Text>Your wallet contains: {wallet} tokens</Text>
        <Button title="add Money" onPress={() => addMoney(5)}/>
        
      </Content>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(WalletScreen);
