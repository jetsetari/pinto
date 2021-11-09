import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./icon";
import withDimensions from "./with-dimensions";

const S = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "rgba(22, 22, 22, 0)",
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 190,
    height: 50,
    marginBottom: 20,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  tabButton: { flex: 1, justifyContent: "center", alignItems: "center" },
  activeTab: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabInner: {
    width: 38,
    height: 38,
    marginLeft: -1,
    backgroundColor: "#ABC63C",
    borderRadius: 24,
  },
});

function TabBar({ state, descriptors, navigation, dimensions, activeTintColor, inactiveTintColor }) {
  const { routes, index: activeRouteIndex } = state;
  const tabWidth = 190 / routes.length;
  const [translateValue] = useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();
  useEffect(() => {
    translateValue.setValue(activeRouteIndex * tabWidth);
  }, [tabWidth]);

  const onTabPress = (route, routeIndex) => {
    const isFocused = state.index === routeIndex;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const updatePositioning = (route, routeIndex) => {
    onTabPress(route.route, routeIndex);
    Animated.spring(translateValue, {
      toValue: routeIndex * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ ...S.container }}>
      <View style={{ ...S.inner, marginBottom: insets.bottom + 30 }}>
        <View>
          <View style={StyleSheet.absoluteFillObject}>
            <Animated.View
              style={[
                S.activeTab,
                {
                  width: tabWidth,
                  transform: [{ translateX: translateValue }],
                },
              ]}
            >
              <View style={S.activeTabInner} />
            </Animated.View>
          </View>
        </View>

        {routes.map((route, routeIndex) => {
          const options = descriptors[route.key];
          const isRouteActive = routeIndex === activeRouteIndex;

          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          isRouteActive && updatePositioning({ route }, routeIndex);

          return (
            <TouchableOpacity
              key={routeIndex}
              style={S.tabButton}
              onPress={() => {
                updatePositioning({ route }, routeIndex);
              }}
              onLongPress={() => {
                updatePositioning({ route }, routeIndex);
              }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            >
              <Icon name={route.name} color={tintColor} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default withDimensions(TabBar);
