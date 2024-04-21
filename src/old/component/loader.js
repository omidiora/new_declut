import React from 'react';
import {Text, Image, View, Platform} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

// import {COLORS, FONTS, SIZES} from '../constants/theme';
// import images from '../assets/images';
import {COLORS, FONTS, SIZES} from '../Util/theme';
import {BODY_IMAGE} from '../Util/Util';
const Loader = ({loading, text, timer}) => {
  return (
    <Modal
      isVisible={true}
      style={{alignItems: 'center'}}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={300}
      backdropColor={COLORS.lightPrimary}
      backdropOpacity={0.4}>
      {timer ? (
        <CountdownCircleTimer
          isPlaying
          duration={60}
          colors={[COLORS.primary, COLORS.secondary]}
          colorsTime={[7, 5, 2, 0]}>
          {({remainingTime}) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      ) : (
        <View
          style={{
            width: SIZES.width / 2,
            height: SIZES.width / 2,
          }}>
          <Text style={{...FONTS.body3, color: COLORS.black}}>{text}</Text>
          {Platform.OS == 'android' ? (
            <LottieView
              source={require('../assets/lottie/loader.json')}
              autoPlay
              loop
            />
          ) : (
            <LottieView
              style={{alignItems: 'center', justifyContent: 'center'}}
              source={require('../assets/lottie/loader.json')}
              autoPlay
              loop>
              <Image
                source={BODY_IMAGE.automobile}
                style={{
                  width: SIZES.width / 8,
                  height: SIZES.width / 8,
                  borderRadius: SIZES.width / 16,
                  backgroundColor: '#fff',
                }}
                resizeMode="contain"
              />
            </LottieView>
          )}
        </View>
      )}
    </Modal>
  );
};

export default Loader;
