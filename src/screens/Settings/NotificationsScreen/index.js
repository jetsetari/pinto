import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, TouchableOpacity } from "react-native";
// import { setSelectedCompany } from "~/redux/actions/selectedCompany-actions";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import HeaderContainer from "~/components/HeaderContainer";
// import { setDefaultMachine } from "~/redux/actions/defaultMachine-actions";
// import { Feather } from "@expo/vector-icons";
import { globalStyles } from "~/assets/styles/styles.js";
// import PickerModal from "~/components/PickerModal";
// import { LinearGradient } from "expo-linear-gradient";
// import { styles } from "./NotificationsListScreen-styles";
import { getnotify, getUser } from "~/firebase/firestore/getData";
import DropDownSearch from "~/components/DropDownSearch";
import i18n from 'i18n-js';
i18n.locale = global.language;

let languages = { 'th' : 'Thai', 'en': 'English' };
let language = global.language;



function NotificationsScreen({ navigation, company }) {
  const [latestNews, setLatestNews] = useState(false);
  const [orderPick, setOrderPick] = useState(true);
  const [notify, setnotify] = useState(false);
  const [language, setLanguage] = useState('th');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getnotify(company.selectedCompany.company_id, (result) => {
      if(result)setnotify(result);
    });

    setLanguages([
      {label: 'Thai', value: 'th'},
      {label: 'English', value: 'en'}
    ]);
  }, []);

  const changeLanguage = (e) => {
    setLanguage(e);
    global.language = e;
    i18n.locale = e;
  }

  return (
    <HeaderContainer back={"Account"} navigation={navigation} title={i18n.t('notifications')}>
      <View style={[globalStyles.e_layout, { marginTop: 20 }]}>

        {notify &&
          notify.map((item, idx) => (
            <View key={idx} style={{ flexDirection: "row", justifyContent: "flex-start", width: 100+"%", backgroundColor: "#124C47", borderRadius: 0, paddingHorizontal: 15, paddingVertical: 15, marginBottom: 10 }}>
              <View style={{ color: "#fff", fontSize: 16, fontFamily: "TitilliumBold", paddingTop: 4, width: 100+"%" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 18, fontFamily: "TitilliumBold", paddingTop: 4, width: 100+"%" }}>{item.name}</Text>
                <Text style={{ color: "#CECECE", fontSize: 10, fontFamily: "TitilliumLight", paddingTop: 4, width: 100+"%" }}>{item.date}</Text>
                <Text style={{ color: "#CECECE", fontSize: 13, fontFamily: "TitilliumLight", paddingTop: 4, width: 100+"%" }}>{item.description} {"\n"}</Text>
                
              </View>
            </View>
          ))}
      </View>
    </HeaderContainer>
    );
    }

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});
  
  export default connect(mapStateToProps, null)(NotificationsScreen);