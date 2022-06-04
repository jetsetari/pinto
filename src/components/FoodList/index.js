//FoodList

import * as React from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { List, ListItem } from "native-base";
import { styles } from "./FoodList-styles";
import { SharedElement } from 'react-navigation-shared-element';
import CachedImage from "~/components/CachedImage";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from '~/assets/locales/';
i18n.translations = {
  en: translate.en, th: translate.th,
};
i18n.locale = global.language;
i18n.fallbacks = true;


 
function FoodList({ dishes, onDetailNavigationPress, type }) {
  let lang_i = i18n.locale == 'th' ? 0 : 1;
  return (
    <View style={styles.ListContainer}>
      {dishes !== undefined && dishes !== "loading" && dishes.length > 0 ? (
        <ScrollView>
          { dishes.map((dish, idx) => (
            <View key={idx} style={styles.listItem}>
              <TouchableOpacity style={styles.listItemTouch} onPress={() => onDetailNavigationPress(dish)}>
                <SharedElement id={`item.${dish.id}.image_url`}>
                  <CachedImage style={styles.listImage} source={{ uri: dish.picture }} resizeMode="cover" />
                </SharedElement>
                <SharedElement id={`item.${dish.id}.title`}>
                  <View style={styles.listItemTextContainer}>
                    <Text style={styles.listItemText}>{dish.title.split(/–|-/, 2)[lang_i]}</Text>
                  </View>
                </SharedElement>
              </TouchableOpacity>
            </View>
          )) }
        </ScrollView>
      ) : dishes === "loading" ? (
        <View style={styles.listItem}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"small"} color="#fff" />
          </View>
        </View>
      ) : (
        <View style={styles.listItem}>
          <View style={styles.noItemTextextContainer}>
            <Text style={styles.noItemText}>{type === "orders" ? i18n.t('not_ordered') : i18n.t('no_dishes') }</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default FoodList;
