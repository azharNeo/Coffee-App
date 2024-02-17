import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Coffee} from '../../@types/coffee';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import BGIcon from '../BGIcon/BGIcon';
import CustomIcon from '../CustomIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.75;
const CARD_HEIGHT = Dimensions.get('window').height * 0.16;

interface CoffeeCardProps {
  item: Coffee;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({item}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={item?.imagelink_square}
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{item?.average_rating}</Text>
        </View>
      </ImageBackground>
      <View style={styles.CardContentWrapper}>
        <View>
          <Text style={styles.CardTitle}>{item?.name}</Text>
          <Text style={styles.CardSubtitle}>{item?.special_ingredient}</Text>
        </View>
        <View style={styles.CardFooterRow}>
          <Text style={styles.CardPriceCurrency}>
            $ <Text style={styles.CardPrice}>{item.prices[2].price}</Text>
          </Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              console.log(item.id);
            }}>
            <BGIcon
              color={COLORS.primaryOrangeHex}
              name={'add'}
              size={FONTSIZE.size_10}
            />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>

          {/* <View style={styles.QuantyWrapper}>
            <TouchableOpacity
              onPress={() => {
                console.log('Dec');
              }}>
              <BGIcon
                color={COLORS.primaryWhiteHex}
                name={'minus'}
                BGColor={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_10}
              />
            </TouchableOpacity>
            <Text style={styles.CardSubtitle}>1</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('Inc');
              }}>
              <BGIcon
                color={COLORS.primaryWhiteHex}
                name={'add'}
                BGColor={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_10}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    flexDirection: 'row',
    gap: 20,
  },
  CardImageBG: {
    width: 100,
    height: '100%',
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardContentWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '54%',
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    marginBottom: SPACING.space_10,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    fontWeight: '500',
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_10,
    borderColor: COLORS.primaryOrangeHex,
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_2,
  },
  addBtnText: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  QuantyWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default CoffeeCard;
