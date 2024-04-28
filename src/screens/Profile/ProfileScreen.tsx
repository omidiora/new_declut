import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Linking,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import Avatar, {IconTypes, Sizes} from 'rn-avatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UserAvatar from 'react-native-user-avatar';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp} from '../../utils/general';
import {useAppDispatch} from '../../../redux/hook';
import {AlertNofity, AlertNofityError} from '../../utils/notify';
import {SIZES, FONTS} from '../../utils/theme/theme';
import {upLoadFileApi} from '../../../redux/product/api';
import {editProfileApi} from '../../../redux/auth/profile';
import ProfileCard from '../../component/view/ProfileCard';
import {SemiBoldText} from '../../utils/text';
import {HSpacer, Spacer, ViewContainer} from '../../component/view';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import MainPreloader from '../../component/view/MainPreloader';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

// const sendOnWhatsApp = () => {

//   console.log('test');
//   let msg = 'The Contact Number for your product!';
//   let mobile = '08067031917';

//   if (mobile) {
//     if (msg) {
//       let url = 'whatsapp://send?phone=234' + '09160006032' + '&text=' + msg;
//       Linking.openURL(url)
//         .then(() => {
//           console.log('WhatasApp Opened');
//         })
//         .catch(() => {
//           alert('Make Sure whatsapp is installed on your device');
//         });
//     } else {
//       console.log('Please insert message to send');
//     }
//   } else {
//     console.log('Please insert mobile no');
//   }
// };

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const refRBSheet = React.useRef();
  const uploadApiLoading = useSelector(state => state.product.loading);
  const editProfielLoading = useSelector(state => state.profile.loading);
  const camera = React.useRef<Camera>(null);
  const devices = useCameraDevices();
  const devicess = Camera.getAvailableCameraDevices();
  const device = devicess.find(d => d.position === 'front');
  const {getItem, setItem} = useAsyncStorage('@declut');
  const [imageItem, setImageItem] = React.useState({});
  const [user, setUser] = React.useState({});
  const product = useSelector(state => state?.product?.profilePicture);
  const {removeItem} = useAsyncStorage('@declut_user');
  const [cameraPermission, setCameraPermission] = React.useState(false);
  const [img, setImg] = React.useState('');

  const LogoutAction = async () => {
    try {
      await removeItem();
      AlertNofity('Logout', 'Logout Successfully');
      navigation.navigate('Auth');
    } catch (e) {
      console.log(e, 'aldmalmld');
      AlertNofityError('Logout', 'Something Went Wrong. Try again');
      // remove error
    }
  };

  // console.log(product[0]?.path, 'adjbjbfadfi');

  React.useEffect(() => {
    const readItemFromStorage = async () => {
      const item = await getItem();
      console.log(item, 'adadfasd');
      setUser(JSON.parse(item));
    };

    readItemFromStorage();
  }, [product]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission(true);
        console.log('You can use the camera');
      } else {
        setCameraPermission(false);
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useLayoutEffect(() => {
    requestCameraPermission();
  }, []);

  let Profile = true;

  React.useEffect(() => {
    setImg(product?.[0]?.path);
  }, [product]);

  const updateAvatar = () => {
    dispatch(
      editProfileApi({
        avatar: img,
        name: user?.name,
        email: user?.email,
        phone_number: user?.phone_number,
        id: user?.id,
      }),
    );
  };

  const ImagePicker = async () => {
    console.log('image picker');
    try {
      let options = {
        // includeBase64: true,
        quality: 1,
        mediaType: 'phots',
      };
      const result = await launchImageLibrary(options);
      setImageItem(result);

      if (imageItem && imageItem.assets && imageItem.assets[0]) {
        const formData = new FormData();
        formData.append('path', 'profile');
        formData.append('file[0]', {
          uri:
            Platform.OS === 'ios'
              ? imageItem?.assets?.[0]?.uri?.replace('file://', '')
              : imageItem?.assets?.[0]?.uri,
          type: imageItem?.assets?.[0]?.type,

          name: imageItem?.assets?.[0]?.fileName,
        });

        // alert('success');

        // console.log('got to ');

        dispatch(upLoadFileApi(formData, navigation, Profile, updateAvatar));
      }
    } catch (err) {
      alert('error from uploading');
      console.log(err, 'err from uploading');
    }
  };

  console.log('====================================');
  console.log(product?.[0]?.path, 'path');
  console.log('====================================');
  return (
    <View style={styles.container}>
      {/* {cameraPermission && device ? (
        <Camera
          style={styles.cameraContainer}
          // codeScanner={codeScanner}
          device={device}
          isActive
          resizeMode="cover"
        />
      ) : (
        <SemiBoldText textAlign='center' color='black'>No camera device available</SemiBoldText>
      )} */}
      {/* {loading && <OverlayPreloader />} */}
      <SafeAreaView>
        <View style={{flexDirection: 'row', paddingBottom: 30}}>
          {user?.avatar == null ? (
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{marginLeft: SIZES.width / 30, marginTop: 20}}>
              <UserAvatar size={60} name={user?.name} bgColors={['green']} />
            </TouchableOpacity>
          ) : (
            <Avatar
              rounded
              showEditButton
              size={Sizes.LARGE}
              source={{
                uri: user?.avatar,
              }}
              title="Grace"
              containerStyle={{margin: 10}}
              onEditPress={() => ImagePicker()}
              onLongPress={() => console.log('component long pressed')}
              onPress={() => ImagePicker()}
              editButton={{
                name: 'edit',
                type: IconTypes.Entypo,
              }}
            />
          )}

          <View style={{marginTop: SIZES.height / 25, marginLeft: 10}}>
            <Text style={styles.name}>{user?.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="star" color={'#FBBF24'} />
              <HSpacer width={4} />
              <Text style={{bottom: 4, color: '#667085'}}>{user?.rating}</Text>
            </View>
            {/* <Text style={styles.address}>7 ,Lorem ipsum ada.</Text> */}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{paddingBottom: SIZES.height / 7}}>
        <ProfileCard
          headerTitle={'Account'}
          title1={'Account details'}
          title2={'Payment Information'}
          onPress1={() => navigation.navigate('EditProfile')}
          onPress2={() =>
            navigation.navigate('Payment', {
              screen: 'PaymentForm',
            })
          }
        />
        <ProfileCard
          headerTitle={'Notifications'}
          title1={'Email'}
          title2={'Push notifications'}
          onPress1={() => navigation.navigate('EmailSetting')}
          onPress2={() => navigation.navigate('PushNotification')}
          // PushNotification
        />
        <ProfileCard
          headerTitle={'Contact us'}
          title1={'Help & support'}
          title2={'Help Desk'}
          onPress2={() => navigation.navigate('PushNotification')}
          onPress2={() => navigation.navigate('HelpDesk')}
        />
        <ProfileCard
          headerTitle={'Legal'}
          title1={'Licenses'}
          title2={'Terms of Service'}
          onPress1={() => navigation.navigate('License')}
          // LicenseScreen
        />
        <ProfileCard
          headerTitle={'Account Options'}
          title1={'Log out'}
          title2={'Delete account'}
          // onPress1={() => naviga()}
          onPress2={() =>
            navigation.navigate('DeleteAccount', {
              screen: 'FirstDeleteAccoun',
            })
          }
        />
      </ScrollView>

      <MainPreloader
        // isVisible={uploadApiLoading || editProfielLoading}
        text={'Updating your profile. Please wait!!!'}
      />

      <RBSheet
        ref={refRBSheet}
        // useNativeDriver={false}
        height={100}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#lightgrey',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <HSpacer width={300} />
        <ViewContainer paddingVertical={40}>
          <TouchableOpacity onPress={() => ImagePicker()}>
            <SemiBoldText color="black">Upload from gallery</SemiBoldText>
          </TouchableOpacity>
          <Spacer height={30} />
          {/* <TouchableOpacity>
            <SemiBoldText color="black">Take a picture</SemiBoldText>
          </TouchableOpacity> */}
        </ViewContainer>
      </RBSheet>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: COLOR.white,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  sectionHeaderStyle: {
    fontSize: 18,
    padding: 4,
    // color: COLOR.black,
    // fontFamily: FontFamily.regular,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
  },
  sectionContainer: {
    // backgroundColor: COLOR.white,
    borderRadius: hp(0.2),
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  logoutContainer: {
    marginTop: 30,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 1,
  },
  logout: {
    // fontFamily: FontFamily.regular,
    color: 'red',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  name: {
    ...FONTS.h2,
    color: 'black',
  },
  address: {
    // color: COLOR.lightGrey,
  },
  text: {
    ...FONTS.body3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  account: {
    ...FONTS.body3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  cameraContainer: {
    height: 450,
    width: 400,
  },
});
