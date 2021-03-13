import { Context } from '@honzachalupa/helpers';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SettingsCategoryHeader, SettingsSwitch } from 'react-native-settings-components';
import { IContext } from '../../App';
import { filterFeedsAndArticles } from '../../helpers/data';
import { IFeed } from '../../interfaces';
import getStyles from './styles';

const SettingsPage = () => {
    const { feeds, articles, settingsIsAutoPlayOn, settingsSelectedFeeds, settingsBlacklist, updateContextProperty } = useContext(Context) as IContext;

    const styles = getStyles();
    const { articlesFiltered } = filterFeedsAndArticles(true);
    const articlesCountDiff = articles.length - articlesFiltered.length;

    const [settingsBlacklistString, setSettingsBlacklistChanged] = useState<string>(settingsBlacklist.join(', '));

    const handleFeedSelectionChange = (selectedId: IFeed['id'], isSelected: boolean) => {
        updateContextProperty('settingsSelectedFeeds', isSelected ?
            settingsSelectedFeeds.filter(id => id !== selectedId) :
            [...settingsSelectedFeeds, selectedId]
        );
    };

    const handleBlacklistChange = (value: string) => {
        setSettingsBlacklistChanged(value);
    };

    useEffect(() => {
        updateContextProperty('settingsBlacklist', settingsBlacklistString.split(',').map(x => x.trim()));
    }, [settingsBlacklistString]);

    return (
        <View>
            <SettingsCategoryHeader title="Přehled článků" titleStyle={styles.sectionTitle} />

            <SettingsSwitch
                title="Automatické posouvání"
                onValueChange={(value: boolean) => updateContextProperty('settingsIsAutoPlayOn', value)}
                value={settingsIsAutoPlayOn}
                containerStyle={styles.switchContainer}
                titleStyle={styles.switchLabel}
            />

            <SettingsCategoryHeader title="Zdroje" titleStyle={styles.sectionTitle} />

            {feeds.map(({ id, name }) => {
                const isSelected = settingsSelectedFeeds.includes(id);

                return (
                    <SettingsSwitch
                        key={id}
                        title={name}
                        onValueChange={(value: boolean) => handleFeedSelectionChange(id, !value)}
                        value={isSelected}
                        containerStyle={styles.switchContainer}
                        titleStyle={styles.switchLabel}
                    />
                );
            })}

            {settingsSelectedFeeds.length === 0 && (
                <Text style={{ ...styles.description, color: 'red' }}>Nevybrali jste žádný zdroj.</Text>
            )}

            <SettingsCategoryHeader title="Blacklist" titleStyle={styles.sectionTitle} />

            <TextInput
                value={settingsBlacklistString}
                onChangeText={text => handleBlacklistChange(text)}
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="while-editing"
                style={styles.textInput}
            />

            <Text style={styles.description}>{`Články obsahující zadané výrazy budou skryty. ${articlesCountDiff > 0 ? `Nyní je skryto ${articlesCountDiff} článků, které obsahují zadané výrazy.` : ''}`}</Text>
            <Text style={{ ...styles.description, color: 'darkorange' }}>Slova oddělujte čárkou. Velikost písmen je ignorována.</Text>
        </View>
    );
}

export default SettingsPage;
