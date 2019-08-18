import React from 'react';
import {createAppContainer} from 'react-navigation';
import {AppNavigator} from './src/services/navigation/appNavigator';
import getStore from './src/store';
import * as NavigationService from './src/services/navigation/navigationService';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

const AppContainer = createAppContainer(AppNavigator);
const store = getStore();

export default App = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </PaperProvider>
        </Provider>
    );
};