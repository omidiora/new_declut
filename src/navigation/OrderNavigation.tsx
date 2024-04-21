import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import OrderHistoryComponent from '../component/OrderHistoryComponent';
import {useTheme} from '@react-navigation/native';
import PendingScreen from '../screens/Order/PendingScreen';
import CompletedScreen from '../screens/Order/CompletedScreen';
import { font } from '../utils/theme/fonts';

const Tab = createMaterialTopTabNavigator();
enum Status {
  Pending = 'pending',
  Completed = 'completed',
}

const OrderNavigation = () => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontFamily:font.semiBold,  },
          tabBarInactiveTintColor:colors.mediumGrey,
          tabBarActiveTintColor:colors.darkBlack,
          // tabBarStyle: { display: true },
          tabBarIndicatorStyle: {
            backgroundColor: colors.mainColor,
            // width: '20%',
            // marginLeft:WP(15)
          },
        }}>
        <Tab.Screen
          name="Pending"
          component={PendingScreen}
          initialParams={{status: Status.Pending}}
        />
        <Tab.Screen
          name="completed"
          component={CompletedScreen}
          initialParams={{status: Status.Completed}}
        />
      </Tab.Navigator>
    </View>
  );
};
export default OrderNavigation;
