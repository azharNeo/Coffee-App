import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Coffee } from "../../@types/coffee";
import CoffeeCard from "../../components/CoffeeCard/CoffeeCard";
import CustomIcon from "../../components/CustomIcon";
import Header from "../../components/Header/Header";
import BeansData from "../../data/BeansData";
import CoffeeData from "../../data/CoffeeData";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../theme/theme";

/**
 *
 * @param data
 * @returns This Function Retun categary Array [
  'All',
  'Americano',
  'Black Coffee',
  'Cappucchino',
  'Espresso',
  'Latte',
  'Macchiato'
]
 */

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};

/**
 *
 * @param category
 * @param data
 * @returns This Function Retun array of objects based on their categary
 */

const getCoffeeList = (category: string, data: Coffee[]): Coffee[] => {
  if (category === "All") {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name === category);
    return coffeelist;
  }
};

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const categories = getCategoriesFromData(CoffeeData);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState<Coffee[]>(
    getCoffeeList(categoryIndex.category, CoffeeData)
  );
  const [refreshing, setRefreshing] = useState(false);
  const handleList = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search !== "") {
      handleList();
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeData.filter((item: Coffee) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    setSearchText("");
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee(CoffeeData);
  };

  const renderItemCofee = (props: ListRenderItemInfo<Coffee>) => (
    <CoffeeItem {...props} navigation={navigation} />
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <View>
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
          {/* App Header */}
          <Header />

          <Text style={styles.ScreenTitle}>
            Find the best{"\n"}coffee for you
          </Text>

          {/* Search Input */}

          <View style={styles.InputContainerComponent}>
            <TouchableOpacity
              onPress={() => {
                searchCoffee(searchText);
              }}
            >
              <CustomIcon
                style={styles.InputIcon}
                name="search"
                size={FONTSIZE.size_18}
                color={
                  searchText.length > 0
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryLightGreyHex
                }
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Find Your Coffee..."
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                searchCoffee(text);
              }}
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.TextInputContainer}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  resetSearchCoffee();
                }}
              >
                <CustomIcon
                  style={styles.InputIcon}
                  name="close"
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryLightGreyHex}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Categary Scroll */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}
          >
            {categories.map((data, index) => (
              <View
                key={index.toString()}
                style={styles.CategoryScrollViewContainer}
              >
                <TouchableOpacity
                  style={styles.CategoryScrollViewItem}
                  onPress={() => {
                    handleList();
                    setCategoryIndex({
                      index: index,
                      category: categories[index],
                    });
                    setSortedCoffee(
                      getCoffeeList(categories[index], CoffeeData)
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.CategoryText,
                      categoryIndex.index === index && {
                        color: COLORS.primaryOrangeHex,
                      },
                    ]}
                  >
                    {data}
                  </Text>
                  {categoryIndex.index === index && (
                    <View style={styles.ActiveCategory} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Coffee Flatlist Start */}

          <FlatList
            ref={ListRef}
            horizontal
            ListEmptyComponent={
              <View style={styles.EmptyListContainer}>
                <Text style={styles.CategoryText}>Uh-oh!</Text>
                <Text style={styles.CategoryText}>
                  No result for {searchText} in Delivery. Please try something
                  else.
                </Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            contentContainerStyle={styles.FlatListContainer}
            keyExtractor={(item) => item.id}
            renderItem={renderItemCofee}
          />
          {/* Cofee Flatlist End */}

          <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

          <FlatList
            horizontal
            ListEmptyComponent={
              <View style={styles.EmptyListContainer}>
                <Text style={styles.CategoryText}>No Beans Available</Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
            data={BeansData}
            contentContainerStyle={[
              styles.FlatListContainer,
              { marginBottom: tabBarHeight },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={renderItemCofee}
          />
        </ScrollView>
      </View>
    </View>
  );
};

type CoffeeItemProps = {
  item: Coffee;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const CoffeeItem = ({ item, navigation }: CoffeeItemProps) => {
  const navigateToDetails = useCallback(() => {
    navigation.navigate("Details", {
      id: item.id,
    });
  }, [item.id, navigation]);

  return (
    <TouchableOpacity onPress={navigateToDetails}>
      <CoffeeCard item={{ ...item }} />
    </TouchableOpacity>
  );
};

export default Home;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    marginTop: SPACING.space_10,
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: "center",
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_2,
    width: "100%",
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_36 * 1.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});
