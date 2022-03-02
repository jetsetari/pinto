//FoodList

import * as React from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { List, ListItem } from "native-base";
import { styles } from "./FoodList-styles";
import { SharedElement } from 'react-navigation-shared-element';
import CachedImage from "../../components/CachedImage";

function FoodList({ dishes, onDetailNavigationPress, type }) {
  return (
    <List style={styles.ListContainer}>
      {dishes !== undefined && dishes !== "loading" && dishes.length > 0 ? (
        dishes.map((dish, idx) => (
          <ListItem key={idx} style={styles.listItem}>
            <TouchableOpacity style={styles.listItemTouch} onPress={() => onDetailNavigationPress(dish)}>
              <SharedElement id={`item.${dish.id}.image_url`}>
                <CachedImage style={styles.listImage} source={{ uri: dish.picture }} resizeMode="cover" />
              </SharedElement>
              <SharedElement id={`item.${dish.id}.title`}>
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.listItemText}>{dish.title}</Text>
                </View>
              </SharedElement>
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
            <Text style={styles.noItemText}>{type === "orders" ? "You haven't ordered anything yet." : "There are no dishes for this date."}</Text>
          </View>
        </ListItem>
      )}
    </List>
  );
}

export default FoodList;
