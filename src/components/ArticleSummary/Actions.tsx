import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Share, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import { IArticle } from '../../interfaces';
import BlurView from '../BlurView';
import getStyles from './styles';

export const StateLabel = ({ isSaved, isRead }: { isSaved: boolean, isRead: boolean }) => {
    const { colors } = useTheme();
    const styles = getStyles();

    return isSaved ? (
        <BlurView style={styles.statusLabel}>
            <Ionicons
                name="ios-bookmark"
                size={14}
                color={colors.primary}
            />

            <Text style={styles.saveStatusValue}>Uloženo</Text>
        </BlurView>
    ) : isRead ? (
        <BlurView style={styles.statusLabel}>
            <Ionicons
                name="ios-checkmark-done-outline"
                size={14}
                color={colors.primary}
            />

            <Text style={styles.readStatusValue}>Přečteno</Text>
        </BlurView>
    ) : null;
};

export const StateAction = ({ article, isSaved }: { article: IArticle, isSaved: boolean }) => {
    const { colors } = useTheme();
    const styles = getStyles();
    const { handleSaveArticle, handleUnsaveArticle } = useContext(Context) as IContext;

    return (
        <BlurView style={styles.articleAction}>
            {isSaved ? (
                <Ionicons
                    name="ios-bookmark"
                    size={20}
                    color={colors.primary}
                    onPress={() => handleUnsaveArticle(article.id)}
                />
            ) : (
                <Ionicons
                    name="ios-bookmark-outline"
                    size={20}
                    color={colors.primary}
                    onPress={() => handleSaveArticle(article)}
                />
            )}
        </BlurView>
    );
};

export const ShareAction = ({ article }: { article: IArticle }) => {
    const { colors } = useTheme();
    const styles = getStyles();

    const handleShareArticle = async () => {
        await Share.share({
            title: article.title,
            url: article.url
        });
    };

    return (
        <BlurView style={styles.articleAction}>
            <Ionicons
                name="ios-share-outline"
                size={20}
                color={colors.primary}
                onPress={handleShareArticle}
                style={{
                    position: 'relative',
                    left: 1
                }}
            />
        </BlurView>
    );
};
