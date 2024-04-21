import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
// import Modal from 'react-native-modal';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import HeaderComponent2 from '../HeaderComponent2';
import HeaderComponent from '../HeaderComponent';
import { WP ,COLOR, FontFamily, HP,} from '../../Util/Util';
import SearchInput from '../SearchInput';

const ModalDisplay = ({
  visible,
  setVisible,
  setTitle,
  onPress,
  data = [],
  showLabel,
  componentTitle,
  hideSearch,
  leftFunc,
}) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = data.filter(
      item => item.value.toLowerCase().includes(text.toLowerCase()), // Adjust 'name' to the property you want to search
    );
    setSearch(text);
    setFilteredData(filtered);
  };

  useFocusEffect(
    React.useCallback(() => {
      setFilteredData(data);
    }, [filteredData, data]),
  );

  return (
    <Modal
      visible={visible}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <View style={{marginLeft: WP(5), marginTop: HP(2)}}>
          <HeaderComponent
            title={componentTitle ? componentTitle : 'Locations'}
            rightComponent={true}
            rightText={' '}
            rightFunc={() => setVisible(false)}
            leftFunc={() => setVisible(false)}
          />
        </View>

        {!hideSearch && (
          <View style={{marginLeft: WP(10)}}>
            <SearchInput
              showSearchTitle={true}
              placeholder={'Search Location'}
              onChangeText={handleSearch}
            />
          </View>
        )}

        <ScrollView>
          {filteredData?.map((Item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={e => {
                  setTitle(showLabel ? Item.label : Item.value);
                  setVisible(false);
                  onPress(Item.value);
                }}>
                <Text style={styles.value}>
                  {showLabel ? Item.label : Item.value}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const ModalDropdownLga = ({
  captiton,
  onPress,
  data,
  error,
  placeholder,
  headerTitle,
  showLabel = false,
  componentTitle,
  backgroundColor,
  hideSearch,
  required,
  loading1,
  visible,
  setVisible
}) => {
  const [title, setTitle] = useState('');

  return (
    <View style={{flex: 1, paddingBottom: 4}}>
      <ModalDisplay
        visible={visible}
        setVisible={setVisible}
        setTitle={setTitle}
        onPress={onPress}
        data={data}
        showLabel={showLabel}
        componentTitle={componentTitle}
        hideSearch={hideSearch}
      />
      <Text
        style={{
          fontFamily: FontFamily.regular,
          marginVertical: 10,
          color: COLOR.black,
          marginLeft: 2,

          // marginTop:-5
        }}>
        {headerTitle} {required && '*'}
      </Text>
      <TouchableOpacity
        style={[
          styles.dropdown,
          backgroundColor && {backgroundColor: backgroundColor},
        ]}
        onPress={() => setVisible(true)}>
        <View style={{marginTop: HP(0.8)}}>
          {title == '' ? (
            <Text style={styles.text}>{placeholder}</Text>
          ) : (
            <Text style={styles.text2}>{title}</Text>
          )}
        </View>

        <View style={styles.icon}>
          {loading1 ? (
            <ActivityIndicator color={COLOR.mainColor} />
          ) : (
            <Entypo name="chevron-right" size={20} color={COLOR.black} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={{color: 'red'}}>{error}</Text>
    </View>
  );
};

export default ModalDropdownLga;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#E4E7EC',
    height: HP(9),
    width: '90%',
    borderRadius: WP(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  icon: {
    marginTop: HP(2.9),
    right: 15,
    // marginLeft: WP(-30),
  },
  value: {
    color: COLOR.black,
    marginLeft: WP(8),
    marginTop: HP(2),
    fontFamily: FontFamily.bold,
    marginVertical: 10,
  },
  text: {
    padding: 20,
    color: COLOR.lightGrey,
    fontFamily: FontFamily.regular,
    fontSize: WP(3),
    zIndex: 500,
  },
  text2: {
    color: COLOR.black,
    fontWeight: 'bold',
    padding: 20,
    zIndex: 500,
    textAlign: 'center',
    fontSize: WP(3),
  },
});
