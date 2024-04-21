import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Image,
  ActivityIndicator,
} from 'react-native';
import Overlay from '../assets/images/svg/overlay.svg';
import {BlurView} from '@react-native-community/blur';
import {BODY_IMAGE, COLOR, HP, WP} from '../Util/Util';

const OverlayPreloader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, []);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Change to 360deg for one complete rotation
  });

  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={4}
      />
      <View style={{alignSelf: 'center', marginTop: HP(33)}}>
        <ActivityIndicator color={COLOR.mainColor} size={'large'} />
        <Text
          style={{
            color: COLOR.white,
            // marginTop: HP(-30),
            textAlign: 'center',
          }}>
          Please wait...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
  },
  image: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
    marginLeft: 13,
  },
});

export default OverlayPreloader;
