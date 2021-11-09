import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Animated, View, Text } from "react-native";

import {styles} from "./SlideUpView-styles.js"
import SlidingUpPanel from 'rn-sliding-up-panel';

const { width, height } = Dimensions.get("window");
const card_width = width * 0.8;
const img_width = card_width * 0.35;
const desc_width = card_width - img_width;

function SlideUpView ({ image, title, subtitle, rating, reviews, property, onPress }) {
  const draggableRange = { top: height + 80 - 64, bottom: 80 }
  const _draggedValue = new Animated.Value(80);
  let _panel = useRef();
  const backgoundOpacity = _draggedValue.interpolate({
    inputRange: [height - 48, height],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const iconTranslateY = _draggedValue.interpolate({
    inputRange: [height - 56, height, height + 80 - 64],
    outputRange: [0, 56, 80 - 32],
    extrapolate: "clamp"
  });

  const textTranslateY = _draggedValue.interpolate({
    inputRange: [draggableRange.bottom, draggableRange.top],
    outputRange: [0, 8],
    extrapolate: "clamp"
  });

  const textTranslateX = _draggedValue.interpolate({
    inputRange: [draggableRange.bottom, draggableRange.top],
    outputRange: [0, -112],
    extrapolate: "clamp"
  });

  const textScale = _draggedValue.interpolate({
    inputRange: [draggableRange.bottom, draggableRange.top],
    outputRange: [1, 0.7],
    extrapolate: "clamp"
  });
  return (
    <SlidingUpPanel
    ref={c => (_panel = c)}
    draggableRange={{ top: height + 80 - 64, bottom: 80 }}
    animatedValue={_draggedValue}
    snappingPoints={[360]}
    height={height + 180}
    friction={0.5}
  >
    <View style={styles.panel}>

      <View style={styles.panelHeader}>
        <View style={styles.panelUpDownIcon}/>
        <View>
          <Text style={styles.textHeader}>17 machines found on your location</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text>Dish list by location input😃</Text>
      </View>
    </View>
  </SlidingUpPanel>
  );
};



export default SlideUpView;
