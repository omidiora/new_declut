import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from './component';
import {HSpacer, Spacer, ViewContainer} from '../../component/view';
import FastImage from 'react-native-fast-image';
import { SIZES } from '../../utils/theme/theme';
import { NAIRA_SYSMBOL, ShowFourteenWords } from '../../utils/general';
import { BoldText } from '../../utils/text';

const Post = ({data}) => {
  return (
    <View>
      <ViewContainer backgroundColor={colors.bgColor}>
        <View>
          <FlatList
            // contentContainerStyle={{paddingTop:10}}
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <View style={{marginBottom: 50, flexDirection: 'row'}}>
                  <FastImage
                    style={{
                      width: SIZES.width / 3,
                      height: 100,
                      marginHorizontal: 5,
                      borderRadius: 12,
                    }}
                    source={{
                      uri: 'https://unsplash.it/400/400?image=1',
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Spacer/>
                  <View>
                    <View style={{left: 10}}>
                      <HSpacer />
                      <BoldText
                        color={colors.mediumGrey}
                        fontSize={14}
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
                      <Spacer height={7} />
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <LocationIcon />
                        </View>
                        <BoldText fontSize={14} color={colors.mediumGrey}>
                          {item.area}
                        </BoldText>
                      </View>
                      <Spacer height={7} />
                      <View>
                        <SemiBoldText color="#A28300">
                          Posted
                          <SemiBoldText
                            lineHeight={15}
                            fontSize={10}
                            color="#A28300">
                            {' '}
                            {item.listed}
                          </SemiBoldText>
                        </SemiBoldText>
                      </View>
                    </View>
                  </View>
                  <HSpacer width={78} />
                  <TouchableOpacity
                    onPress={() => {
                      setproductId(item);
                      refRBSheet.current.open();
                    }}>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={25}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
            ListEmptyComponent={() => <></>}
          />
        </View>
      </ViewContainer>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
