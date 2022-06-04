import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size={"small"} color="#fff" />
    </View>
  );
}

export default Loading