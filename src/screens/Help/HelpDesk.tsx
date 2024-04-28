import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  BaseView,
  HSpacer,
  Row,
  Spacer,
  ViewContainer,
} from '../../component/view';
import {useTheme} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TopHeader} from '../../component/view/headers/topHeader';
import {MediumText} from '../../utils/text';

let IconSize = 25;
const ListOfData = [
  // {
  //   id: 1,
  //   name: 'Chat',
  //   icon: (
  //     <Ionicons
  //       name="chatbubble-ellipses-outline"
  //       size={IconSize}
  //       color={'#02A89E'}
  //     />
  //   ),
  // },
  {
    id: 2,
    name: 'Email',
    icon: <Feather name="mail" size={IconSize} color={'#02A89E'} />,
  },
  {
    id: 3,
    name: 'Whatsapp',
    icon: <FontAwesome name="whatsapp" size={IconSize} color={'#02A89E'} />,
  },
];

const HelpDesk = () => {
  const {colors} = useTheme();

  const openSupportEmail = () => {
    const email = 'support@declut.com.ng';
    const url = `mailto:${email}`; // Construct a simple mailto URL

    Linking.openURL(url);
  };
  const openWhatsappChat = async () => {
    const phoneNumber = '+23490160006032';
    const url = `whatsapp://send?phone=${phoneNumber}`; // WhatsApp deep link format

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('WhatsApp is not installed.');
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <BaseView
      backgroundColor={colors.background}
      focusBarStyle={'dark-content'}>
      <SafeAreaView>
        <TopHeader title="Help Desk" />
        <ViewContainer>
          <Spacer height={35} />
          {ListOfData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.name === 'Email') {
                  openSupportEmail();
                } else if (item.name == 'Whatsapp') {
                  openWhatsappChat();
                }
              }}>
              <Spacer height={20} />
              <Row disabled justifyContent="space-between">
                <Row
                  marginTop={3}
                  onPress={() => {
                    if (item.name === 'Email') {
                      openSupportEmail();
                    } else if (item.name == 'Whatsapp') {
                      openWhatsappChat();
                    }
                  }}>
                  {item.icon}
                  <HSpacer width={8} />
                  <MediumText
                    marginTop={5}
                    fontSize={14}
                    color={colors.secondaryBlack}>
                    {' '}
                    {item.name}
                  </MediumText>
                </Row>

                <MaterialIcons
                  name="arrow-forward-ios"
                  color={colors.mainColor}
                  size={20}
                />
              </Row>
              <Spacer height={20} />
            </TouchableOpacity>
          ))}
        </ViewContainer>
      </SafeAreaView>
    </BaseView>
  );
};

export default HelpDesk;

const styles = StyleSheet.create({});
