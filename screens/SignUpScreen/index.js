import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import "firebase/firestore";
import * as firebase from "../../firebase";
import { styles } from "./SignUp-styles";
import { globalStyles } from "../../globalStyles/styles.js";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";

import DropDownPicker from 'react-native-dropdown-picker';
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
import { getCompanies } from "../../firebase/firestore/getData";
import { StatusBar } from "expo-status-bar";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function SignUpScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies((result) => {
      setCompanies(result)
    })
    
  }, [])

  function onLoginFailure(errorMessage) {
    setLoading(false);
    setErrorMessage(errorMessage);
  }

  function renderLoading() {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }

  async function signInWithEmail() {
    let content = { new_user: true, email: email, first_name: firstName, last_name: lastName, company: "VSdGBmehp16UYYXviAqc" }
    props.setSelectedCompany(content)
    
    doCreateUserWithEmailAndPassword(email, password, (result) => {
      onLoginFailure(result)
    })
  } 

  return (
    <ScrollHeaderContainer navigation={props.navigation} backButton={props.route.params.previous_screen} title="Sign Up"  >
       <StatusBar style="light" hidden={false} />
          <View style={[styles.e_layout, globalStyles.containerLogo]}>
            <TextInput autoCapitalize="words" autoCompleteType="name" style={globalStyles.inputText} placeholder="First name" placeholderTextColor="#B1B1B1" returnKeyType="next" textContentType="name" value={firstName} onChangeText={(firstName) => setFirstName(firstName)} />
            <TextInput autoCapitalize="words" autoCompleteType="name" style={globalStyles.inputText} placeholder="Last name" placeholderTextColor="#B1B1B1" returnKeyType="next" textContentType="name" value={lastName} onChangeText={(lastName) => setLastName(lastName)} />
            <TextInput autoCapitalize="none" keyboardType="email-address" autoCompleteType="email" style={globalStyles.inputText} placeholder="Email" placeholderTextColor="#B1B1B1" returnKeyType="next" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={(email) => setEmail(email)} />
            <TextInput autoCapitalize="none" autoCompleteType="password" style={globalStyles.inputText} placeholder="Password" placeholderTextColor="#B1B1B1" returnKeyType="done" textContentType="newPassword" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} />


{/* 
                  <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" style={styles.arrowDown}/>}
                  placeholder="Select your company"
                  style={styles.input}
                  placeholderIconColor="#007aff"
                  selectedValue={company}
                  onValueChange={(e) => setCompany(e)}
                >
                  {
                     companies.length > 0 ? companies.map((item, idx) => (
                      <Picker.Item key={idx} label={item.label} value={item.value} />
                    )) : (
                      <Picker.Item key={0} label="loading" value="Loading Companies" />
                    )
                  }
                 
                </Picker> */}
    
          </View>
          {renderLoading()}
          <Text style={{ fontSize: 18, textAlign: "center", color: "red", width: "80%" }}>{errorMessage}</Text>
          <View style={styles.e_layout}>
            <TouchableOpacity style={globalStyles.mainButton} onPress={() => signInWithEmail()}>
              <Text style={globalStyles.mainButtonText}>Create account</Text>
            </TouchableOpacity>
          </View>
    </ScrollHeaderContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCompany: bindActionCreators(setSelectedCompany, dispatch),
  };
};

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
