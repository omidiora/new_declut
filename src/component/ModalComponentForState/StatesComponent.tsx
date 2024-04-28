import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ReactNativeModal from 'react-native-modal';
import styled from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllState} from '../../../redux/location/api';
import {SemiBoldText} from '../../utils/text';
import {colors} from 'react-native-elements';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {hp, wp} from '../../utils/general';
import {TopHeader} from '../view/headers/topHeader';
import {SearchInput} from '../view/input/Search';
import {fontPixel, widthPixel} from '../../utils/theme/pxToDpConvert';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalContainer = styled.View({
  flex: 2,
  backgroundColor: 'white',
  height: hp(5),
  width: wp(105),
  alignSelf: 'center',
});

const SearchInputContainer = styled.View({
  width: '90%',
  alignSelf: 'center',
});
const StatesComponent = ({option, setOption, isVisible, setVisible}) => {
  const dispatch = useDispatch();
  const StateOfNigeria = useSelector(state => state.location?.data ?? []);
  const {colors} = useTheme();
  const [search, setSearch] = React.useState<string>('');

  useEffect(() => {
    dispatch(getAllState());
  }, []);

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = StateOfNigeria.filter(
      item => item.value.toLowerCase().includes(text.toLowerCase()), // Adjust 'name' to the property you want to search
    );

    setSearch(text);
    setFilteredData(filtered);
  };

  useFocusEffect(
    React.useCallback(() => {
      setFilteredData(StateOfNigeria);
    }, [StateOfNigeria]),
  );
  return (
    <ReactNativeModal isVisible={isVisible} style={{backgroundColor: 'white'}}>
      <ModalContainer>
        <TopHeader
          title="Location"
          rightComponent={true}
          rightText=""
          onPress={() => setVisible(false)}
        />

        <SearchInputContainer>
          <SearchInput
            placeholder="What are you looking for?"
            // value={search}
            // autoFocus={true}
            containerStyle={{
              backgroundColor: search == '' ? '#DCDCDC54' : 'white',
              borderColor: 'transparent',
              // width: widthPixel(370),
              borderRadius: 10,

              // padding:10
              // height:100
            }}
            // onSubmitEditing={() => {
            //   searchItems();
            // }}
            clearButtonMode="while-editing"
            onChangeText={handleSearch}
            leftIcon={
              <Ionicons
                name="search-outline"
                size={fontPixel(15)}
                color="#000000"
                style={{marginRight: widthPixel(10)}}
              />
            }
          />
        </SearchInputContainer>

        <ScrollView
          //   contentContainerStyle={{paddingBottom: 30}}
          style={{
            paddingBottom: 30,
            paddingLeft: 20,
            paddingTop: 12,
            zIndex: 120,
          }}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.states}
              onPress={() => {
                setOption(item);
                setVisible(false);
              }}>
              <SemiBoldText color="black">{item.value}</SemiBoldText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ModalContainer>
    </ReactNativeModal>
  );
};

export default StatesComponent;

const styles = StyleSheet.create({
  states: {paddingTop: 15, paddingBottom: 30, paddingLeft: 10},
});
