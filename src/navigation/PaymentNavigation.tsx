import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentInfo from '../screens/Payment/PaymentInfo';
import PaymentForm from '../screens/Payment/PaymentForm';
import ConfirmPayment from '../screens/Payment/ConfirmPayment';
const Stack = createNativeStackNavigator();

const PaymentNavigation = () => {
return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="PaymentForm" component={PaymentForm} />
        <Stack.Screen name="PaymentInfo" component={PaymentInfo} />

        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />

      {/* <Stack.Screen name="ConfirmPayment" component={ConfirmPayment}  */}
    </Stack.Navigator>
  );
};
export default PaymentNavigation;
