import React, { useState, useRef } from "react";
import { TextInput, View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { styles, CloseBtn } from "./LocationSearch-styles.js";
import { EvilIcons } from "@expo/vector-icons";

function LocationSearch({ machines, navigation, handlePlaceClick }) {
  const [location, setLocation] = useState("");
  const [searchResults, setSarchResults] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  let searchInput = useRef();
  
  function searchLocation(event) {
    setLocation(event);

    let number = machines.filter((item) => {
      let searchResult = item.location.number.toString().toLowerCase();
      return searchResult.indexOf(event.toLowerCase()) !== -1;
    });

    let street = machines.filter((item) => {
      let searchResult = item.location.street.toLowerCase();
      return searchResult.indexOf(event.toLowerCase()) !== -1;
    });

    let postal_code = machines.filter((item) => {
      let searchResult = item.location.postal_code.toString().toLowerCase();
      return searchResult.indexOf(event.toLowerCase()) !== -1;
    });

    let region = machines.filter((item) => {
      let searchResult = item.location.region.toLowerCase();
      return searchResult.indexOf(event.toLowerCase()) !== -1;
    });

    let name = machines.filter((item) => {
      let searchResult = item.name.toLowerCase();
      return searchResult.indexOf(event.toLowerCase()) !== -1;
    });

    let formatted_address = machines.filter((item) => {
      let searchResult = item.formatted_address.toLowerCase();
      return searchResult.indexOf(event.toLowerCase()) !== -1;
    });

    let search = number.concat(street, postal_code, region, formatted_address, name);
    if (search.length <= 0) {
      search.push({
        name: "No result",
      });
    }
    let result = search.reduce((arr, item) => {
      let exists = !!arr.find((x) => x.name === item.name);
      if (!exists) {
        arr.push(item);
      }
      return arr;
    }, []);
    setSarchResults(result);
  }

  function leaveInput() {
    searchInput.blur();
    setInputActive(false);
  }

  const machineList = (props) => {
    function handelClick() {
      handlePlaceClick(props.item.idx);
      searchInput.blur();
      setInputActive(false);
    }
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => handelClick()}>
        <Text style={styles.listItemText}>{props.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={inputActive ? styles.searchBarWrapperActive : styles.searchBarWrapper}>
        <TextInput style={styles.input} placeholder="Search location" placeholderTextColor="#B1B1B1" returnKeyType="next" textContentType="location" value={location} onChangeText={(e) => searchLocation(e)} onFocus={() => setInputActive(true)} ref={(input) => (searchInput = input)} />
        <CloseBtn>
          <TouchableOpacity onPress={() => (inputActive ? leaveInput() : navigation.goBack())}>
            <Image style={styles.headerImage} source={require('../../assets/images/back.png')} />
          </TouchableOpacity>
        </CloseBtn>
      </View>

      {inputActive && <View style={styles.searchResults}>{searchResults && <FlatList keyboardShouldPersistTaps={true} data={searchResults} renderItem={machineList} keyExtractor={(item) => item.idx} />}</View>}
    </>
  );
}

export default LocationSearch;
