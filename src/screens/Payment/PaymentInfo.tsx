import React, {useRef} from 'react';
import {LogBox, View} from 'react-native';
import {Paystack} from 'react-native-paystack-webview';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Warning: ViewPropTypes']);

const PaymentInfo = props => {
  const {navigate, goBack} = useNavigation();
  const {getItem, setItem} = useAsyncStorage('@declut');
  const [user, setUser] = React.useState({});


  const readItemFromStorage = async () => {
    const item = await getItem();
    setUser(JSON.parse(item));
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, []);


  return (
    <View style={{flex: 1}}>
      <Paystack
        paystackKey="pk_test_e5b13c56e9123a925fcd776a01c28cd000038ceb"
        // amount={props?.route?.params?.item?.item_amount}
        amount={props?.route?.params?.item?.item_amount}
        billingEmail={user?.email}
        activityIndicatorColor="green"
        onCancel={e => {
          goBack();
          // handle response here
        }}
        onSuccess={res => {
          navigate('Payment', {
            screen: 'ConfirmPayment',
            params: {
              item: props?.route?.params?.item,
              trx_ref: props?.route?.params?.item?.trx_ref,
            },
          });
          // handle response here
        }}
        refNumber={props?.route?.params?.item?.trx_ref}
        autoStart={true}
      />
    </View>
  );
};

export default PaymentInfo;
