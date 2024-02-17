import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BORDERRADIUS, SPACING} from '../../theme/theme';
import CustomIcon from '../CustomIcon';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor?: string;
}

const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_20,
    width: SPACING.space_20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});

export default BGIcon;
