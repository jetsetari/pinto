//FoodList

import * as React from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { List, ListItem, H2 } from "native-base";
import { styles } from "./OrderedFood-styles";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;

let lang_i = i18n.locale == 'th' ? 0 : 1;

function OrderedFood({ dishes, onDetailNavigationPress, pickup, doPickUpDish }) {
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function onDetailNavigationPress(dish){
    if(pickup !== undefined && pickup){
      doPickUpDish(dish)
    }
  }
  return (
    <List style={styles.ListContainer}>
      {dishes !== undefined && dishes !== "loading" && dishes.length > 0 ? (
        dishes.map((dish, idx) => (
          <ListItem key={idx} style={styles.listItem}>
            <TouchableOpacity style={styles.listItemTouch} onPress={() => onDetailNavigationPress(dish)}>

              <Image
                style={styles.listImage}
                source={{
                  uri: dish.picture,
                }}
              />
              {
                dish.picked && 
                <Image 
                  style={styles.checkItem}
                  source={
                  require('~/assets/images/check.png')
                }/>
              }
              <View style={styles.listItemTextContainer}>
              <H2 style={styles.listItemTitle}>{dish.title.split(/–|-/, 2)[lang_i].trim()}</H2>
              <Text style={styles.listItemText}>{i18n.t('pickup')}: {formatDate(dish.date.toDate())}</Text>
              <Text style={styles.listItemText}>{i18n.t('machine')}: {dish.machine_name} ({dish.machine_id})</Text>
              </View>
            </TouchableOpacity>
          </ListItem>
        ))
      ) : dishes === "loading" ? (
        <ListItem style={styles.listItem}>
            <View style={styles.loadingContainer}>
            <ActivityIndicator size={"small"} color="#fff" />
            </View>
        </ListItem>
      ) : (
        <ListItem style={styles.listItem}>
            <View style={styles.noItemTextextContainer}>
              <Text style={styles.noItemText}>{pickup !== undefined && pickup ? i18n.t('notinthismachine') : i18n.t('noorders') }</Text>
            </View>
        </ListItem>
      )}
    </List>
  );
}

export default OrderedFood;
