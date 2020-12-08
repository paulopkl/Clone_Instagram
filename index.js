import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { storeConfig } from './src/store/storeConfig';
import axios from 'axios';

import { API } from '@env';

axios.defaults.baseURL = API;

const store = storeConfig();
const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);