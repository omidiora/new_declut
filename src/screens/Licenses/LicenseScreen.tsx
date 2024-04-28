import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import HeaderComponent from '../../component/HeaderComponent';
import NumberCard from '../../old/component/NumberCard';
import {SIZES} from '../../utils/theme/theme';
import {WP, COLOR, FontFamily, HP} from '../../old/Util/Util';
import {TopHeader} from '../../component/view/headers/topHeader';
import {TopHeaderVariant} from '../../component/view/headers/topHeaderVariant';
import {Spacer, ViewContainer} from '../../component/view';
import {BoldText, SemiBoldText, fontSize} from '../../utils/text';
import {useTheme} from '@react-navigation/native';

const LicenseScreen = ({number = 1}: number) => {
  const {colors} = useTheme();

  return (
    <View style={styles.LincenseContainer}>
      <View>
        <TopHeader title="License" titleTextStyle={{width: 1300}} />
        {/* <HeaderComponent title="License Agreement" rightComponent={' '} /> */}
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 140}}>
        <ViewContainer>
          <Spacer />
          <BoldText color={colors.darkBlack} fontSize={fontSize.xl}>
            License Agreement
          </BoldText>
          <Spacer height={30} />
          <SemiBoldText lineHeight={30}  color={colors.darkBlack} fontSize={fontSize.md}>
            Welcome to Declut!
          </SemiBoldText>
          <SemiBoldText color={colors.darkBlack}>
            Welcome to Declut! These terms outline the conditions under which
            you may access and use the Declut mobile application and related
            services. By using the app, you agree to abide by these terms. If
            you do not agree, please refrain from using the app.
          </SemiBoldText>
          <NumberCard
            number={''}
            title={'Introduction'}
            content={`This Mobile Application License Agreement (the "Agreement") is a legal contract between Declut ("we," "us," or "our") and you ("User" or "you"), the end-user of our mobile application ("App"). This Agreement governs your use of the App and related services provided by us.
          `}
          />
          <NumberCard
            number={'1.'}
            title={'Posting and Purchasing Used Household Items'}
            content={
              "The App allows users ('Sellers') to post their used household items for sale, and other users ('Buyers') to express interest, make payments, and arrange for inspections and purchases."
            }
          />
          <NumberCard
            number={'2.'}
            title={'Inspection and Transaction'}
            content={
              'Buyers must inspect the purchased items within 48 hours after making a payment. If the Buyer is unsatisfied upon inspection, they can request a full refund. If a Buyer cancels a transaction after payment without inspection, a 3% deduction will apply to the refund.'
            }
          />

          <NumberCard
            number={'3.'}
            title={'Transaction fees'}
            content={
              "For successful transactions, a service fee of 8% will be deducted from the Seller's payment."
            }
          />
          <View style={styles.title}>
            <SemiBoldText  fontSize={12} color='black'>Cancellation and Refunds</SemiBoldText>
            <NumberCard
              number={'1.'}
              title={'Refunds For Unsatisfactory Inspections'}
              content={
                'If a Buyer is unsatisfied upon inspection, a full refund will be issued to the Buyer within [specified timeframe].'
              }
            />
            <NumberCard
              number={'2.'}
              title={'Cancellation Fee'}
              content={
                'If a Buyer cancels a transaction after payment without inspection, a 3% cancellation fee will be deducted from the refund.'
              }
            />
          </View>

          <View style={styles.title}>
            <SemiBoldText color='black' fontSize={12}>Cancellation and Refunds</SemiBoldText>
            <NumberCard
              number={'1.'}
              title={'Refunds For Unsatisfactory Inspections'}
              content={
                'If a Buyer is unsatisfied upon inspection, a full refund will be issued to the Buyer within [specified timeframe].'
              }
            />
            <NumberCard
              number={'2.'}
              title={'Cancellation Fee'}
              content={
                'If a Buyer cancels a transaction after payment without inspection, a 3% cancellation fee will be deducted from the refund.'
              }
            />
          </View>

          <View style={styles.title}>
            <SemiBoldText color='black' fontSize={12}>Transaction Payments</SemiBoldText>
            <NumberCard
              number={'1.'}
              title={'Seller Payments'}
              content={
                'Sellers will receive their payments for successful transactions, minus an 8% service fee.'
              }
            />
            <NumberCard
              number={'2.'}
              title={'Buyer Refunds'}
              content={
                'Refunds to Buyers, as per the terms of this Agreement, will be processed within 5 - 10 minutes.'
              }
            />
          </View>

          <View style={styles.title}>
            <SemiBoldText color='black' fontSize={12}>Intellectual Property</SemiBoldText>
            <NumberCard
              number={'1.'}
              title={'Ownership'}
              content={
                'All intellectual property rights related to the App, including but not limited to copyrights, trademarks, and trade secrets, are owned by Declut.'
              }
            />
            <NumberCard
              number={'2.'}
              title={'User Restrictions'}
              content={
                'Users are prohibited from modifying, reproducing, or distributing any content from the App without our prior written consent.'
              }
            />
          </View>

          <View style={styles.title}>
            <SemiBoldText color='black' fontSize={12}>Governing Law</SemiBoldText>
            <NumberCard
              number={'1.'}
              title={'Ownership'}
              content={
                'All intellectual property rights related to the App, including but not limited to copyrights, trademarks, and trade secrets, are owned by Declut.'
              }
            />
            <NumberCard
              number={'2.'}
              title={'User Restrictions'}
              content={`This Agreement shall be governed by and interpreted in accordance with the laws of Nigeria, without regard to its conflict of law principles. \n 
        `}
            />
            <NumberCard
              number={''}
              title={' Contact'}
              content={`Contact Information, For any inquiries or concerns regarding this Agreement, please contact us at Declut@vereinigt.org
`}
            />
          </View>
        </ViewContainer>
      </ScrollView>
    </View>
  );
};

export default LicenseScreen;

const styles = StyleSheet.create({
  welcome: {
    color: COLOR.black,
    fontFamily: FontFamily.bold,
    fontSize: WP(7),
  },
  LincenseContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  subContent: {
    margin: 10,
  },
  title: {
    marginVertical: 10,
  },
  titleText: {
    fontSize: HP(2),
    color: COLOR.black,
    // fontWeight: 'bold',
    fontFamily: FontFamily.black,
  },
  subTitle: {
    fontSize: HP(1.5),
    color: COLOR.black,
  },
  content: {
    paddingTop: HP(1),
    color: COLOR.black,
    fontFamily: FontFamily.medium,
  },
  header: {
    paddingLeft: SIZES.width / 20,
    paddingTop: 10,
  },
});
