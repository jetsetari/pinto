//FoodList

import * as React from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { List, ListItem, H2 } from "native-base";
import { styles } from "./OrderedFood-styles";

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
              <View style={styles.listItemTextContainer}>
              <H2 style={styles.listItemText}>{dish.title}</H2>
              <Text style={styles.listItemText}>Pickup date: {formatDate(dish.date.toDate())}</Text>
              <Text style={styles.listItemText}>Machine: {dish.machine_name} ({dish.machine_id})</Text>
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
              <Text style={styles.noItemText}>{pickup !== undefined && pickup ? "Your food isn't in this vending machine." : "You have no orders yet."}</Text>
            </View>
        </ListItem>
      )}
    </List>
  );
}

export default OrderedFood;
