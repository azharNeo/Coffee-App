import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackParamList } from "../../@types/stack";

const Details = () => {
  const route = useRoute<RouteProp<NativeStackParamList, "Details">>();
  const { id } = route.params;

  return (
    <SafeAreaView>
      <View>
        <Text>Details</Text>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
