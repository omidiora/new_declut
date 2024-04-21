import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {COLORS, SIZES, FONTS} from '../Util/theme';
import BackVectorIcon from '../../assets/images/svg/back_vector_icon.svg';
import {COLOR, FontFamily, WP} from '../Util/Util';

export default function HeaderComponent2({
  title,
  noBack,
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
}) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const dispatch = useDispatch();

  const showMenu = () => setVisible(true);

 

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View>
            {noBack || (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.goBack()}>
                <BackVectorIcon />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View>
            {rightComponent && (
              <TouchableOpacity style={styles.signIn} onPress={rightFunc}>
                <Text
                  style={[
                    styles.signInText,
                    rightColor && {color: rightColor},
                  ]}>
                  {rightText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {showStep && (
            <View style={{flexDirection: 'row', paddingTop: SIZES.height / 12,alignSelf:'center',alignContent:'center'}}>
              {!step1 && (
                <View
                  style={{
                    width: WP(25),
                    backgroundColor: COLOR.mainColor,
                    height: 4,
                    borderRadius: 10,
                    marginLeft: -SIZES.width/1,
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
              {!step3 ? (
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
                    width: WP(35),
                    backgroundColor: '#E4E7EC',
                    height: 4,
                    borderRadius: 10,
                    marginLeft: -13,
                  }}></View>
              )}
            </View>
          )}
          {/* <View style={styles.headerRightWrap}>
            <TouchableOpacity
              onPress={handleNotifications}
              Notificationsstyle={styles.icon}>
              <Text>BELL</Text>
            </TouchableOpacity>
            <Menu
              visible={visible}
              style={{backgroundColor: COLORS.white}}
              anchor={
                <TouchableOpacity style={styles.icon} onPress={showMenu}>
                  <Text>'SEARCH</Text>
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}>
              <MenuItem
                textStyle={{color: COLORS.textPrimary}}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.cardBorder,
                  borderRadius: 6,
                }}
                onPress={() => {
                  hideMenu();
                  handleLogout();
                }}>
                Logout
              </MenuItem>
              <MenuDivider />
            </Menu>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: SIZES.padding / 2,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftWrap: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
  },

  headerRightWrap: {
    flexDirection: 'row',
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    paddingVertical: SIZES.radius,
    paddingRight: SIZES.padding / 1.2,
    paddingLeft: SIZES.radius / 2,
    tintColor: COLORS.textPrimary,
  },

  touchableIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.textPrimary,
  },

  text: {
    ...FONTS.h2,
    color: COLOR.black,
    fontWeight: '500',
  },
  count: {
    ...FONTS.h2,
    marginTop: SIZES.margin / 2,
    color: COLORS.primary,
    fontWeight: '700',
  },
  button: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: '500',
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius / 2,
    width: 100,
    height: 44,
  },
  signInText: {
    color: COLOR.mainColor,
    // fontWeight: 'bold',
    fontSize: WP(4.5),
    // fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },

});
