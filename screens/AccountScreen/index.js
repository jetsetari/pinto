import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, TouchableOpacity, SafeAreaView, Keyboard } from "react-native";
import * as firebase from "../../firebase";
import { globalStyles } from "../../globalStyles/styles.js";
import { styles } from "./Account-styles.js";
import HeaderContainer from "../../components/HeaderContainer";
import { doSignOut } from "../../firebase/auth";
import { Ionicons } from "@expo/vector-icons";

import { setSelectedCompany } from "../.././redux/actions/selectedCompany-actions";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import CachedImage from "../../components/CachedImage";

function AccountScreen({ navigation, setSelectedCompany, company }) {
  const onOrdersPress = (dish, fullDate) => {
    navigation.navigate("Orders");
  };
  function signOutPress() {
    setSelectedCompany({});
    doSignOut();
  }
  return (
    <ScrollHeaderContainer title="Account">
      <>
        <View style={globalStyles.e_layout}>
          <Text style={styles.h1}>{company.individual_mode ? "Individual mode" : "Company mode"}</Text>
        </View>
        <View style={(globalStyles.e_layout, styles.company_wrapper)}>
          <CachedImage style={styles.image} source={{ uri: company.logo }} resizeMode="cover" />
          <View style={styles.company_text_wrapper}>
            <Text style={styles.h2}>{company.name}</Text>
            <Text style={styles.text}>{company?.location?.number + " " + company?.location?.street}</Text>
            <Text style={styles.text}>{company?.location?.postal_code + " " + company?.location?.region}</Text>
          </View>
        </View>
        <TouchableOpacity style={globalStyles.accountlistitem} onPress={() => navigation.navigate("Company")}>
          <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
            <Text style={globalStyles.mainButtonText}>Change account mode</Text>
            <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
          </View>
        </TouchableOpacity>
        <View style={globalStyles.e_layout}>
          <Text style={styles.info_text}>{company.individual_mode ? "Individual mode is the default mode for your account. With this type of account you can pick up food on any available location. If you work in a company with a Pinto machine, you can select your company here and directly start ordering food at your company." : "With company mode you can directly start ordering food at your company where you work. If you want to order food at any location where a Pinto machine is placed, you can change it here."}</Text>
        </View>
        <TouchableOpacity style={styles.accountlistitemFirst} onPress={() => navigation.navigate("Orders")}>
          <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
            {/* <View style={styles.icon}>
              <Ionicons name="file-tray-full-outline" size={22} color={"#ffffff"} />
            </View> */}
            <Text style={globalStyles.mainButtonText}>Order history</Text>
            <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountlistitem} onPress={() => navigation.navigate("Contact")}>
          <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
            {/* <View style={styles.icon}>
              <Ionicons name="mail-open-outline" size={22} color={"#ffffff"} />
            </View> */}
            <Text style={globalStyles.mainButtonText}>Contact</Text>
            <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountlistitem} onPress={() => navigation.navigate("Terms")}>
          <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
            {/* <View style={styles.icon}>
              <Ionicons name="document-outline" size={22} color={"#ffffff"} />
            </View> */}
            <Text style={[globalStyles.mainButtonText, styles.btnText]}> Terms & Conditions</Text>
            <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountlistitem} onPress={() => navigation.push("HelpStackScreen")}>
          <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
            {/* <View style={styles.icon}>
              <Ionicons name="information-circle-outline" size={22} color={"#ffffff"} />
            </View> */}
            <Text style={[globalStyles.mainButtonText, styles.btnText]}> Help</Text>
            <Ionicons name="arrow-forward" size={22} color={"#ffffff"} />
          </View>
        </TouchableOpacity>

        <View style={{marginBottom: 60, ...globalStyles.e_layout}}>
          <TouchableOpacity style={globalStyles.mainLineButton} onPress={() => signOutPress()}>
            <Text style={globalStyles.mainLineButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </>
    </ScrollHeaderContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCompany: bindActionCreators(setSelectedCompany, dispatch)
  };
};

const mapStateToProps = (state) => ({
  company: state.selectedCompany.selectedCompany
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
