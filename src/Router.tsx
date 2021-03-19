import { Context } from '@honzachalupa/helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from './App';
import { useCustomTheme } from './helpers/theme';
import ArticleDetailPage from './pages/ArticleDetail';
import FeedArticlesListPage from './pages/FeedArticlesList';
import Homepage from './pages/Homepage';
import SavedArticlesListPage from './pages/SavedArticlesList';
import SettingsPage from './pages/Settings';

const Router = () => {
    const theme = useCustomTheme();
    const { unreadArticlesCount, savedArticles } = useContext(Context) as IContext;

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const getIcon = (routeName: string, isFocused: boolean) => {
        // Icons list: https://oblador.github.io/react-native-vector-icons/

        const icon =
            routeName === 'Articles' ?
                'file-tray-full' :
                routeName === 'ArticlesSaved' ?
                    'bookmarks' : '';

        return isFocused ? `ios-${icon}` : `ios-${icon}-outline`;
    };

    const options = {
        title: '',
        headerTransparent: true,
        headerBackTitle: ' ',
    };

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={options}
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
                                    title: 'Uložené',
                                    tabBarBadge: savedArticles.length,
                                    tabBarBadgeStyle: Platform.OS === 'ios' ? {
                                        paddingTop: 2
                                    } : null
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </Stack.Screen>

                <Stack.Screen
                    name="ArticleDetail"
                    component={ArticleDetailPage}
                    options={options}
                />

                <Stack.Screen
                    name="FeedArticlesList"
                    component={FeedArticlesListPage}
                    options={options}
                />

                <Stack.Screen
                    name="Settings"
                    component={SettingsPage}
                    options={{
                        title: 'Nastavení',
                        headerBackTitle: 'Zpět',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default Router;
