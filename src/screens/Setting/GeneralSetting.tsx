import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TopHeader} from '../../component/view/headers/topHeader';
import {BoldText, MediumText, SemiBoldText, fontSize} from '../../utils/text';
import ON from '../../assets/images/svg/ON.svg';
import OF from '../../assets/images/svg/OFF.svg';
import Arrow from '../../assets/images/right.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LineComponent} from '../Home/component';
import StatesComponent from '../../component/ModalComponentForState/StatesComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchInput} from '../../component/view/input/Search';
import {fontPixel, widthPixel} from '../../utils/theme/pxToDpConvert';
import {useDispatch} from 'react-redux';
import {settingApi} from '../../../redux/product/api';
import { hp } from '../../utils/general';

const GeneralSetting = () => {
  const {colors} = useTheme();
  const [option, setOption] = useState({});
  const [isVisible, setisVisible] = useState(false);
  const dispatch = useDispatch();
  const [newCondition, setnewCondition] = useState(true);
  const [oldCondition, setoldCondition] = useState(true);
  const [currenLocation, setcurrenLocation] = useState(true);
  const navigation = useNavigation();

  const getProduct = () => {
    let payload={
      by_current_location:  1,
      by_condition_new:  newCondition ?1:0,
      by_condition_neatly_used: oldCondition ?1:0,
      "other-location":option?.value,
      navigation:navigation,
      
    }
    dispatch(
      settingApi(payload),
     
    );
  };
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader
        title="Setting"
        rightComponent={true}
        rightText="Done"
        onPress={() => getProduct()}
      />

      {isVisible && (
        <StatesComponent
          isVisible={isVisible}
          option={option}
          setOption={setOption}
          setVisible={setisVisible}
        />
      )}

      <ViewContainer>
        <Spacer height={30} />
        <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
          Location
        </BoldText>

        <Spacer height={10} />
        <MediumText color={colors.mediumGrey} fontSize={fontSize.sm}>
          When this is on, you’ll see listings around you right now.
        </MediumText>

        <Spacer height={40} />
        <Row disabled={true} justifyContent="space-between">
          <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
            Explore Location
          </BoldText>

          <Row disabled={false} onPress={() => setisVisible(true)}>
            {/* setisVisible */}
            <View>
            <MediumText marginTop={hp(0.34)} color={colors.secondaryBlack} fontSize={fontSize.md-2}>
              {option.value ?? 'Select'}
            </MediumText>
            </View>

            <View style={{marginLeft: 3}}>
              <MaterialIcons name="keyboard-arrow-right" size={hp(3)} />
            </View>
          </Row>
        </Row>
        <Spacer height={40} />
        <LineComponent />

        <Spacer height={40} />
        <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
          Item condition
        </BoldText>
        <Spacer />
        <Row justifyContent="space-between" alignItems="center">
          <SemiBoldText color={colors.darkBlack} fontSize={fontSize.sm + 2}>
            New
          </SemiBoldText>

          <TouchableOpacity onPress={() => setnewCondition(!newCondition)}>
            {newCondition ? <ON /> : <OF />}
          </TouchableOpacity>
        </Row>
        <Spacer />
        <Row justifyContent="space-between" alignItems="center">
          <SemiBoldText color={colors.darkBlack} fontSize={fontSize.sm + 2}>
            Old
          </SemiBoldText>

          <TouchableOpacity onPress={() => setoldCondition(!oldCondition)}>
            {oldCondition ? <ON /> : <OF />}
          </TouchableOpacity>
        </Row>
      </ViewContainer>
    </BaseView>
  );
};

export default GeneralSetting;

const styles = StyleSheet.create({});
