import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, TouchableOpacity, ActivityIndicator, Keyboard } from "react-native";
import * as firebase from "../../firebase";
import { globalStyles } from "../../globalStyles";
import { styles } from "./Company-styles.js";
import HeaderContainer from "../../components/HeaderContainer";
import { doSignOut } from "../../firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import SwitchToggle from "react-native-switch-toggle";
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
import DropDownPicker from "react-native-dropdown-picker";
import { StatusBar } from "expo-status-bar";


//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import CachedImage from "../../components/CachedImage";
import DropDownSearch from "../../components/DropDownSearch";
import { getCompanies, getCompanyById, checkIfAcountExists, getUser} from "../../firebase/firestore/getData";
import { changeUsersCompanyId } from "../../firebase/firestore/updateData";
import { addUserToCompany } from "../../firebase/firestore/saveData";

function CompanyScreen({ navigation, setSelectedCompany, company }) {
  const [value, setValue] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [toggleActive, setToggleActive] = useState(null);
  const [selected_company, set_selected_company] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToggleActive(company.individual_mode ? true : false);
    getCompanies((result) => {
      setCompanies(result.filter((e) => e.value !== "VSdGBmehp16UYYXviAqc"));
      setValue(company.company_id === "VSdGBmehp16UYYXviAqc" ? null : company.company_id);
    });
    
  }, []);

  useEffect(() => {
    if (value !== null && value.value !== company.company_id) {
      set_selected_company(false)
      getCompanyById(value, (result) => {
        set_selected_company(result);
      });
    }
  }, [value]);

  useEffect(() => {
    if (company.individual_mode === undefined) {
      if (toggleActive) {
        changeUsersCompanyId(company.user_id, "VSdGBmehp16UYYXviAqc", (result) => {

            getUser(company.user_id, (result) => {
              setSelectedCompany(result);
            });

        });
      }
    }
  }, [toggleActive]);

  function updateCompanyMode() {
    setLoading(true)
    checkIfAcountExists(selected_company.company_id, company.user_id, (exists) => {
      if(exists) {
        changeUsersCompanyId(company.user_id, selected_company.company_id, (result) => {
          if (result) {
            
            getUser(company.user_id, (result) => {
              
              setLoading(false)
              setSelectedCompany(result);
            });
          }
        });
      }else{
        let account_data = {
          first_name: company.first_name,
          last_name: company.last_name,
          email: company.email,
          created: new Date(),
          active: false,
          has_account: true,
          pickup_id: s8(1, 9),
        };
        addUserToCompany(selected_company.company_id, company.user_id, account_data, () => {
          changeUsersCompanyId(company.user_id, selected_company.company_id, (result) => {
            if (result) {
              getUser(company.user_id, (result) => {
                setLoading(false)
                setSelectedCompany(result);
              });
            }
          });
        })
      }
    })

  }

  function s8(min, max) {
    let _random = "";
    for (let i = 0; i < 8; i++) {
      min = Math.ceil(min);
      max = Math.floor(max);
      _random = _random + (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }

    return _random.slice(0, 4) + "-" + _random.slice(4, 8);
  }

  return (
    <ScrollHeaderContainer title="Account mode">
      <StatusBar hidden={false} style="light" />
      <View style={[globalStyles.e_layout, { marginTop: 80}]}>
        <Text style={globalStyles.h1}>Account mode</Text>
      </View>
      <TouchableOpacity style={globalStyles.accountlistitem}>
        <View style={(globalStyles.e_layout, globalStyles.accountlistitem_content)}>
          <Text style={globalStyles.mainButtonText}>Individual mode</Text>
          <SwitchToggle switchOn={toggleActive} onPress={() => setToggleActive(!toggleActive)} containerStyle={globalStyles.switch_container} circleStyle={globalStyles.switch_circle} circleColorOff="white" circleColorOn="#ABC63C" backgroundColorOn="#1D8C62" backgroundColorOff="#1D8C62" duration={200} />
        </View>
      </TouchableOpacity>
      {!toggleActive && (
        <>
          <View style={globalStyles.e_layout}>
            <Text style={styles.h1}>Company mode:</Text>
            {company.individual_mode === undefined && (
              <View style={styles.company_wrapper}>
                <CachedImage style={styles.image} source={{ uri: selected_company ? selected_company.logo : company.logo }} resizeMode="cover" />
                <View style={styles.company_text_wrapper}>
                  <Text style={styles.h2}>{selected_company ? selected_company.name : company.name}</Text>
                  <Text style={styles.text}>{(selected_company ? selected_company.location.number : company.location.number) + " " + (selected_company ? selected_company.location.street : company.location.street)}</Text>
                  <Text style={styles.text}>{(selected_company ? selected_company.location.postal_code : company.location.postal_code) + " " + (selected_company ? selected_company.location.region : company.location.region)}</Text>
                </View>
              </View>
            )}
            <View style={{ marginTop: 20, zIndex: 999 }}>
              <DropDownSearch placeholder="Select a company" items={companies} value={value} setValue={setValue} setItems={setCompanies} />
            </View>
            {value !== null  && selected_company && (
              <TouchableOpacity style={globalStyles.button} onPress={() => (!loading ? updateCompanyMode() : {})}>
                {!loading ? <Text style={globalStyles.buttonText}>Update mode</Text> : <ActivityIndicator size={"small"} color="#000" />}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollHeaderContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCompany: bindActionCreators(setSelectedCompany, dispatch),
  };
};

const mapStateToProps = (state) => ({
  company: state.selectedCompany.selectedCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyScreen);
