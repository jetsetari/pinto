import React, { useState, useMemo, useEffect } from "react";
import { StatusBar } from "react-native";
import Navigation from "./routes";
import * as firebase from "./firebase/firebase";
import Loading from "./components/Loading";
import { setSelectedCompany } from "./redux/actions/selectedCompany-actions";
import { useFonts } from "expo-font";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNewUserToDB } from "./firebase/firestore/saveData";
import { getUser } from "./firebase/firestore/getData";
import { getpending } from "./firebase/firestore/deleteData";

function App(props) {
  const [authUser, setAuthUser] = useState(null);

  let [fontsLoaded] = useFonts({
    TitilliumBold: require("./assets/fonts/Titillium-Bold.ttf"),
    TitilliumRegular: require("./assets/fonts/Titillium-Regular.ttf"),
    TitilliumLight: require("./assets/fonts/Titillium-Light.ttf"),
  });

  useEffect(() => {
    //getpending()
  }, []);
  useMemo(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        if (props.company.selectedCompany.new_user !== undefined && props.company.selectedCompany.new_user) {
          addNewUserToDB(user.uid, props.company.selectedCompany, (data) => {
            props.setSelectedCompany({ new_user: false, company_id: props.company.selectedCompany.company, user_id: user.uid, ...data });
          });
        } else {
          getUser(user.uid, (result) => {
            
            props.setSelectedCompany(result);
          });
        }
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    });
  }, [authUser]);

  return fontsLoaded ? (
    <>
      <StatusBar style="light" hidden={false} />
      {authUser !== null ? <Navigation authUser={authUser} /> : <Loading />}
    </>
  ) : <Loading/>;

}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCompany: bindActionCreators(setSelectedCompany, dispatch),
  };
};

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
