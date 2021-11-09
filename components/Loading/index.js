import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#1E8C62" }}>
       <ActivityIndicator size={"small"} color="#fff" />
    </View>
  );
}

export default Loading