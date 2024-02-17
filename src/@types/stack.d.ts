declare global {
  namespace ReactNavigation {
    interface RootParamList extends NativeStackParamList {}
  }
}

export type DetailsParamsList = {id: number | string};

export type NativeStackParamList = {
  Tab: undefined;
  Home: undefined;
  Payment: undefined;
  Details: DetailsParamsList;
};
