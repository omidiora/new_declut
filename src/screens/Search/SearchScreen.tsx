import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SIZES} from '../../utils/theme/theme';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {BoldText, RegularText, SemiBoldText, fontSize} from '../../utils/text';
import {NAIRA_SYSMBOL, ShowFourteenWords} from '../../utils/general';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {useAppSelector} from '../../../redux/hook';
import {useDispatch} from 'react-redux';
import {
  DeleteProduct,
  MyPostItem,
  editProductItemAction,
} from '../../../redux/product/api';
import Location from '../../assets/images/location.svg';
import styled from '@emotion/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrashIcon from '../../assets/images/trash.svg';
import EditIcon from '../../assets/images/edit.svg';
import Shimmer from 'react-native-shimmer-kit';
import {SearchBar} from '@rneui/themed';
import {TextInput} from '../../component/view/input';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/theme/pxToDpConvert';
import {SearchInput} from '../../component/view/input/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchResultApi} from '../../../redux/search/api';
import ReactNativeModal from 'react-native-modal';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import SearchGlass from '../../assets/images/glass.svg';
import ArrowUp from '../../assets/images/arrow-up-right.svg';
import {ScrollView} from 'react-native';
import {LineComponent} from '../Home/component';

const LocationIcon = styled(Location)({
  marginTop: 1,
  // paddingHorizontal:10,
  right: 3,
});

const ActionContainer = styled.TouchableOpacity({
  flexDirection: 'row',
  padding: 10,
});

const SearchScreen = () => {
  const {colors} = useTheme();
  const {data, loading, error, myPost} = useAppSelector(state => state.search);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [productId, setproductId] = React.useState(null);
  const [search, setSearch] = React.useState<string>('');
  const [searchHistory, setSearchHistory] = useState([]);
  const {getItem, setItem} = useAsyncStorage('savedKeywordHistory');

  const loadSearchHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('searchHistory');
      if (savedHistory !== null) {
        console.log(savedHistory, 'alndfkndknfdka');
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  React.useEffect(() => {
    loadSearchHistory();
  }, [search]);

  const saveKeyword = async () => {
    try {
      if (search.trim() !== '') {
        const updatedHistory = [...searchHistory];
        if (!updatedHistory.includes(search.trim())) {
          updatedHistory.push(search.trim());
          console.log(updatedHistory, 'updatedHistory');
          await AsyncStorage.setItem(
            'searchHistory',
            JSON.stringify(updatedHistory),
          );
          setSearchHistory(updatedHistory);
          setSearch('');
        } else {
          console.log('Keyword already exists in the search history.');
        }
      }
    } catch (error) {
      console.error('Error saving keyword:', error);
    }
  };

  const SearchForItem = () => {
    if (search == '') {
      Alert.alert('Search', 'Enter a keyword!');
    } else {
      dispatch(searchResultApi(search));
    }
  };

  const SearchFromKeyWord = item => {
    dispatch(searchResultApi(item));
  };

  console.log(data, 'data?.data?.length');

  return (
    <BaseView backgroundColor={colors.bgColor}>
      <Spacer />
      <ViewContainer>
        <SearchInput
          placeholder="What are you looking for"
          value={search}
          // autoFocus={true}
          containerStyle={{
            backgroundColor: search == '' ? '#DCDCDC54' : 'white',
            borderColor: 'transparent',
            // width: widthPixel(370),
            borderRadius: 10,

            // padding:10
            // height:100
          }}
          onSubmitEditing={() => {
            SearchForItem();
            saveKeyword();
          }}
          clearButtonMode="while-editing"
          onChangeText={text => setSearch(text)}
          leftIcon={
            <Ionicons
              name="search-outline"
              size={fontPixel(15)}
              color="#000000"
              style={{marginRight: widthPixel(10)}}
            />
          }
        />
        <Spacer height={30} />
        <View>
          <FlatList
            // contentContainerStyle={{paddingTop:10}}
            data={
              // myPost?.data
              typeof data?.data === 'object'
                ? Object.values(data?.data ?? {})
                : data?.data
            }
            keyExtractor={(item)=>item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  style={{marginBottom: 50, flexDirection: 'row'}}
                  onPress={() => navigation.navigate('PreviewItem', {item})}>
                  <FastImage
                    style={{
                      width: SIZES.width / 3,
                      height: 100,
                      marginHorizontal: 5,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: 'https://unsplash.it/400/400?image=1',
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Spacer />
                  <View>
                    <View style={{left: 10}}>
                      <HSpacer />
                      <BoldText
                        color={colors.mediumGrey}
                        fontSize={14}
                        lineHeight={21}>
                        <Text numberOfLines={0.1} style={{flexShrink: 1}}>
                          {ShowFourteenWords(item.item_name)}
                        </Text>
                      </BoldText>
                      <Spacer height={5} />
                      <BoldText
                        color={colors.darkBlack}
                        fontSize={14}
                        lineHeight={21}>
                        {NAIRA_SYSMBOL}
                        {item.price}
                      </BoldText>
                      <Spacer height={7} />
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <LocationIcon />
                        </View>
                        <BoldText fontSize={14} color={colors.mediumGrey}>
                          {item.area} {item.state}
                        </BoldText>
                      </View>
                      <Spacer height={7} />
                      <View>
                        <SemiBoldText color="#A28300">
                          Posted
                          <SemiBoldText
                            lineHeight={15}
                            fontSize={10}
                            color="#A28300">
                            {' '}
                            {item.listed}
                          </SemiBoldText>
                        </SemiBoldText>
                      </View>
                    </View>
                  </View>
                  {/* <HSpacer width={78} />
                  <TouchableOpacity
                    onPress={() => {
                      setproductId(item);
                      refRBSheet.current.open();
                    }}>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={25}
                      color={'black'}
                    />
                  </TouchableOpacity> */}
                </TouchableOpacity>
              </>
            )}
            ListEmptyComponent={() => (
              <>
                <>
                  <ViewContainer paddingHorizontal={7}>
                    <Spacer height={50} />
                    {!searchHistory?.length==0 && (
                      <Row justifyContent="space-between" disabled={true}>
                        <BoldText fontSize={fontSize.md} color="black">
                          Recent Searches
                        </BoldText>
                        <TouchableOpacity onPress={() => clearHistory()}>
                          <SemiBoldText
                            color={colors.mainColor}
                            fontSize={fontSize.sm}>
                            CLEAR
                          </SemiBoldText>
                        </TouchableOpacity>
                      </Row>
                    )}
                    <Spacer height={40} />
                    {searchHistory.map((item, index) => (
                      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
                        <Row
                          key={index}
                          justifyContent="space-between"
                          disabled={true}>
                          <Row disabled={true}>
                            <SearchGlass />
                            <HSpacer width={10} />
                            <SemiBoldText
                              fontSize={fontSize.sm + 2}
                              color="#667085">
                              {item}
                            </SemiBoldText>
                          </Row>
                          <Spacer height={10} />

                          <TouchableOpacity
                            onPress={() => SearchFromKeyWord(item)}>
                            <ArrowUp />
                          </TouchableOpacity>
                        </Row>
                        <Spacer height={10} />
                        <LineComponent />
                      </ScrollView>
                    ))}

                    {/* <Spacer height={20} />
                <SemiBoldText
                  textAlign="center"
                  fontSize={fontSize.sm + 2}
                  color="black">
                  No Item Found!!!!
                </SemiBoldText> */}
                  </ViewContainer>
                </>
              </>
            )}
          />
        </View>

        <ReactNativeModal isVisible={loading}>
          <View
            style={{
              height: 150,
              width: 300,
              backgroundColor: 'white',
              alignSelf: 'center',
            }}>
            <View>
              <Spacer height={40} />
              <ActivityIndicator color={colors.mainColor} size={'large'} />
              <Spacer />
              <SemiBoldText textAlign="center" color="black">
                Loading!!!!
              </SemiBoldText>
            </View>
          </View>
        </ReactNativeModal>
      </ViewContainer>
    </BaseView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
