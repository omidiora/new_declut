import {
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  StatusBar,
} from 'react-native';
import React from 'react';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Extrapolation,
  interpolate,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackVectorIcon from '../../assets/images/back_vector_icon.svg';
Ionicons.loadFont();

const HeaderComponent = ({
  title = 'Create account',
  rightComponent,
  rightText,
  rightFunc,
  leftFunc,
  step1,
  step2,
  step3,
  step4,
  showStep,
  rightColor,
  animatingWidthValues = [0, 1020],
  headerMargin
}) => {
  const navigation = useNavigation();

  const animatingValue = useSharedValue(0);

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      animatingValue.value = withSpring(1, {
        damping: 25,
        stiffness: 120,
        overshootClamping: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animatingValue.value,
        [0, 1012],
        animatingWidthValues,
        Extrapolation.CLAMP,
      ),
      height: interpolate(
        animatingValue.value,
        [0, 310],
        animatingWidthValues,
        Extrapolation.CLAMP,
      ),
      borderWidth: interpolate(
        animatingValue.value,
        [10, 300],
        animatingWidthValues,
        Extrapolation.CLAMP,
      ),
      // borderColor: COLOR.black,
      // marginLeft:-14,
    };
  });

  return (
    <View style={{paddingBottom: 10,backgroundColor:COLOR.white,paddingTop:16}}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => (leftFunc ? leftFunc() : navigation.goBack())}
          style={styles.icon}>
          <BackVectorIcon />
        </TouchableOpacity>
        <View>
          <Text style={[styles.create,headerMargin&& {marginLeft:headerMargin}]}>{title}</Text>
        </View>
        {rightComponent && (
          <TouchableOpacity style={styles.signIn} onPress={rightFunc}>
            <Text
              style={[styles.signInText, rightColor && {color: rightColor}]}>
              {rightText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {showStep && (
        <View style={{flexDirection: 'row', paddingTop: 13.5}}>
          {step1 && (
            <View
              style={{
                width: WP(25),
                backgroundColor: COLOR.mainColor,
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          )}
          {step2 ? (
            <View
              style={{
                width: WP(35),
                backgroundColor: COLOR.mainColor,
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          ) : (
            <View
              style={{
                width: WP(35),
                backgroundColor: '#E4E7EC',
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          )}
          {step3 ? (
            <View
              style={{
                width: WP(30),
                backgroundColor: COLOR.mainColor,
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          ) : (
            <View
              style={{
                width: WP(30),
                backgroundColor: '#E4E7EC',
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          )}
          {step4 ? (
            <View
              style={{
                width: WP(30),
                backgroundColor: COLOR.mainColor,
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          ) : (
            <View
              style={{
                width: WP(30),
                backgroundColor: '#E4E7EC',
                height: 4,
                borderRadius: 10,
                marginLeft: -20,
              }}></View>
          )}
        </View>
      )}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WP(80),
    backgroundColor:COLOR.white
  },
  signIn: {
    paddingLeft: WP(-10),
    paddingTop: HP(-1),
  },
  signInText: {
    color: COLOR.mainColor,
    // fontWeight: 'bold',
    fontSize: WP(4.5),
    // fontWeight: 'bold',
    fontFamily: FontFamily.bold,
    left: WP(10),
  },

  create: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(5),
    fontWeight: 'bold',
    textAlign:'center',
    marginLeft:WP(7)
  },
  pageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    height: 300,
  },
  leftItem: {
    flex: 1,
    paddingLeft: 4,
    paddingTop: 4,
  },
  rightItem: {
    flex: 1,
    paddingRight: 4,
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  headerItem: {
    flex: 1,
    paddingTop: 4,
  },
  animatingBorder: {
    top: -1,
    borderColor: 'red',
    height: 300,
    width: 390,
  },
  icon: {
    marginTop: HP(0.9 ),
    backgroundColor:COLOR.white
  },
});
