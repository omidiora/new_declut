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
import {COLOR, FontFamily, HP, WP} from '../Util/Util';
import Feather from 'react-native-vector-icons/Feather';
import HeaderComponent from './HeaderComponent';
// import Modal from 'react-native-modal';
import SearchInput from './SearchInput';
import {StateInNigeria} from '../Util/StateAndLga';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import {font} from '../../utils/theme/fonts';
import {RFFontSize, fontSize} from '../../utils/text';

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
  focusToBold,
  searchPlaceholder,
  setAllItem,
}) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    const filtered = data.filter(
      item => item.value.toLowerCase().includes(text.toLowerCase()), // Adjust 'name' to the property you want to search
    );

    console.log('Filtered data:', filtered);
    setSearch(text);
    setFilteredData(filtered);
  };

  useFocusEffect(
    React.useCallback(() => {
      setFilteredData(data);
    }, [data]),
  );

  return (
    <Modal
      visible={visible}
      style={{
        flex: 1,
        backgroundColor: COLOR.white, // Semi-transparent black background
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
              placeholder={
                searchPlaceholder ? searchPlaceholder : 'Search Location'
              }
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

                  if (setAllItem) {
                    setAllItem(Item);
                  }
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
  focusToBold,
  searchPlaceholder,
  setAllItem,
}) => {
  const [title, setTitle] = useState('');

  return (
    <View style={{flex: 1, paddingBottom: 4, backgroundColor: COLOR.white}}>
      <ModalDisplay
        visible={visible}
        setVisible={setVisible}
        setTitle={setTitle}
        onPress={onPress}
        data={data}
        showLabel={showLabel}
        componentTitle={componentTitle}
        hideSearch={hideSearch}
        searchPlaceholder={searchPlaceholder}
        setAllItem={setAllItem}
      />
      <Text
        style={{
          // fontFamily: FontFamily.regular,
          // marginVertical: 5,
          // color: COLOR.black,
          marginLeft: 2,
          fontFamily: font.medium,
          fontWeight: '400',
          color: 'black',
          // right: 5,
          fontSize: fontSize.sm + 2,
          paddingBottom: 7,

          // marginTop:-5
        }}>
        {headerTitle} {required && '*'}
      </Text>
      <TouchableOpacity
        style={[
          styles.dropdown,
          backgroundColor && {backgroundColor: backgroundColor},
          error && {borderColor: 'red'},
        ]}
        onPress={() => setVisible(true)}>
        <View style={{marginTop: 4}}>
          {title == '' ? (
            <Text
              style={[
                styles.text,
                {backgroundColor: backgroundColor},
                focusToBold && {opacity: 4},
              ]}>
              {placeholder}
            </Text>
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

export default ModalDropdown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#E4E7EC',
    height: 58,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  icon: {
    marginTop: 20,
    right: 15,
    // marginLeft: WP(-30),
  },
  value: {
    color: COLOR.black,
    marginLeft: WP(5),
    marginTop: HP(2),
    fontFamily: FontFamily.bold,
    marginVertical: 10,
  },
  text: {
    color: COLOR.black,
    // fontWeight: 'bold',
    padding: 18,
    zIndex: 500,
    textAlign: 'center',
    // fontSize: WP(3),
    paddingTop: 22,

    lineHeight: RFFontSize.sm + 0.5,
    fontFamily: font.semiBold,
    fontSize: RFFontSize.sm,
    opacity: 0.45,
    paddingBottom: 7,
  },
  text2: {
    color: COLOR.black,
    fontWeight: 'bold',
    padding: 18,
    zIndex: 500,
    textAlign: 'center',
    fontSize: WP(3),
    paddingBottom: 7,
  },
});
