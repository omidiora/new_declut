import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
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
import {FloatingAction} from 'react-native-floating-action';
import {COLOR, HP} from '../../old/Util/Util';
import NewMyPost from './NewMyPost';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
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
  const {setItem, getItem} = useAsyncStorage('@has_user_account');
  const [has_account, setHasAccount] = React.useState(null);

  const checkIfUserHaveSetAccount = async () => {
    const item = await getItem();
    console.log('====================================');
    console.log(item, '111111');
    console.log('====================================');
    setHasAccount(JSON.parse(item));
  };

  useEffect(() => {}, [has_account]);

  //
  useFocusEffect(
    React.useCallback(() => {
      checkIfUserHaveSetAccount();
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

  console.log(has_account, 'aknkdnakndkn');

  // console.log('====================================');
  // console.log(myPost?.data, 'myPost?.data ');
  // console.log('====================================');
  return (
    <View style={{flex: 1}}>
      <NewMyPost />
      <View style={styles.bodyImage}>
        {/* <Image source={BODY_IMAGE.emptyMyPost} />
        <Text style={styles.plus}>
          You don’t have any items listed. Use the plus ‘+’ button below to add
          an item.
        </Text> */}
      </View>
      <FloatingAction
        animated={false}
        showBackground={false}
        color={COLOR.mainColor}
        distanceToEdge={{
          vertical: 110,
          horizontal: 20,
        }}
        actions={[]}
        onPressMain={name => {
          if (JSON.parse(has_account)) {
            navigation.navigate('ProductNavigation');
          } else {
            Alert.alert(
              'Product',
              'You need to add your bank detail before you can create a product. This is the account the buyer will be paying into.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('Payment', {
                      screen: 'PaymentForm',
                    }),
                },
              ],
            );
          }
        }}
      />
      {/* </BaseView> */}
    </View>
  );
};

export default MyPost;

const styles = StyleSheet.create({
  bodyImage: {
    alignSelf: 'center',
    paddingTop: HP(4),
    alignItems: 'center',
  },
});
