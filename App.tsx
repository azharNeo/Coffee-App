import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import RooNavigation from './src';
import {store} from './src/redux/store';
import {Container} from './src/theme/theme';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={Container}>
          <RooNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
