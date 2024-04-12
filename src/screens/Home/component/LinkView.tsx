import styled from '@emotion/native';
import React from 'react';
import { BoldText  ,} from '../../../utils/text';
import { fontPixel } from '../../../utils/theme/pxToDpConvert';
import { LinkImageContainer } from '.';
import { useTheme } from '@react-navigation/native';
type ILinkView = {
  image: React.ReactElement;
  text: string;
  textColor: string;
  onPress?: () => void;
};
const Link = styled.TouchableOpacity({
  alignItems: 'center'
});
const LinkText = styled(BoldText)({
  fontSize: fontPixel(12),
  lineHeight: fontPixel(14.63)
});

export const LinkView: React.FC<ILinkView> = ({
  image,
  text,
  textColor,
  onPress
}) => {
 const {colors}= useTheme();
  return (
    <Link onPress={onPress}>
      <LinkImageContainer>{image}</LinkImageContainer>
      <LinkText  color={colors.darkBlack}>{text}</LinkText>
    </Link>
  );
};
