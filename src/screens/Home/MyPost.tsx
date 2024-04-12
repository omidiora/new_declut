import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SIZES} from '../../utils/theme/theme';
import {HSpacer, Spacer, ViewContainer} from '../../component/view';
import {BoldText, RegularText, SemiBoldText} from '../../utils/text';
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
import {BaseView} from './component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrashIcon from '../../assets/images/trash.svg';
import EditIcon from '../../assets/images/edit.svg';
import Shimmer from 'react-native-shimmer-kit';
const LocationIcon = styled(Location)({
  marginTop: 1,
  // paddingHorizontal:10,
  right: 3,
});

const ActionContainer = styled.TouchableOpacity({
  flexDirection: 'row',
  padding: 10,
});

const MyPost = () => {
  const {colors} = useTheme();
  const {data, loading, error, myPost} = useAppSelector(state => state.product);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [productId, setproductId] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(MyPostItem());
    }, []),
  );

  const Delete = async id => {
    refRBSheet.current.close();
    // setModalVisible();
    try {
      await dispatch(DeleteProduct(id));
    } catch (error) {}
  };

  const EditItem = item => {
    refRBSheet.current.close();
    dispatch(editProductItemAction(item));
    navigation.navigate('ProductNavigation', {
      screen: 'EditItem1',
      params: {
        productDetails: item,
      },
    });
  };
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <Spacer />
      <ViewContainer>
        <View>
          <FlatList
            // contentContainerStyle={{paddingTop:10}}
            data={
              // myPost?.data
              typeof myPost?.data === 'object'
                ? Object.values(myPost?.data ?? {})
                : myPost?.data
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <View style={{marginBottom: 50, flexDirection: 'row'}}>
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
                          {item.area}
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
                  <HSpacer width={78} />
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
                  </TouchableOpacity>
                </View>
              </>
            )}
            ListEmptyComponent={() => <></>}
          />
        </View>
      </ViewContainer>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        draggable={true}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <ActionContainer onPress={() => EditItem(productId?.id)}>
          <EditIcon />
          <HSpacer width={10} />
          <BoldText color={'black'} marginTop={5}>
            Edit
          </BoldText>
        </ActionContainer>
        <ActionContainer
          style={styles.row}
          onPress={() => {
            Alert.alert('', 'Are you sure you want to delete this item?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Ask me later pressed'),
              },
              {
                text: 'Confirm',
                onPress: () => Delete(productId?.id),
                style: 'ok',
              },
            ]);
          }}>
          <TrashIcon />
          <HSpacer width={10} />
          <BoldText color={'black'} marginTop={5}>
            Delete
          </BoldText>
        </ActionContainer>
      </RBSheet>
    </BaseView>
  );
};

export default MyPost;

const styles = StyleSheet.create({});
