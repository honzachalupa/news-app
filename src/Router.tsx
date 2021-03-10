import { Context } from '@honzachalupa/helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from './App';
import ArticleDetailPage from './pages/ArticleDetail';
import FeedArticlesListPage from './pages/FeedArticlesList';
import Homepage from './pages/Homepage';
import SavedArticlesListPage from './pages/SavedArticlesList';

const Router = () => {
    const { unreadArticlesCount } = useContext(Context) as IContext;

    const colorScheme = useColorScheme();
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const MyLightTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#FF0006',
        },
    };

    const MyDarkTheme = {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: '#FF0006',
        },
    };

    const theme = colorScheme === 'dark' ? MyDarkTheme : MyLightTheme;

    const getIcon = (routeName: string, isFocused: boolean) => {
        // Icons list: https://oblador.github.io/react-native-vector-icons/

        const icon =
            routeName === 'Articles' ?
                'file-tray-full' :
                routeName === 'ArticlesSaved' ?
                    'bookmarks' : '';

        return isFocused ? `ios-${icon}` : `ios-${icon}-outline`;
    };

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={{
                        title: '',
                        headerTransparent: true,
                        headerBackTitle: ' ',
                        headerTintColor: 'transparent'
                    }}
                >
                    {() => (
                        <Tab.Navigator
                            initialRouteName="Articles"
                            tabBarOptions={{
                                labelStyle: {
                                    fontSize: 13
                                },
                                activeTintColor: theme.colors.text,
                            }}
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => (
                                    <Ionicons
                                        name={getIcon(route.name, focused)}
                                        size={size}
                                        color={color}
                                    />
                                )
                            })}
                        >
                            <Tab.Screen
                                name="Articles"
                                component={Homepage}
                                options={{
                                    title: 'Vše',
                                    tabBarBadge: unreadArticlesCount,
                                    tabBarBadgeStyle: Platform.OS === 'ios' ? {
                                        paddingTop: 2
                                    } : null
                                }}
                            />

                            <Tab.Screen
                                name="ArticlesSaved"
                                component={SavedArticlesListPage}
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
                        title: '',
                        headerTransparent: true,
                        headerBackTitle: ' ',
                        headerTintColor: 'transparent'
                    }}
                />

                <Stack.Screen
                    name="FeedArticlesList"
                    component={FeedArticlesListPage}
                    options={{
                        title: '',
                        headerTransparent: true,
                        headerBackTitle: ' ',
                        headerTintColor: 'transparent'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
