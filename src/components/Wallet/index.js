import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from "./Wallet-styles";
import { globalStyles } from "~/assets/styles/styles.js";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

import { Ionicons } from "@expo/vector-icons";

function Wallet(props) {

  let wallet = props.wallet ? props.wallet : 0;

  return (
    <View style={{width: '100%',marginBottom: 0, marginTop: 30}}>
      <View style={{ width: '100%', ...globalStyles.mainLineWhiteButton}} onPress={() => navigation.navigate("Wallet") }>
        <View style={styles.icon}>
          <Ionicons name="card-outline" size={40} color={"#ffffff"} />
        </View>
        <Text style={[globalStyles.mainButtonText, styles.btnText, { marginLeft: 0, lineHeight: 25}]}> {i18n.t('wallet')} {"\n"}<Text style={{ fontSize: 22, fontFamily: "TitilliumLight" }}>{ wallet } thb</Text></Text>
        {/*<View style={{marginLeft: 'auto', marginRight: 20, width: 100, ...globalStyles.mainLineButton}}>
          <Text style={globalStyles.mainLineButtonText}>{i18n.t('addcredit')}</Text>
        </View>*/}
      </View>
    </View>
  );
}

export default Wallet