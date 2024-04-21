import React, { useState } from 'react';
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
import { COLOR, FontFamily, HP, WP } from '../../../Util/Util';
import ON from '../../../assets/images/svg/ON.svg';
import OF from '../../../assets/images/svg/OFF.svg';
import Push from '../../../assets/images/svg/push.svg';
import Arrow from '../../../assets/images/svg/rightArrow.svg';
const HelpScreenSetting = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const Settings = [
    {
      id: 1,
      name: 'A guide to Declut',
    },
    {
      id: 2,
      name: 'Troubleshooting',
    },
    {
      id: 3,
      name: 'Security & privacy',
    },
    {
      id: 4,
      name: 'In-app vibrations',
    },
    {
      id: 5,
      name: 'Safety & Reporting',
    },
  ];

  const toggleItem = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((itemId) => itemId !== id)
        : [...prevSelectedIds, id]
    );
  };

  
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.white }}>
      <View style={styles.content}>
      <HeaderComponent title="Help & Support" rightComponent={true} rightText={' '} />
         <View style={{ height: 210 ,marginTop:HP(-8) }}>
          <EmailInfo width={400} height={300} />
        </View>
        <ScrollView>
          {Settings.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop:20
                
              }}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity onPress={()=>{}} style={styles.arrow}>
              <Arrow/>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HelpScreenSetting;

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
  arrow:{
    marginTop:HP(2),
    right:6
  }
});
