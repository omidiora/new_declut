import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ArrowRight from '../../assets/images/rightArrowBlack.svg';
import {Spacer} from '.';
import {SIZES, FONTS} from '../../utils/theme/theme';
import {LineComponent} from '../../screens/Home/component';
import {BoldText, SemiBoldText, fontSize} from '../../utils/text';
import {useTheme} from '@react-navigation/native';
const ProfileCard = ({
  headerTitle,
  title1,
  title2,
  onPress1,
  onPress2,
  hideLine,
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        width: SIZES.width / 1.1,
        alignSelf: 'center',
        paddingBottom: SIZES.height / 35,
      }}>
      <BoldText color="#101828" fontSize={fontSize.sm + 2} marginBottom={10}>
        {headerTitle}
      </BoldText>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 0.3,
          padding: 12,
          paddingTop: 15,
          paddingBottom: 15,
          borderColor: 'grey',
        }}>
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={onPress1}>
              <SemiBoldText
                marginTop={15}
                fontSize={fontSize.sm + 2}
                color={colors.secondaryBlack}>
                {title1}
              </SemiBoldText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPress1}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
          <Spacer height={5} />
          {!hideLine && <LineComponent />}
          <Spacer height={5} />
          <View style={styles.row}>
            <TouchableOpacity onPress={onPress2}>
              <SemiBoldText
                marginTop={15}
                fontSize={fontSize.sm + 2}
                color={colors.secondaryBlack}>
                {title2}
              </SemiBoldText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onPress2}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  name: {
    ...FONTS.h2,
  },
  address: {
    color: 'grey',
  },
  text: {
    ...FONTS.body3,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'red',
  },
  account: {
    ...FONTS.body3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between', padding: 5},
  icon: {
    paddingTop: SIZES.height / 52,
  },
});
