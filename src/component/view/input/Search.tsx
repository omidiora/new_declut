import React, { useState } from 'react';
import styled from '@emotion/native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { CompositeNavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { fontPixel, heightPixel, widthPixel } from '../../../utils/theme/pxToDpConvert';
import { TextInput } from '.';
import { font } from '../../../utils/theme/fonts';
import { SemiBoldText } from '../../../utils/text';

export const Header = styled.View<{ backgroundColor: string }>(
  ({ backgroundColor }) => ({
    width: '100%',
    paddingHorizontal: widthPixel(20),
    paddingVertical: heightPixel(10),
    backgroundColor,
    alignItems: 'center',
  })
);


export const SearchInput = styled(TextInput)({
  width: '100%',
  height: heightPixel(70),
  color:"black",
  fontFamily:font.bold
  
});



const SearchBar= () => {
  const { colors, dark } = useTheme();
  const {navigate} = useNavigation<any>()

  return (
    <Header backgroundColor={dark ? colors.background : colors.card}>
      <SearchInput
        placeholder="Search username, products, e.t.c "
        editable={false}
        onPressIn={() => navigate('Search')}
        // onChangeText={onChangeText}
        containerStyle={{
          backgroundColor: 'transparent',
        
        }}
        style={{backgroundColor:"transparent"}}
        leftIcon={
          <Ionicons
            name="search-outline"
            size={fontPixel(15)}
            color="#000000"
            style={{ marginRight: widthPixel(10) }}
          />
        }
      />
    
    </Header>
  );
};

export default SearchBar;
