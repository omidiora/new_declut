import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {useTheme} from '@react-navigation/native';
import {TopHeader} from '../../component/view/headers/topHeader';
import {BoldText, MediumText, SemiBoldText, fontSize} from '../../utils/text';
import ON from '../../assets/images/svg/ON.svg';
import Arrow from '../../assets/images/right.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LineComponent} from '../Home/component';
import StatesComponent from '../../component/ModalComponentForState/StatesComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchInput} from '../../component/view/input/Search';
import { fontPixel, widthPixel } from '../../utils/theme/pxToDpConvert';

const GeneralSetting = () => {
  const {colors} = useTheme();
  const [option, setOption] = useState({});
  const [isVisible, setisVisible] = useState(false);

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <TopHeader
        title="Setting"
        rightComponent={true}
        rightText="Done"
        onPress={() => {}}
      />

    
     {isVisible &&  <StatesComponent
        isVisible={isVisible}
        option={option}
        setOption={setOption}
        setVisible={setisVisible}
      />}

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
            <BoldText color={colors.darkBlack} fontSize={fontSize.md}>
              {option.value ?? 'Select'}
            </BoldText>
            <View style={{marginLeft: 3}}>
              <MaterialIcons name="keyboard-arrow-right" size={20} />
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
          <View>
            <SemiBoldText color={colors.darkBlack} fontSize={fontSize.sm + 2}>
              New
            </SemiBoldText>
          </View>
          <ON />
        </Row>
        <Spacer />
        <Row justifyContent="space-between" alignItems="center">
          <View>
            <SemiBoldText color={colors.darkBlack} fontSize={fontSize.sm + 2}>
              Old
            </SemiBoldText>
          </View>
          <ON />
        </Row>
      </ViewContainer>
    </BaseView>
  );
};

export default GeneralSetting;

const styles = StyleSheet.create({});
