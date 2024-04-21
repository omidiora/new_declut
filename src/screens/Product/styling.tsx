import styled from '@emotion/native';
import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SemiBoldText} from '../../utils/text';

export const SelectionViewInput = styled.TouchableOpacity({
  width: '100%',
  backgroundColor: '#E4E7EC',
  padding: 15,
  borderRadius: 12,
});

export const ModalViewArrow = ({onPress, value}) => {
  return (
    <SelectionViewInput onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <SemiBoldText marginTop={5}>{value}</SemiBoldText>
        <MaterialIcons
          name="keyboard-arrow-right"
          color={'#000000'}
          size={25}
        />
      </View>
    </SelectionViewInput>
  );
};
