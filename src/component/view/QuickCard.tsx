import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {HP, COLOR, WP} from '../../old/Util/Util';
import {Row, ViewContainer} from '.';
import {wp} from '../../utils/general';

interface QuickCardProps {
  image: React.ReactElement;
  subTitle: string;
}

const QuickCard = ({image, subTitle, onPress, url}: QuickCardProps) => {
  return (
    <Row
    onPress={onPress}
      style={{
        width: wp('30%'),
        height: HP(10),
        alignContent: 'center',
      }} >
      <View  style={{justifyContent:"center",alignItems:"center",paddingHorizontal:20}}>
        <Text>{image}</Text>
        <View>
          <Text style={styles.text}>{subTitle}</Text>
        </View>
      </View>
    </Row>
    // <TouchableOpacity
    //   onPress={onPress}
    //   style={{
    //     width: WP(22),
    //     marginLeft: 10,
    //     height: HP(10),
    //     paddingBottom: 12,
    //     paddingVertical:3
    //   }}>
    //   <View>
    //     <Text>{image}</Text>
    //   </View>
    //   {/* <Image source={image}  style={styles.image}/> */}
    //   <Text style={styles.text}>{subTitle}</Text>
    // </TouchableOpacity>
  );
};

export default QuickCard;

const styles = StyleSheet.create({
  //   card: {
  //     marginTop: HP(1),
  //     marginBottom: HP(3),
  //     marginHorizontal: WP(2),
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     flexWrap: 'wrap',
  //   },
  text: {
    fontWeight: 'bold',
    paddingTop: 2,
    color: COLOR.black,
    fontSize: HP(1.4),
    //
    textAlign: 'center',
    // marginLeft: -15,
    marginTop: 4,
    width: 70,
    alignSelf: 'center',
  },

  image: {
    alignSelf: 'center',
    width: WP(12),
    height: HP(8),
    // height:'25%',
    // resizeMode:'cover'
  },
});
