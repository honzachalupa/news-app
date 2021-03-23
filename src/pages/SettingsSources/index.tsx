import { Context } from '@honzachalupa/helpers';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsCategoryHeader, SettingsSwitch } from 'react-native-settings-components';
import { IContext } from '../../App';
import { clearProviderName } from '../../helpers/formatting';
import { IFeed } from '../../interfaces';
import getStyles from './styles';

const SettingsSourcesPage = () => {
    const { feeds, settingsSelectedFeeds, setContextProperty } = useContext(Context) as IContext;
    const styles = getStyles();

    const handleFeedSelectionChange = (selectedId: IFeed['id'], isSelected: boolean) => {
        setContextProperty('settingsSelectedFeeds', isSelected ?
            settingsSelectedFeeds.filter(id => id !== selectedId) :
            [...settingsSelectedFeeds, selectedId]
        );
    };

    const feedsGrouped = (() => {
        const grouped: { [key: string]: IFeed[] } = {};

        feeds.forEach(feed => {
            if (!grouped[feed.provider.id]) {
                grouped[feed.provider.id] = [];
            }

            grouped[feed.provider.id].push(feed);
        });

        return grouped;
    })();

    return (
        <ScrollView>
            <SafeAreaView edges={['bottom']}>
                {Object.keys(feedsGrouped).map(key => {
                    const feed = feeds.find(({ provider }) => provider.id === key) as IFeed;

                    return (
                        <View key={key}>
                            <SettingsCategoryHeader title={feed.provider.name} titleStyle={styles.sectionTitle} />

                            {feedsGrouped[key].map(({ id, name }) => (
                                <SettingsSwitch
                                    key={id}
                                    title={clearProviderName(name)}
                                    onValueChange={(value: boolean) => handleFeedSelectionChange(id, !value)}
                                    value={settingsSelectedFeeds.includes(id)}
                                    containerStyle={styles.itemContainer}
                                    titleStyle={styles.itemLabel}
                                />
                            ))}
                        </View>
                    );
                })}

                {settingsSelectedFeeds.length === 0 && (
                    <Text style={{ ...styles.description, color: 'red' }}>Nevybrali jste žádný zdroj.</Text>
                )}
            </SafeAreaView>
        </ScrollView>
    );
}

export default SettingsSourcesPage;
