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
import {useTheme} from '@react-navigation/native';
import { hp } from '../../utils/general';

const OverlayPreloader = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const {colors} = useTheme();

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
      <View style={{alignSelf: 'center', marginTop: hp(33)}}>
        <ActivityIndicator color={colors.mainColor} size={'large'} />
        <Text
          style={{
            color: colors.white,
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
    backgroundColor:'white',
  },
  image: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
    marginLeft: 13,
  },
});

export default OverlayPreloader;
