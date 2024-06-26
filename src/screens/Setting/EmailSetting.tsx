import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmailInfo from '../../assets/images/svg/emailsetting.svg';
import ON from '../../assets/images/svg/ON.svg';
import OF from '../../assets/images/svg/OFF.svg';
import { SIZES , } from '../../utils/theme/theme';
import { COLOR ,FontFamily, HP, WP } from '../../old/Util/Util';
import HeaderComponent from '../../old/component/HeaderComponent';
import { Spacer } from '../../component/view';

const EmailSetting = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const Settings = [
    {
      id: 1,
      name: 'New products',
    },
    {
      id: 2,
      name: 'New messages',
    },
    // {
    //   id: 3,
    //   name: 'Interests',
    // },
    // {
    //   id: 4,
    //   name: 'Promotions',
    // },
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
      <View style={{marginLeft: SIZES.width / 17,}}>
        <Spacer height={30}/>
        <HeaderComponent title="Email" rightComponent={true} rightText={' '} />
      </View>
      <View style={styles.content}>
        <View style={{marginLeft: 10}}></View>
        <View style={{height: 210, marginTop: HP(-15)}}>
          <EmailInfo width={SIZES.width / 1.1} height={300} />
        </View>
        <Spacer/>
        <View>
          {Settings.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginTop: 10,
              }}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => toggleItem(item.id)}
                style={{marginTop: HP(1), marginRight: 5}}>
                {selectedIds.includes(item.id) ? <ON /> : <OF />}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EmailSetting;

const styles = StyleSheet.create({
  name: {
    fontFamily: FontFamily.medium,
    color: COLOR.grey,
    marginVertical: WP(5),
    fontSize: WP(4),
  },
  content: {
    paddingHorizontal: WP(4.5),
    marginTop: HP(5),
  },
});
