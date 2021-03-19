import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { IContext } from '../../App';
import { formatDateLabel, timestampToDate } from '../../helpers/formatting';
import { IArticle } from '../../interfaces';
import { ShareAction, StateAction, StateLabel } from './Actions';
import getStyles from './styles';

export enum EArticleSummaryViews {
    LIST_ITEM = 'LIST_ITEM',
    DETAIL_HEADER = 'DETAIL_HEADER'
}

interface IProps {
    article: IArticle;
    view: EArticleSummaryViews;
    onClick: (article: IArticle) => void;
}

const ArticleSummary = ({ article, view, onClick }: IProps) => {
    const { colors } = useTheme();
    const styles = getStyles();
    const { feeds, savedArticles, readArticlesIDs } = useContext(Context) as IContext;
    const isRead = readArticlesIDs.includes(article.id);
    const isSaved = savedArticles.map(({ id }) => id).includes(article.id);
    const hasImage = article.images.length > 0;
    const feed = feeds.find(({ sourceId }) => sourceId === article.sourceId);

    return (
        <TouchableWithoutFeedback onPress={() => onClick(article)}>
            <View style={view === EArticleSummaryViews.DETAIL_HEADER ? styles.card_articleDetail : styles.card}>
                <View style={styles.imageContainer}>
                    <View style={styles.actionsContainer}>
                        {view === EArticleSummaryViews.LIST_ITEM ? (
                            <StateLabel isRead={isRead} isSaved={isSaved} />
                        ) : view === EArticleSummaryViews.DETAIL_HEADER ? (
                            <View style={styles.actionsGroup}>
                                <StateAction article={article} isSaved={isSaved} />
                                <ShareAction article={article} />
                            </View>
                        ) : null}
                    </View>

                    {hasImage && (
                        <View style={styles.image}>
                            <Image source={{ uri: article.images[0] }} style={styles.image} />
                            <Image source={require('../../assets/gradient.png')} style={styles.gradient} />
                        </View>
                    )}
                </View>

                <View style={view === EArticleSummaryViews.DETAIL_HEADER ? styles.textContainer_articleDetail : styles.textContainer}>
                    <Text style={{ ...styles.feedName, backgroundColor: feed?.branding.accentColor }}>
                        {article.category ? `${feed?.name} - ${article.category}` : feed?.name}
                    </Text>

                    <Text style={{ ...styles.date, color: !hasImage ? colors.text : styles.date.color }}>{formatDateLabel(timestampToDate(article.createdDate))}</Text>

                    <Text style={{ ...styles.articleTitle, color: !hasImage ? colors.text : styles.articleTitle.color }}>{article.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ArticleSummary;
