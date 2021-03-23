import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsButton, SettingsCategoryHeader, SettingsSwitch } from 'react-native-settings-components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IContext } from '../../App';
import { EPageIDs, EThemes } from '../../enumerators';
import { filterFeedsAndArticles } from '../../helpers/data';
import getStyles from './styles';

const SettingsPage = ({ navigation }: any) => {
    const { feeds, articles, settingsTheme, settingsIsAutoPlayOn, settingsSelectedFeeds, settingsBlacklist, setContextProperty } = useContext(Context) as IContext;
    const { colors } = useTheme()
    const styles = getStyles();
    const { articlesFiltered } = filterFeedsAndArticles(true);
    const articlesCountDiff = articles.length - articlesFiltered.length;

    const [settingsBlacklistString, setSettingsBlacklistChanged] = useState<string>(settingsBlacklist.join(', '));

    const handleOpenSources = () => {
        navigation.navigate(EPageIDs.SETTINGS_SOURCES_PAGE);
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
            <SafeAreaView edges={['bottom']}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={150}
                    behavior="position"
                >
                    <SettingsCategoryHeader title="Barevné téma" titleStyle={styles.sectionTitle} />

                    <SettingsSwitch
                        title="Použít systémové"
                        onValueChange={(value: boolean) => setContextProperty('settingsTheme', value ? EThemes.SYSTEM : EThemes.LIGHT)}
                        value={settingsTheme === EThemes.SYSTEM}
                        containerStyle={styles.itemContainer}
                        titleStyle={styles.itemLabel}
                    />

                    {settingsTheme !== EThemes.SYSTEM && (
                        <SettingsSwitch
                            title={`Použít: ${settingsTheme === EThemes.DARK ? 'Tmavé' : 'Světlé'}`}
                            onValueChange={(value: boolean) => setContextProperty('settingsTheme', value ? EThemes.DARK : EThemes.LIGHT)}
                            value={settingsTheme === EThemes.DARK}
                            containerStyle={styles.itemContainer}
                            titleStyle={styles.itemLabel}
                        />
                    )}

                    <SettingsCategoryHeader title="Přehled článků" titleStyle={styles.sectionTitle} />

                    <SettingsSwitch
                        title="Automatické listování"
                        onValueChange={(value: boolean) => setContextProperty('settingsIsAutoPlayOn', value)}
                        value={settingsIsAutoPlayOn}
                        containerStyle={styles.itemContainer}
                        titleStyle={styles.itemLabel}
                    />

                    <SettingsCategoryHeader title="Zdroje" titleStyle={styles.sectionTitle} />

                    <SettingsButton
                        title="Vybrat"
                        description={`Nyní je vybráno ${settingsSelectedFeeds.length} zdrojů.`}
                        rightIcon={() => (
                            <FontAwesome5
                                name="chevron-right"
                                size={24}
                                color={colors.primary}
                                style={styles.icon}
                            />
                        )}
                        onPress={handleOpenSources}
                        containerStyle={styles.itemContainer}
                        titleStyle={styles.itemLabel}
                        descriptionStyle={styles.itemDescription}
                    />

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
            </SafeAreaView>
        </ScrollView>
    );
}

export default SettingsPage;
