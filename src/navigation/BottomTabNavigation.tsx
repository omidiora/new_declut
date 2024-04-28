import HomeNavigation from './HomeNavigation';
import SearchScreen from '../screens/Search/SearchScreen';
import {useTheme} from '@react-navigation/native';
import HomeIcon from '../assets/images/home.svg';
import SearchedIcon from '../assets/images/search-normal.svg';
import SearchIcon from '../assets/images/search.svg';

import NavIcon from '../assets/images/nav.svg';
import {View} from '../screens/Home/component';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import OrderNavigation from './OrderNavigation';
import ClockIcon from '../assets/images/clock.svg';
import ClockedIcon from '../assets/images/clocked.svg';
import PersonedIcon from '../assets/images/personed.svg';
import PersonIcon from '../assets/images/person.svg';
import ProfileNavigation from './ProfileNavigaton';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={'#02A89E'}
      inactiveColor={'black'}
      theme={theme}
      barStyle={{
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 5,
        paddingHorizontal: 12,
        paddingTop: 12,
        height: 80,
        borderColor: 'lightgrey',
        marginHorizontal: 5,
        position: 'absolute',
        borderTopWidth: 1,
      }}>
      <Tab.Screen
        options={{
          //   headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <>
                <NavIcon />
              </>
            ) : (
              <>
                <HomeIcon />
              </>
            ),
        }}
        name="Home"
        component={HomeNavigation}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          //   headerShown: false,
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <>
                <SearchedIcon />
              </>
            ) : (
              <>
                <SearchIcon style={{color: '#101828'}} />
              </>
            ),
        }}
      />

      <Tab.Screen
        name="History"
        component={OrderNavigation}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <>
                <ClockedIcon />
              </>
            ) : (
              <>
                <ClockIcon style={{color: '#101828'}} />
              </>
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <>
                <PersonedIcon />
              </>
            ) : (
              <>
                <PersonIcon/>
              </>
            ),

          // <PersonIcon
          //   style={{color: focused ? COLOR.mainColor : COLOR.black}}
          // />
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
