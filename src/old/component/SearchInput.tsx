import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {LocalStorage} from '../Util/Storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const SearchInput = ({
  title,
  placeholder,
  onChangeText,
  onSubmitEditing,
  showSearchTitle,
  cancel
}) => {
  const [text, setText] = React.useState<string>('');
  const [showCancel, setshowCancel] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = React.useState<any[]>([]);

  const onSearch = () => {
    const Recent_Search = LocalStorage.getString('recent_search');
    setVehicleData(old => [...vehicleData, text]);
    //
    // const userObject = JSON.parse(Search_List);
    // console.log(userObject, 'user');
    if (Recent_Search?.length == 0) {
      LocalStorage.set('recent_searchs', JSON.stringify(vehicleData));
    } else {
      const Search_List = LocalStorage.getString('recent_searchs') || []; // { 'username': 'Marc', 'age': 21 }
      console.log(JSON.parse(Search_List.push(text)), 'ada');
      // setVehicleData(old => [...Search_List, text]);
      //
      // LocalStorage.set('recent_searchs', JSON.stringify(Search_List));
      // console.log(JSON.parse(Search_List), '111');
      // sectionWithLimitItems.push(...Search_List, text);
      // console.log(sectionWithLimitItems, 'admakl');
      // LocalStorage.set('recent_search', JSON.stringify(sectionWithLimitItems));
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{marginTop: HP(5), marginLeft: WP(5)}}>
      {(cancel && !showCancel) && (
        <View style={{marginLeft: WP(-3)}}>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: FontFamily.bold,
              color: COLOR.black,
              marginLeft: WP(-15),
              marginVertical: 10,
            }}>
            Search
          </Text>
        </View>
      )}

      <View style={[[styles.flexDirection, {justifyContent: 'space-between'}]]}>
        <View style={styles.flexDirection}>
          <View style={styles.searchIcon}>
            <EvilIcons
              name="search"
              size={25}
              style={styles.icon}
              color={'black'}
            />
          </View>
          <TextInput
            // value={text}
            placeholder={placeholder}
            style={[
              styles.input,
              showCancel && {marginLeft: WP(-1), width: WP(80)},
            ]}
            autoCapitalize="none"
            onChangeText={onChangeText}
            onFocus={() => setshowCancel(true)}
            onSubmitEditing={() => onSubmitEditing()}
            returnKeyType="search"
            clearButtonMode="while-editing"
            onBlur={() => setshowCancel(false)}
          />
        </View>

        {(cancel && showCancel) && (
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => {
              setText('');
              setshowCancel(false);
              // navigation.goBack();
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  input: {
    borderWidth: 0.7,
    width: WP(90),
    borderRadius: WP(3),
    borderColor: 'grey',
    // marginVertical: 10,
    paddingLeft: 50,
    // marginLeft: WP(-3),
    height: HP(6.3),
    backgroundColor: '#E4E7EC',
    // zIndex:100
  },
  searchIcon: {
    position: 'absolute',
    marginLeft: WP(2),
    top: HP(2.5),
    // maxWidth:WP(2)
  },
  cancel: {
    paddingTop: HP(2),
    marginLeft: WP(7),
  },
  cancelText: {
    fontWeight: 'bold',
    paddingLeft: WP(-7),
    fontSize: WP(3.4),
    color: COLOR.black,
    // marginLeft:10
  },
  cross: {
    position: 'absolute',
    top: 30,
    // right: WP(15),
    paddingLeft: 11,
  },
  searchText: {
    fontSize: WP(4.5),
    fontWeight: 'bold',
    color: COLOR.black,
    marginVertical: 10,
  },
  icon: {
    marginTop: -4,
    zIndex: 100,
    color: COLOR.black,
  },
});
