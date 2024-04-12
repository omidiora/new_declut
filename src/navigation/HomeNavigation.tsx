import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image} from 'react-native';
import {wp} from '../utils/general';
import {useTheme} from '@react-navigation/native';
import AllItem from '../screens/Home/AllItem';
import Post from '../screens/Home/Post';
import Logo from '../assets/images/logo.svg';
import MyPost from '../screens/Home/MyPost';

const Tab = createMaterialTopTabNavigator();
const HomeNavigation = () => {
  const [showImage, setShowImage] = React.useState(true);
  const {colors} = useTheme();

  function handleScroll(event) {
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y > 0) {
      setShowImage(false); // Scroll down, hide image
    } else {
      setShowImage(true); // Scroll up, show image
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <StatusBar backgroundColor={colors.bgColor} barStyle={'dark-content'} />
      {showImage && (
        <View
          style={{
            backgroundColor: colors.bgColor,
            alignSelf:'center',
            paddingTop:15
          }}>
          <Logo />
        </View>
      )}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontWeight: 'bold',}, 
          tabBarStyle: {backgroundColor: colors.bgColor},
          tabBarIndicatorStyle: {
            backgroundColor: colors.mainColor,
            width: '20%',
            marginLeft: wp(15),
          },
          tabBarActiveTintColor: '#101828',
          tabBarInactiveTintColor: '#667085', 
        }}>
        <Tab.Screen name="All items">
          {props => <AllItem {...props} onScroll={handleScroll} />}
        </Tab.Screen>
        <Tab.Screen name="My Posts" component={MyPost} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
