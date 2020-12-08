import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import Splash from './screens/Splash';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/LogIn';
import Register from './screens/Register';

const Stack = createStackNavigator();

const authRouter = () => (
    <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
    </Stack.Navigator>
);

const loginOrProfile = createSwitchNavigator({ 
    Profile: Profile, 
    Auth: authRouter 
}, { initialRouteName: 'Auth' });

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
        <Tab.Navigator tabBarOptions={{ showLabel: false }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Feed': {
                            iconName = focused ? 'home' : 'home';
                            break;
                        }
                        case 'AddPhoto': {
                            iconName = focused ? 'camera' : 'camera';
                            break;
                        }
                        case 'Profile': {
                            iconName = focused ? 'user' : 'user';
                            break;
                        }
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                }
        })}>
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="AddPhoto" component={AddPhoto} />
            <Tab.Screen name="Profile" component={loginOrProfile} />
        </Tab.Navigator>
);

const MainNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="App" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default MainNavigator;