import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/LogIn';
import Register from './screens/Register';

const Stack = createStackNavigator();

const authRouter = () => (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
    </Stack.Navigator>
  );

const loginOrProfile = createSwitchNavigator({ 
    Profile: Profile, 
    Auth: authRouter 
}, { 
    initialRouteName: 'Auth' 
});

const Tab = createBottomTabNavigator();

const MenuNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{ showLabel: false }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home': {
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
                <Tab.Screen name="Home" component={Feed} />
                <Tab.Screen name="AddPhoto" component={AddPhoto} />
                <Tab.Screen name="Profile" component={loginOrProfile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MenuNavigator;