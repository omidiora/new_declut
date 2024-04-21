import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ViewContainer from '../../../component/ViewContainer';
import HeaderComponent from '../../../component/HeaderComponent';
import EmailInfo from '../../../assets/images/svg/emailsetting.svg';
import {COLOR, FontFamily, HP, WP} from '../../../Util/Util';
import ON from '../../../assets/images/svg/ON.svg';
import OF from '../../../assets/images/svg/OFF.svg';
import Push from '../../../assets/images/svg/push.svg';
import {SIZES} from '../../../Util/theme';

const PushNotificationSetting = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const Settings = [
    {
      id: 1,
      name: 'New products',
    },
    // {
    //   id: 2,
    //   name: 'New messages',
    // },
    // {
    //   id: 3,
    //   name: 'Interests',
    // },
    {
      id: 4,
      name: 'In-app vibrations',
    },
    {
      id: 5,
      name: 'In-app sounds',
    },
  ];

  const toggleItem = id => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(itemId => itemId !== id)
        : [...prevSelectedIds, id],
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.white}}>
      <View style={{paddingLeft: SIZES.width / 17}}>
        <HeaderComponent
          title="Push notifications"
          rightComponent={true}
          rightText={' '}
        />
      </View>

      <View style={styles.content}>
        <View style={{height: 210, marginTop: HP(-8)}}>
          <EmailInfo width={SIZES.width / 1.1} height={300} />
        </View>
        <ScrollView>
          {Settings.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => toggleItem(item.id)}
                style={{marginTop: HP(1), marginRight: 5}}>
                {selectedIds.includes(item.id) ? <ON /> : <OF />}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PushNotificationSetting;

const styles = StyleSheet.create({
  name: {
    fontFamily: FontFamily.medium,
    color: COLOR.grey,
    marginVertical: WP(5),
    fontSize: WP(4),
  },
  content: {
    paddingHorizontal: WP(4.5),
  },
});
