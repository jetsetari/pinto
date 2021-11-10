import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Platform, Alert, Linking, ActivityIndicator } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Container, Header, Left, View, Right, Icon, Title } from "native-base";
import { styles } from "./PickUp-styles";
import { globalStyles } from "../../globalStyles/styles.js";
import HeaderContainer from "../../components/HeaderContainer";
import * as IntentLauncher from "expo-intent-launcher";
import { getAisleNumber } from "../.././firebase/firestore/getData";
import { Ionicons } from "@expo/vector-icons";
import LottieView from 'lottie-react-native';
//Redux
import { connect } from "react-redux";
import { formatDate } from "../../functions/formatDate";
import { StatusBar } from "expo-status-bar";

function PickUpScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongQrCode, setWrongQrCode] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setLoading(true);
    let _qr_code_data = data.split("-");
    if (_qr_code_data[1] !== undefined && _qr_code_data[1] === "machine_id") {
      //new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      getAisleNumber(_qr_code_data[0], formatDate(new Date()), props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, (result) => {
        setLoading(false);
        if (result.length > 0) {
          props.navigation.push("ChooseOrder", { data: result });
        } else {
          setWrongQrCode("Your food isn't in this vending machine.");
          setLoading(false);
          setTimeout(() => {
            setWrongQrCode("");
          }, 3000);
        }
      });
    } else {
      setWrongQrCode("Invalid QR code");
      setLoading(false);
      setTimeout(() => {
        setWrongQrCode("");
      }, 3000);
    }
  };

  if (hasPermission === null) {
    return (
      <HeaderContainer title="Pick up food">
        <Text style={styles.scanText}>Requesting for camera permission</Text>
      </HeaderContainer>
    );
  }

  if (hasPermission === false) {
    return (
      <HeaderContainer title="Pick up food">
        {Alert.alert("Grant access to your camera.", "Go to settings and turn on your camera permission to scan the qr code on the vending machine.", [{ text: "Settings", onPress: () => openSetting() }], { cancelable: false })}
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer title="Pick up food">
       <StatusBar style="light" hidden={false} />
              {wrongQrCode !== "" && (
          <View style={styles.wrongQrCode}>
            <Ionicons name="warning-outline" size={82} color={"#FFAA0D"} />
            <Text style={styles.wrongQrCodeText}>{wrongQrCode}</Text>
          </View>
        )}
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.camera} />
      <View style={globalStyles.e_layout}>


        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"small"} color="#fff" />
          </View>
        ) : (
          <>
            {scanned ? (
              <TouchableOpacity style={globalStyles.mainButton} onPress={() => setScanned(false)}>
                <Text style={globalStyles.mainButtonText}>Tap to scan Again</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ textAlign: "center", justifyContent: 'center', alignItems: 'center', }}>
                <LottieView source={require('./animation.json')} style={{ width: 100, textAlign:"center", justifyContent: "center", alignItems: "center", }} autoPlay loop />
                <Text style={styles.scanText}>Scan QR code on Pinto machine to pick up your food.</Text>
              </View>
            )}
          </>
        )}
      </View>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, null)(PickUpScreen);
