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
import { hp, wp } from '../../utils/general';

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
        backgroundColor: 'white', // Semi-transparent black background
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <View style={{marginLeft: wp(5), marginTop: hp(2)}}>
          {/* <HeaderComponent
            title={componentTitle ? componentTitle : 'Locations'}
            rightComponent={true}
            rightText={' '}
            rightFunc={() => setVisible(false)}
            leftFunc={() => setVisible(false)}
          /> */}
        </View>

        {!hideSearch && (
          <View style={{marginLeft: wp(10)}}>
            {/* <SearchInput
              showSearchTitle={true}
              placeholder={'Search Location'}
              onChangeText={handleSearch}
            /> */}
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

const ModalDropdown = ({
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
  setVisible,
}) => {
  const [title, setTitle] = useState('');

  return (
    <View style={{flex: 1, paddingBottom: 4, backgroundColor: 'white'}}>
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
          marginVertical: 20,
          color:'black',
          marginLeft: -2,
          fontSize:300

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
        <View style={{marginTop: hp(0.8)}}>
          {title == '' ? (
            <Text style={[styles.text, {backgroundColor: backgroundColor}]}>
              {placeholder}
            </Text>
          ) : (
            <Text style={styles.text2}>{title}</Text>
          )}
        </View>

        <View style={styles.icon}>
          {loading1 ? (
            <ActivityIndicator color={'green'} />
          ) : (
            <Entypo name="chevron-right" size={20} color={'black'} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={{color: 'red'}}>{error}</Text>
    </View>
  );
};

export default ModalDropdown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#E4E7EC',
    height: hp(9),
    width: '100%',
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  icon: {
    marginTop: hp(3.3),
    right: 15,
    // marginLeft: wp(-30),
  },
  value: {
    color: 'black',
    marginLeft: wp(8),
    marginTop: hp(2),
    marginVertical: 10,
  },
  text: {
    padding: 20,
    color: 'grey',
    // fontSize: wp(3.5),
    zIndex: 500,
    backgroundColor: 'white',
  },
  text2: {
    color: 'black',
    fontWeight: 'bold',
    padding: 20,
    zIndex: 500,
    textAlign: 'center',
    fontSize: wp(3),
  },
});
