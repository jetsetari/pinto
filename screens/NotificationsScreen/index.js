import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, TouchableOpacity } from "react-native";
// import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
// import { setDefaultMachine } from "../../redux/actions/defaultMachine-actions";
// import { Feather } from "@expo/vector-icons";
import { globalStyles } from "../../globalStyles";
// import PickerModal from "../../components/PickerModal";
// import { LinearGradient } from "expo-linear-gradient";
// import { styles } from "./NotificationsListScreen-styles";
import { getnotify } from "../../firebase/firestore/getData";

function NotificationsScreen({ navigation, company }) {
  const [latestNews, setLatestNews] = useState(false);
  const [orderPick, setOrderPick] = useState(true);
  const [notify, setnotify] = useState(false);

  useEffect(() => {
    getnotify(company.selectedCompany.company_id, (result) => {
      if(result)setnotify(result);
    });
  }, []);

  return (
    <ScrollHeaderContainer backButton={"Home"} navigation={navigation} title="Info">
      <StatusBar style="light" />
      <View style={[globalStyles.e_layout, { marginTop: 20 }]}>
        {notify &&
          notify.map((item, idx) => (
            <View key={idx} style={{ flexDirection: "row", justifyContent: "flex-start", width: 100+"%", backgroundColor: "#124C47", borderRadius: 7, paddingHorizontal: 15, paddingVertical: 15, marginBottom: 10 }}>
              <Text style={{ color: "#fff", fontSize: 16, fontFamily: "JakartaRegular", paddingTop: 4, width: 100+"%" }}>
                <Text style={{ color: "#fff", fontSize: 20, fontFamily: "JakartaBold", paddingTop: 4, width: 100+"%" }}>{item.name} {"\n"}</Text>
                <Text style={{ color: "#CECECE", fontSize: 14, fontFamily: "JakartaLight", paddingTop: 4, width: 100+"%" }}>{item.date} {"\n"}</Text>
                {item.description}
              </Text>
            </View>
          ))}
      </View>
    </ScrollHeaderContainer>
    );
    }

const mapStateToProps = (state) => ({
  company: state.selectedCompany
});
  
  export default connect(mapStateToProps, null)(NotificationsScreen);