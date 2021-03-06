import { Context } from '@honzachalupa/helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from './App';
import { EPageIDs } from './enumerators';
import { getTabBarIcon } from './helpers/data';
import { useCustomTheme } from './helpers/theme';
import ArticleDetailPage from './pages/ArticleDetail';
import FeedArticlesListPage from './pages/FeedArticlesList';
import Homepage from './pages/Homepage';
import SavedArticlesListPage from './pages/SavedArticlesList';
import SettingsPage from './pages/Settings';
import SettingsSourcesPage from './pages/SettingsSources';

const Router = () => {
    const theme = useCustomTheme();
    const { savedArticles } = useContext(Context) as IContext;

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const stackScreenOptions = {
        title: '',
        headerTransparent: true,
        headerBackTitle: ' ',
        headerTintColor: 'transparent'
    };

    const tabBarBadgeOptions = (count?: number) => ({
        tabBarBadge: count && count > 0 ? count : undefined,
        tabBarBadgeStyle: {
            backgroundColor: theme.colors.text,
            color: theme.colors.card,
            ...Platform.OS === 'ios' ? {
                paddingTop: 2
            } : null
        }
    });

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName={EPageIDs.HOME_PAGE}>
                <Stack.Screen
                    name={EPageIDs.HOME_PAGE}
                    options={stackScreenOptions}
                >
                    {() => (
                        <Tab.Navigator
                            initialRouteName={EPageIDs.ARTICLES_PAGE}
                            tabBarOptions={{
                                labelStyle: {
                                    fontSize: 13
                                },
                                activeTintColor: theme.colors.primary
                            }}
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => (
                                    <Ionicons
                                        name={getTabBarIcon(route.name, focused)}
                                        size={size}
                                        color={color}
                                    />
                                )
                            })}
                        >
                            <Tab.Screen
                                name={EPageIDs.ARTICLES_PAGE}
                                component={Homepage}
                                options={{
                                    title: 'Vše',
                                    ...tabBarBadgeOptions()
                                }}
                            />

                            <Tab.Screen
                                name={EPageIDs.SAVED_ARTICLES_PAGE}
                                component={SavedArticlesListPage}
                                options={{
                                    title: 'Uložené',
                                    ...tabBarBadgeOptions(savedArticles.length)
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </Stack.Screen>

                <Stack.Screen
                    name={EPageIDs.ARTICLE_DETAIL_PAGE}
                    component={ArticleDetailPage}
                    options={stackScreenOptions}
                />

                <Stack.Screen
                    name={EPageIDs.FEED_ARTICLES_PAGE}
                    component={FeedArticlesListPage}
                    options={stackScreenOptions}
                />

                <Stack.Screen
                    name={EPageIDs.SETTINGS_PAGE}
                    component={SettingsPage}
                    options={{
                        title: 'Nastavení',
                        headerBackTitle: 'Zpět',
                    }}
                />

                <Stack.Screen
                    name={EPageIDs.SETTINGS_SOURCES_PAGE}
                    component={SettingsSourcesPage}
                    options={{
                        title: 'Zdroje',
                        headerBackTitle: 'Zpět',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default Router;
