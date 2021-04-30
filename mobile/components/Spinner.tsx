import React, {useEffect, useRef} from 'react';
import {View, ActivityIndicator, StyleSheet, Animated} from 'react-native';

const Spinner = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{...styles.outer, opacity: fadeAnim}}>
      <View style={styles.inner} />
      <ActivityIndicator size={80} color="#375777" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  inner: {
    position: 'absolute',
    backgroundColor: 'grey',
    opacity: 0.5,
    height: '100%',
    width: '100%',
  },
});

export default Spinner;
