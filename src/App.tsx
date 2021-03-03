import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from './pages/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getIcon = (routeName: string, isFocused: boolean) => {
    // Icons list: https://oblador.github.io/react-native-vector-icons/

    const icon =
        routeName === 'Articles' ?
            'file-tray-full' :
            routeName === 'ArticlesSave' ?
                'bookmarks' : '';

    return isFocused ? `ios-${icon}` : `ios-${icon}-outline`;
};

const App = () => (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={{
                        title: 'Všechny články'
                    }}
                >
                    {() => (
                        <Tab.Navigator
                            initialRouteName="Articles"
                            tabBarOptions={{
                                labelStyle: {
                                    fontSize: 13
                                }
                            }}
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => (
                                    <Ionicons
                                        name={getIcon(route.name, focused)}
                                        size={size}
                                        color={color}
                                    />
                                ),
                            })}
                        >
                            <Tab.Screen
                                name="Articles"
                                component={HomePage}
                                options={{
                                    title: 'Vše',
                                    tabBarBadge: 6,
                                    tabBarBadgeStyle: {
                                        paddingTop: 2
                                    }
                                }}
                            />

                            <Tab.Screen
                                name="ArticlesSave"
                                component={HomePage}
                                options={{
                                    title: 'Uložené'
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
);

export default App;
