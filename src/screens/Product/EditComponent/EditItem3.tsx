import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useDispatch, useSelector} from 'react-redux';

import {getUserAsyncStorage} from '../../../old/Util';
import {useNavigation} from '@react-navigation/native';
import Note from '../../../assets/images/note.svg';

import {hp, wp} from '../../../utils/general';
import {BODY_IMAGE, COLOR, FontFamily} from '../../../old/Util/Util';
import FormButton from '../../../old/component/FormButton';
import {
  upLoadFileApi,
  updateImagePreView,
  updateItemSuccess,
} from '../../../../redux/product/api';
import {useAppSelector, useAppDispatch} from '../../../../redux/hook';
import ProgressIndicator from '../../../old/component/ProgressIndicator';
import HeaderComponent from '../../../old/component/HeaderComponent';
import {AddItemHeader} from '../../../component/view/headers/AddItemHeader';
import {PrimaryButton} from '../../../component/view/button';
import { Spacer } from '../../../component/view';

const data = [
  {label: 'Lagos', value: '1', search: 'Lagos'},
  {label: 'Abuja', value: '2', search: 'Abuja'},
];

const EditItem3 = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [imageTypes, setImageTypes] = useState<{}[]>([]);
  const [videoTypes, setVideoTypes] = useState<{}>({});
  const [videoThumbNail, setVideoThumbNail] = useState<{}>({});
  const dispatch = useAppDispatch();
  const {data, loading, error, item} = useAppSelector(state => state.product);
  const navigation = useNavigation();
  const {updateUploadProgress} = useSelector(state => state.product);

  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess({
        condition: values.condition,
        price: values.price,
      }),
    );
    navigation.navigate('Item3');
  };

  const ImagePicker = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      // includeBase64:true,
      selectionLimit: 3,
    })
      .then(response => {
        if (response.didCancel) {
          setImageTypes([]);
        } else {
          setImageTypes(response?.assets);
        }
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };

  const VideoPicker = async () => {
    await launchImageLibrary({
      mediaType: 'video',
      selectionLimit: 1,
    })
      .then(response => {
        if (response.didCancel) {
          setVideoTypes({});
        } else {
          setVideoTypes(response?.assets);
          thumbNailCreator(response?.assets[0]?.uri);
        }
        // if (response) {

        // }
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };

  const thumbNailCreator = uri => {
    createThumbnail({
      url: uri,
      timeStamp: 10000,
    })
      .then(response => setVideoThumbNail(response))
      .catch(err => console.log({err}));
  };

  const getTotalFileSize = files => {
    let totalSize = 0;
    for (const file of files) {
      totalSize += file.fileSize;
    }

    return totalSize / 1024 / 1000;
  };

  const UploadFileFunction = async () => {
    if (imageTypes.length !== 3 || !Object?.keys(videoTypes).length) {
      Alert.alert(
        'File Upload',
        'You must select three good picture  and one video to upload',
      );
    } else {
      const formData = new FormData();

      formData.append('file[0]', {
        uri:
          Platform.OS === 'ios'
            ? imageTypes?.[0]?.uri?.replace('file://', '')
            : imageTypes?.[0]?.uri,
        type: imageTypes?.[0]?.type,

        name: imageTypes?.[0]?.fileName,
      });
      formData.append('file[1]', {
        //  uri: Platform.OS === 'ios' ? ? photo.uri.replace('file://', '') : photo.uri
        uri:
          Platform.OS === 'ios'
            ? imageTypes?.[1]?.uri?.replace('file://', '')
            : imageTypes?.[1]?.uri,
        type: imageTypes?.[1]?.type,

        name: imageTypes?.[1]?.fileName,
      });
      formData.append('file[2]', {
        uri:
          Platform.OS === 'ios'
            ? imageTypes?.[2]?.uri?.replace('file://', '')
            : imageTypes?.[2]?.uri,
        type: imageTypes?.[2]?.type,

        name: imageTypes?.[2]?.fileName,
      });
      formData.append('file[3]', {
        uri: videoTypes[0]?.uri,
        type: videoTypes[0]?.type,
        name: videoTypes[0]?.fileName,
      });
      formData.append('path', 'item');
      dispatch(upLoadFileApi(formData, navigation));

      dispatch(
        updateImagePreView({
          payload: {
            imageTypes,
            videoTypes,
          },
        }),
      );
    }
  };

  const onSubmitUrl = () => {
    UploadFileFunction();
    // navigation.navigate("Additem4")
  };

  return (
    <View style={styles.container}>
      <AddItemHeader
        borderBottom={true}
        title="Add Item"
        rightComponent={true}
        rightText="3/4"
        fullBorderWidth={true}
        borderBottom1
        borderBottom2
         borderBottom3
        // borderBottom4
      />

      <ProgressIndicator visible={loading} />
      {/* <MessageModalComponent visible={true}/> */}
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: wp(30)}}>
        <View style={styles.subContainer}>
          <Text style={styles.addItem}>Media</Text>
          <Note
            width={410}
            height={hp(11)}
            //  width={(810)}
            // height={(106)}
            style={{
              alignSelf: 'center',
              marginLeft: -2,
            }}
          />
          {/* <Image source={BODY_IMAGE.note} style={styles.img} /> */}

          {imageTypes?.length > 0 ? (
            <View style={styles.modalBackground}>
              <Text numberOfLines={1} style={styles.item_name}>
                {item?.item_name}
              </Text>
              <Text
                style={[
                  styles.item_name,
                  {
                    bottom: 3,
                    fontFamily: FontFamily.regular,
                    color: COLOR.lightGrey,
                  },
                ]}>
                {getTotalFileSize(imageTypes).toFixed(2)}Mb
              </Text>
              <TouchableWithoutFeedback
                onPress={() => ImagePicker()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 10,
                  // borderWidth: 1,
                  width: wp(90),
                  // marginLeft: wp(4.5),
                }}>
                {imageTypes.map((item, index) => (
                  <Image
                    key={index}
                    source={{
                      uri: item.uri,
                    }}
                    style={styles.image}
                  />
                ))}
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <>
              <View style={styles.bodyImage}>
                <TouchableOpacity onPress={() => ImagePicker()}>
                  <Image source={BODY_IMAGE.fileUpload1} style={styles.file} />
                  {/* <Text numberOfLines={1} style={styles.item_name}>{item?.item_name}</Text> */}
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Video */}
          {Object.keys(videoTypes).length ? (
            //
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback onPress={() => VideoPicker()}>
                <Image
                  source={{uri: videoThumbNail?.path}}
                  style={styles.videoType}
                />
                <Text
                  style={[
                    styles.item_name,
                    {
                      bottom: 25,
                      fontFamily: FontFamily.regular,
                      color: COLOR.lightGrey,
                      padding: 0,
                    },
                  ]}>
                  {getTotalFileSize(videoTypes).toFixed(2)}Mb
                </Text>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <>
              <TouchableWithoutFeedback
                style={styles.bodyImage}
                onPress={() => VideoPicker()}>
                <View>
                  <Image source={BODY_IMAGE.fileUpload2} style={styles.file} />
                </View>
              </TouchableWithoutFeedback>
            </>
          )}

          <View></View>

          <Spacer height={50}/>

          <View style={styles.btn}>
            <PrimaryButton
            onPress={()=>onSubmitUrl()}
            text='Next'
              backgroundColor={
                imageTypes.length !== 3 || !Object.keys(videoTypes).length
                  ? COLOR.lightgrey2
                  : COLOR.mainColor
              }
              color={
                imageTypes.length !== 3 || !Object.keys(videoTypes).length
                  ? COLOR.lightgrey3
                  : COLOR.white
              }
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditItem3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  addItem: {
    color: COLOR.black,
    fontWeight: 'bold',
    marginVertical: hp(2),
    marginLeft: 23,
    fontSize: wp(4.5),
    paddingTop: 30,
  },
  headerComponent: {
    // paddingLeft:-100
    paddingTop: hp(2),
    paddingLeft: wp(-4),
  },
  subContainer: {
    // paddingLeft: wp(1),
    // marginTop: hp(-2.6),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.0,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLOR.lightBlue,
    width: '90%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  FormInput: {
    paddingTop: hp(4),
    paddingBottom: 50,
  },
  img: {
    alignSelf: 'center',
    marginVertical: 10,
    resizeMode: 'cover',
    width: '92%',
    borderRadius: 10,
  },
  bodyImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn: {
    // paddingTop: hp(20),
    marginLeft: 25,
    width: '90%',
  },
  image: {
    width: wp(24),
    height: hp(14),
    // maxWidth: wp(30),
    color: 'black',
    resizeMode: 'stretch',
    borderRadius: 4,
    // paddingLeft:130
  },
  videoType: {
    width: wp(80),
    height: hp(20),
    resizeMode: 'cover',
    borderRadius: 10,

    maxWidth: wp(96),
    marginVertical: 50,
  },
  file: {
    width: wp(90),
    resizeMode: 'stretch',
  },
  header: {
    alignSelf: 'center',
    height: hp(9),
    width: '89%',
    //  marginLeft:wp(11)
    // position:'absolute',
    // marginTop:hp(4)
  },
  item_name: {
    fontFamily: FontFamily.bold,
    color: COLOR.black,
    position: 'absolute',
    zIndex: 100,
    bottom: hp(2.5),
    left: wp(4),
  },
  modalBackground: {
    backgroundColor: 'white', // semi-transparent background color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // elevation for shadow effect
    borderRadius: 10,
    width: wp(90),
    height: hp(27),
    alignSelf: 'center',
    marginVertical: 10,
    padding: 35,
  },
  modalContainer: {
    backgroundColor: 'green', // color of the modal
    borderRadius: 10,
    width: '80%', // adjust width as needed,
  },
});
