import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, TextInput, Platform, TouchableOpacity, SafeAreaView, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { styles, Container, Bubble, CustomMarkerCurrent, CustomMarker, CloseBtn } from "./MachineMapScreen-styles.js";
import MachineSvg from "./MachineSvg";
import MachineSvgWhite from "./MachineSvgWhite";
//import components
import MapCard from "../../components/MapCard";
import { connect } from "react-redux";
import { getAllIndividualMachines } from "../../firebase/firestore/getData.js";
import * as Haptics from 'expo-haptics';
//import styles and assets

//import data
import { rooms } from "./testData";
import LocationSearch from "../../components/LocationSearch/index.js";
import moment from "moment";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_INSET = width * 0.1;

function MachineMap(props) {
  const initialState = {
    rooms,
    region: {
      latitude: 13.736717,
      longitude: 100.523186,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
  };

  const [state, setState] = useState(initialState);
  const [active, setActive] = useState(0);
  const [machines, setMachines] = useState([]); 
 
  const _map = useRef(null);
  const _scrollView = useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  let prev_index = 0;

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

      if (prev_index != index) {
        setActive(index);
      }
      prev_index = index;
      if (index >= machines.length) {
        index = machines.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = machines[index];
          let coordinate = { latitude: location.lat, longitude: location.lng };
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  useEffect(() => {
    
    getIndividualMachines();
  }, []);

  function getIndividualMachines() {
    getAllIndividualMachines(props.company.selectedCompany.company_id, (machines) => {
      let _machines = [];
      machines.map((machine, i) => {
        let _formatted_address = machine.location.number + " " + machine.location.street + ", " + machine.location.postal_code + " " + machine.location.region;
        if(machine.active){
          _machines.push({
            ...machine,
            formatted_address: _formatted_address,
            idx: i,
          });
        }
      });

      setMachines(_machines);
    });
  }

  // const interpolations = machines.map((machine, index) => {
  //   const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

  //   const scale = mapAnimation.interpolate({
  //     inputRange,
  //     outputRange: [1, 1.25, 1],
  //     extrapolate: "clamp",
  //   });

  //   return { scale };
  // });

  const onMarkerPress = (mapEventData, isSearched) => {
    
    const markerID = isSearched ? mapEventData : mapEventData._targetInst.return.key;
    
    setActive(markerID)
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: false });
  };



  return (
    <Container>
      <MapView provider={PROVIDER_GOOGLE} ref={_map} style={styles.map} initialRegion={state.region}>
        {machines.map((machine, index) => {
          
          const scaleStyle = {
            transform: [
              {
                scale: active === index ? 1.25 : 1,
              },
            ],
          };
          return (
            <Marker key={index} coordinate={{ latitude: machine.location.lat, longitude: machine.location.lng }} onPress={(e) => onMarkerPress(e, false)}>
              <Animated.View style={[scaleStyle, styles.marker]}>
                <CustomMarker style={active === index ? styles.innerMarkerBlack : styles.innerMarkerWhite}>{active === index ? <Image source={require('../../assets/images/marker-active.png')} /> : <Image source={require('../../assets/images/marker.png')} />}</CustomMarker>
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <LocationSearch machines={machines} navigation={props.navigation} handlePlaceClick={(e) => onMarkerPress(e, true)} />

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        decelerationRate={0}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: CARD_INSET,
          bottom: 0,
          right: CARD_INSET,
        }}
        contentContainerStyle={{
          marginHorizontal: Platform.OS === "android" ? CARD_INSET : 0,
        }}
        onMomentumScrollBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )
      }
      >
        {machines.map((machine, index) => (
          (moment(Date.parse(`${moment(new Date()).format('DD MMM YYYY')} ${machine.openTime}`)).isBefore(new Date()) && moment(Date.parse(`${moment(new Date()).format('DD MMM YYYY')} ${machine.closeTime}`)).isAfter(new Date())) || moment(new Date(props.route.params.date)).isAfter(moment(new Date() ).add(1, 'days'))? (
            <MapCard
            key={index}
            image={machine.picture}
            title={machine.name}
            id={machine.id}
            freePlaces="7 free aisles"
            subtitle={machine.location.number + " " + machine.location.street + ", " + machine.location.postal_code + " " + machine.location.region}
            onPress={(e) => props.navigation.navigate("MachineDetail", {machine, dish: props.route.params.dish})}
          />
          ):(
            <MapCard
            key={index}
            image={machine.picture}
            title={machine.name}
            id={machine.id}
            freePlaces="7 free aisles"
            subtitle={'closed'}
          />
        )
        ))}
      </Animated.ScrollView>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});

export default connect(mapStateToProps, null)(MachineMap);
