import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Coffee, Price } from "../../@types/coffee";
import { NativeStackParamList } from "../../@types/stack";
import ImageBackgroundInfo from "../../components/ImageBackgroundInfo";
import PaymentFooter from "../../components/PaymentFooter";
import BeansData from "../../data/BeansData";
import CoffeeData from "../../data/CoffeeData";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../theme/theme";

const Details = () => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<NativeStackParamList, "Details">>();
  const { id, type } = route.params;

  const cofeeAndBeans: Coffee | undefined =
    type === "Coffee"
      ? CoffeeData.find((item: Coffee) => item.type === type && item.id === id)
      : BeansData.find(
          (item: Coffee) => item.type === type && item.id === id
        ) || undefined;

  const navigation = useNavigation();
  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(cofeeAndBeans?.prices[0]);
  const [refreshing, setRefreshing] = useState(false);

  const backHandler = () => {
    navigation.goBack();
  };

  const toggleFavourite = () => {
    console.log("Fev");
  };

  const addToCarthandler = (coffeeData: Coffee, price: Price | undefined) => {
    const cartItem = {
      id: coffeeData.id,
      name: coffeeData.name,
      price: price,
      quantity: 1,
      index: coffeeData.index,
      roasted: coffeeData.roasted,
      imagelink_square: coffeeData.imagelink_square,
      special_ingredient: coffeeData.special_ingredient,
      type: coffeeData.type,
    };
    console.log("ADD TO CAARTT", cartItem);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!cofeeAndBeans) {
    return <View>Error: Coffee or Beans not found</View>;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primaryWhiteHex}
            />
          }
        >
          <ImageBackgroundInfo
            EnableBackHandler={true}
            data={cofeeAndBeans}
            backHandler={backHandler}
            toggleFavourite={toggleFavourite}
          />

          <View style={styles.FooterInfoArea}>
            <Text style={styles.InfoTitle}>Description</Text>
            {fullDesc ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  setFullDesc((prev) => !prev);
                }}
              >
                <Text style={styles.DescriptionText}>
                  {cofeeAndBeans?.description}
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setFullDesc((prev) => !prev);
                }}
              >
                <Text numberOfLines={3} style={styles.DescriptionText}>
                  {cofeeAndBeans?.description}
                </Text>
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.InfoTitle}>Size</Text>
            <View style={styles.SizeOuterContainer}>
              {cofeeAndBeans?.prices.map((data: Price) => (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => {
                    setPrice(data);
                  }}
                  style={[
                    styles.SizeBox,
                    {
                      borderColor:
                        data.size == price?.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize:
                          cofeeAndBeans.type == "Bean"
                            ? FONTSIZE.size_14
                            : FONTSIZE.size_16,
                        color:
                          data.size == price?.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.secondaryLightGreyHex,
                      },
                    ]}
                  >
                    {data.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <PaymentFooter
            price={price}
            buttonTitle="Add to Cart"
            buttonPressHandler={() => {
              addToCarthandler(cofeeAndBeans, price);
            }}
          />
        </ScrollView>
      </View>
    );
  }
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
