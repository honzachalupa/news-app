import { Context } from '@honzachalupa/helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ArticleDetailPage from './pages/ArticleDetail';
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

export interface IContext {
    unreadArticlesCount: number;
    updateContextProperty: (key: string, value: unknown) => void;
}

const App = () => {
    const colorScheme = useColorScheme();

    const [context, setContext] = useState<IContext>({
        unreadArticlesCount: 1,
        updateContextProperty: () => {}
    });

    const contextFunctions = {
        updateContextProperty: (key: string, value: unknown) => setContext((prevState: IContext) => ({
            ...prevState,
            [key]: value
        }))
    };

    return (
        <Context.Provider value={{ ...context, ...contextFunctions }}>
            <AppearanceProvider>
                <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen
                            name="Home"
                            options={{
                                title: 'Články'
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
                                            tabBarBadge: context.unreadArticlesCount,
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

                        <Stack.Screen
                            name="ArticleDetail"
                            component={ArticleDetailPage}
                            options={{
                                title: 'Detail'
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        </Context.Provider>
    );
};

export default App;
