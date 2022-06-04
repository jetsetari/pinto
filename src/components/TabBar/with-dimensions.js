import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const withDimensions = BaseComponent => props => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const handleOrientationChange = ({window}) => {
    const {width, height} = window;
    setDimensions({width, height});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleOrientationChange);
    return () =>
      Dimensions.removeEventListener('change', handleOrientationChange);
  }, []);

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <BaseComponent
          dimensions={{width: dimensions.width - insets.left - insets.right}}
          {...props}
        />
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default withDimensions;