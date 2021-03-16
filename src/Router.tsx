import { Context } from '@honzachalupa/helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { enableScreens } from "react-native-screens";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { IContext } from './App';
import { useCustomTheme } from './helpers/theme';
import ArticleDetailPage from './pages/ArticleDetail';
import FeedArticlesListPage from './pages/FeedArticlesList';
import Homepage from './pages/Homepage';
import SettingsPage from './pages/Settings';

enableScreens();

const Router = () => {
    const theme = useCustomTheme();
    const { unreadArticlesCount, savedArticles } = useContext(Context) as IContext;

    const Stack = createSharedElementStackNavigator();
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

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    const options = {
        title: '',
        headerTransparent: true,
        headerBackTitle: ' ',
        cardStyleInterpolator: ({ current }: { current: { progress: number } }) => ({
            cardStyle: {
                opacity: current.progress,
            }, // updates the opacity depending on the transition progress value of the current screen
        }),
    };

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={options}
                    component={() => (
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
                        </Tab.Navigator>
                    )}
                />

                <Stack.Screen
                    name="ArticleDetail"
                    component={ArticleDetailPage}
                    options={options}
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

                <Stack.Screen
                    name="Settings"
                    component={SettingsPage}
                    options={{
                        title: 'Nastavení',
                        headerBackTitle: 'Zpět',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
