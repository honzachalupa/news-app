import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { useContext } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import { formatDateLabel, timestampToDate } from '../../helpers/formatting';
import { IArticle } from '../../interfaces';
import getStyles from './styles';

export enum EArticleSummaryViews {
    LIST_ITEM = 'LIST_ITEM',
    DETAIL_HEADER = 'DETAIL_HEADER'
}

const StateLabel = ({ isSaved, isRead }: { isSaved: boolean, isRead: boolean }) => {
    const { colors } = useTheme();
    const styles = getStyles();

    return isSaved ? (
        <BlurView style={styles.statusNode}>
            <Ionicons
                name="ios-bookmark"
                size={14}
                color={colors.primary}
            />

            <Text style={styles.saveStatusValue}>Uloženo</Text>
        </BlurView>
    ) : isRead ? (
        <BlurView style={styles.statusNode}>
            <Ionicons
                name="ios-checkmark-done-outline"
                size={14}
                color={colors.primary}
            />

            <Text style={styles.readStatusValue}>Přečteno</Text>
        </BlurView>
    ) : null;
};

const StateAction = ({ article, isSaved }: { article: IArticle, isSaved: boolean }) => {
    const { colors } = useTheme();
    const styles = getStyles();
    const { handleSaveArticle, handleUnsaveArticle } = useContext(Context) as IContext;

    return isSaved ? (
        <BlurView style={styles.saveButton}>
            <Ionicons
                name="ios-bookmark"
                size={25}
                color={colors.primary}
                onPress={() => handleUnsaveArticle(article.id)}
            />
        </BlurView>
    ) : (
        <BlurView style={styles.saveButton}>
            <Ionicons
                name="ios-bookmark-outline"
                size={25}
                color={colors.primary}
                onPress={() => handleSaveArticle(article)}
            />
        </BlurView>
    );
};

interface IProps {
    article: IArticle;
    view: EArticleSummaryViews;
    onClick: (article: IArticle) => void;
}

const ArticleSummary = ({ article, view, onClick }: IProps) => {
    const styles = getStyles();
    const { feeds, savedArticles, readArticlesIDs } = useContext(Context) as IContext;
    const isRead = readArticlesIDs.includes(article.id);
    const isSaved = savedArticles.map(({ id }) => id).includes(article.id);
    const feed = feeds.find(({ sourceId }) => sourceId === article.sourceId);

    return (
        <TouchableWithoutFeedback onPress={() => onClick(article)}>
            <View style={view === EArticleSummaryViews.DETAIL_HEADER ? styles.card_articleDetail : styles.card}>
                {article.images.length > 0 && (
                    <View style={styles.imageContainer}>
                        {view === EArticleSummaryViews.LIST_ITEM ? (
                            <StateLabel isRead={isRead} isSaved={isSaved} />
                        ) : view === EArticleSummaryViews.DETAIL_HEADER ? (
                            <StateAction article={article} isSaved={isSaved} />
                        ) : null}

                        <Image source={{ uri: article.images[0] }} style={styles.image} />
                        <Image source={require('../../assets/gradient.png')} style={styles.gradient} />
                    </View>
                )}

                <View style={view === EArticleSummaryViews.DETAIL_HEADER ? styles.textContainer_articleDetail : styles.textContainer}>
                    <Text style={{ ...styles.feedName, backgroundColor: feed?.branding.accentColor }}>
                        {article.category ? `${feed?.name} - ${article.category}` : feed?.name}
                    </Text>

                    <Text style={styles.date}>{formatDateLabel(timestampToDate(article.createdDate))}</Text>

                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ArticleSummary;
