import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {BODY_IMAGE, COLOR, FontFamily, HP, WP} from '../Util/Util';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../redux/hook';
import {confirmPaymentLoading} from '../redux/payment/api';
import style from '../Screen/Auth/ModalPickerImage/style';
import FormButton from './FormButton';

interface MessageModalComponent {
  text: string;
  visible: boolean;
  status: string;
  onPress:()=>void
}
const MessageModalComponent = ({
  text,
  visible,
  status,
  onPress,
}: MessageModalComponent) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Image source={BODY_IMAGE.circular} />
        <Text style={styles.success}>{text}</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={onPress}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MessageModalComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: HP(45),
    padding: 10,
    borderRadius: 10,
  },
  success: {
    textAlign: 'center',
    // fontWeight: 'bold',
    padding: 15,
    fontSize: WP(4),
    color: COLOR.mainBlack,
    fontFamily: FontFamily.medium,
  },
  congrat: {
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    marginTop: HP(2),
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    height: HP(5),
    paddingTop: 15,
    borderColor: '#D0D5DD',
  },
  close: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#667085',
  },
  closeBtn: {
    borderWidth: 1,
    padding: 10,
    width: WP(80),
    height: HP(7),
    borderRadius: 10,
    borderColor: '#D0D5DD',
  },
  text: {
    textAlign: 'center',
    color: COLOR.mainBlack,
    fontSize: WP(4),
    marginTop: 4,
  },
});
