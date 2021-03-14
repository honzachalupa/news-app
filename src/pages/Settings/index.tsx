import { Context } from '@honzachalupa/helpers';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SettingsCategoryHeader, SettingsSwitch } from 'react-native-settings-components';
import { IContext } from '../../App';
import { filterFeedsAndArticles } from '../../helpers/data';
import { IFeed } from '../../interfaces';
import getStyles from './styles';

const SettingsPage = () => {
    const { feeds, articles, settingsIsAutoPlayOn, settingsSelectedFeeds, settingsBlacklist, setContextProperty } = useContext(Context) as IContext;

    const styles = getStyles();
    const { articlesFiltered } = filterFeedsAndArticles(true);
    const articlesCountDiff = articles.length - articlesFiltered.length;

    const [settingsBlacklistString, setSettingsBlacklistChanged] = useState<string>(settingsBlacklist.join(', '));

    const handleFeedSelectionChange = (selectedId: IFeed['id'], isSelected: boolean) => {
        setContextProperty('settingsSelectedFeeds', isSelected ?
            settingsSelectedFeeds.filter(id => id !== selectedId) :
            [...settingsSelectedFeeds, selectedId]
        );
    };

    const handleBlacklistChange = (value: string) => {
        setSettingsBlacklistChanged(value);
    };

    useEffect(() => {
        const settingsBlacklist = settingsBlacklistString.split(',').map(x => x.trim()).filter(x => x);

        if (settingsBlacklist) {
            setContextProperty('settingsBlacklist', settingsBlacklist);
        }
    }, [settingsBlacklistString]);

    return (
        <ScrollView>
            <KeyboardAvoidingView
                keyboardVerticalOffset={150}
                behavior="position"
            >
                <SettingsCategoryHeader title="Přehled článků" titleStyle={styles.sectionTitle} />

                <SettingsSwitch
                    title="Automatické posouvání"
                    onValueChange={(value: boolean) => setContextProperty('settingsIsAutoPlayOn', value)}
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

                <SettingsCategoryHeader title="Blacklist výrazů" titleStyle={styles.sectionTitle} />

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
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default SettingsPage;
