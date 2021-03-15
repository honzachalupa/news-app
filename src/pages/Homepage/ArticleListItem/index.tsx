import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../../App';
import BlurView from '../../../components/BlurView';
import { formatDateLabel, timestampToDate } from '../../../helpers/formatting';
import { IArticle } from '../../../interfaces';
import getStyles from './styles';

interface IProps {
    article: IArticle;
    onClick: (articleId: IArticle) => void;
}

const ArticleListItem = ({ article, onClick }: IProps) => {
    const { colors } = useTheme();

    const { feeds, savedArticles, readArticlesIDs } = useContext(Context) as IContext;

    const styles = getStyles();
    const isRead = readArticlesIDs.includes(article.id);
    const isSaved = savedArticles.map(({ id }) => id).includes(article.id);
    const feed = feeds.find(({ sourceId }) => sourceId === article.sourceId);

    return feed ? (
        <TouchableWithoutFeedback onPress={() => onClick(article)}>
            <View style={styles.card}>
                {article.images.length > 0 && (
                    <View style={styles.imageContainer}>
                        {isSaved ? (
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
                        ) : null}

                        <Image source={{ uri: article.images[0] }} style={styles.image} />
                        <Image source={require('./../../../assets/gradient.png')} style={styles.gradient} />
                    </View>
                )}

                <View style={styles.textContainer}>
                    <Text style={{ ...styles.feedName, backgroundColor: feed.branding.accentColor, color: feed.branding.backgroundColor }}>
                        {article.category ? `${feed.name} - ${article.category}` : feed.name}
                    </Text>

                    <Text style={styles.date}>{formatDateLabel(timestampToDate(article.createdDate))}</Text>

                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ) : null;
};

export default ArticleListItem;
