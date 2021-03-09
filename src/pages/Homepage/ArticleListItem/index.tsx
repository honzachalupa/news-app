import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../../App';
import { IArticle } from '../../../interfaces';
import getStyles from './styles';

interface IProps {
    article: IArticle;
    onClick: (articleId: IArticle) => void;
}

const ArticleListItem = ({ article, onClick }: IProps) => {
    const { feeds, readArticlesIDs } = useContext(Context) as IContext;

    const theme = useTheme();
    const styles = getStyles();
    const isRead = readArticlesIDs.includes(article.id);
    const feed = feeds.find(({ sourceId }) => sourceId === article.sourceId);

    return (
        <TouchableWithoutFeedback onPress={() => onClick(article)}>
            <View style={styles.card}>
                {article.images.length > 0 && (
                    <View style={styles.imageContainer}>
                        {isRead && (
                            <View style={styles.readStatus}>
                                <Ionicons
                                    name="ios-checkmark-done-outline"
                                    size={14}
                                    color={theme.colors.primary}
                                />

                                <Text style={styles.readStatusValue}>Přečteno</Text>
                            </View>
                        )}

                        <Image source={{ uri: article.images[0] }} style={styles.image} />
                        <Image source={require('./../../../assets/gradient.png')} style={styles.gradient} />
                    </View>
                )}

                <View style={styles.textContainer}>
                    {article.category ? (
                        <Text style={{ ...styles.feedName, backgroundColor: feed?.branding.accentColor }}>{feed?.name} - {article.category}</Text>
                    ) : (
                        <Text style={{ ...styles.feedName, backgroundColor: feed?.branding.accentColor }}>{feed?.name}</Text>
                    )}

                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ArticleListItem;
