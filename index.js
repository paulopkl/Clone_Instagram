import React from 'react';
import { AppRegistry } from 'react-native';
import Navigator from './src/MenuNavigator';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { storeConfig } from './src/store/storeConfig';

const store = storeConfig();
const Redux = () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);