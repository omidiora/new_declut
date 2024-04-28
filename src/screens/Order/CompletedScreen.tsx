import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BaseView, LineComponent} from '../Home/component';
import {HSpacer, Spacer, ViewContainer} from '../../component/view';
import {FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SIZES} from '../../utils/theme/theme';
import {
  NAIRA_SYSMBOL,
  ShowFourteenWords,
  currencyFormatter,
} from '../../utils/general';
import {BoldText, RegularText, SemiBoldText, fontSize} from '../../utils/text';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {
  orderHistoryApi,
  orderHistoryPendingApi,
} from '../../../redux/product/api';
import moment from 'moment';
import {color} from '@rneui/base';
import EmptyImage from '../../assets/images/empty.svg';


const PendingScreen = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {data, loading, error, orderHistory} = useAppSelector(
    state => state.product,
  );

  React.useEffect(() => {
    dispatch(orderHistoryApi('completed'));
  }, []);

  React.useEffect(() => {
    dispatch(orderHistoryPendingApi('pending'));
  }, []);
  return (
    <BaseView backgroundColor={colors.bgColor}>
      <ViewContainer>
        <Spacer height={30} />
        <FlatList
          // contentContainerStyle={{paddingTop:10}}
          data={orderHistory?.data?.data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            console.log(item),
            (
              <>
                <View
                  style={{
                    marginBottom: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View style={{left: 10}}>
                      <HSpacer />
                      <BoldText
                        color={colors.mediumGrey}
                        fontSize={fontSize.sm + 2}
                        lineHeight={21}>
                        <Text numberOfLines={0.1} style={{flexShrink: 1}}>
                          {ShowFourteenWords(item.item_name)}
                        </Text>
                      </BoldText>
                      <Spacer height={5} />
                      <BoldText
                        color={colors.darkBlack}
                        fontSize={14}
                        lineHeight={21}>
                        {NAIRA_SYSMBOL}
                        {item.price}
                      </BoldText>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Spacer height={10} />
                      <SemiBoldText
                        color={colors.secondaryBlack}
                        fontSize={fontSize.sm}
                        style={styles.day}>
                        Paid:{' '}
                        {moment(item.order?.updated_at).format(
                          'ddd, Do MMMM, YYYY',
                        )}
                        .
                      </SemiBoldText>
                    </View>
                  </View>
                  <View>
                    <SemiBoldText
                      fontSize={fontSize.sm + 2}
                      color={colors.secondaryBlack}>
                      {item?.order?.order_no}
                    </SemiBoldText>
                    <Spacer height={10} />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Rating', {
                          params: item,
                        })
                      }>
                      <RegularText fontSize={fontSize.sm} color={colors.orange}>
                        {'View Order'}
                      </RegularText>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{top: -30}}>
                  <LineComponent />
                </View>
              </>
            )
          )}
          ListEmptyComponent={() => (
            <>
              <View style={{alignSelf: 'center'}}>
                <EmptyImage height={350} />
                <SemiBoldText
                  fontSize={14}
                  textAlign="center"
                  color={colors.secondaryBlack}>
                  You have no completed order!!!
                </SemiBoldText>
              </View>
            </>
          )}
        />
      </ViewContainer>
    </BaseView>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({});
