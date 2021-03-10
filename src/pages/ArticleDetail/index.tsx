import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-ios-kit';
import WebView from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import { IArticle, IFeed } from '../../interfaces';
import getStyles from './styles';

const ArticleDetailPage = ({ route: { params: { article } } }: { route: { params: { article: IArticle } } }) => {
    const theme = useTheme();
    const styles = getStyles();

    const { feeds, savedArticles, handleSaveArticle, handleUnsaveArticle, markArticleAsRead } = useContext(Context) as IContext;

    const [feed, setFeed] = useState<IFeed>();

    const isSaved = savedArticles.map(({ id }) => id).includes(article.id);

    useEffect(() => {
        setFeed(feeds.find(({ sourceId }) => sourceId === article.sourceId));
        markArticleAsRead(article.id);
    }, []);

    return feed && article ? (
        <ScrollView>
            {article.images.length > 0 && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: article.images[0] }} style={styles.image} />
                    <Image source={require('./../../assets/gradient.png')} style={styles.gradient} />
                </View>
            )}

            {isSaved ? (
                <Ionicons
                    name="ios-bookmark"
                    size={25}
                    color="#90EE90"
                    style={styles.saveButton}
                    onPress={() => handleUnsaveArticle(article.id)}
                />
            ) : (
                <Ionicons
                    name="ios-bookmark-outline"
                    size={25}
                    color="#90EE90"
                    style={styles.saveButton}
                    onPress={() => handleSaveArticle(article)}
                />
            )}

            <View style={styles.textContainer}>
                {article.category ? (
                    <Text style={styles.feedName}>{feed?.name} - {article.category}</Text>
                ) : (
                    <Text style={styles.feedName}>{feed?.name}</Text>
                )}

                <Text style={styles.date}>{moment().startOf('day').add(article.createdDate.seconds, 'seconds').format('D.M.YYYY H:mm')}</Text>

                <Text style={styles.articleTitle}>{article.title}</Text>
            </View>

            <View style={styles.articleContentContainer}>
                <View style={styles.infoNodesContainer}>
                    {!!article.author && (
                        <View style={styles.infoNode}>
                            <Ionicons
                                name="ios-person-circle-outline"
                                size={24}
                                color={theme.colors.text}
                                style={styles.infoNodeIcon}
                            />

                            <Text style={styles.infoNodeValue}>{article.author}</Text>
                        </View>
                    )}

                    {!!article.readingTime && (
                        <View style={styles.infoNode}>
                            <Ionicons
                                name="ios-stopwatch-outline"
                                size={24}
                                color={theme.colors.text}
                                style={styles.infoNodeIcon}
                            />

                            <Text style={styles.infoNodeValue}>{moment().startOf('day').add(article.readingTime, 'minutes').format('H:mm')}</Text>
                        </View>
                    )}
                </View>

                {article.content.map((paragraph: string) => (
                    <WebView key={paragraph} source={{
                        html:
                            `<span style="color: ${theme.colors.text}; font-size: 20px; line-height: 40%; margin-bottom: 20px; opacity: 0.7">${paragraph}</span>`
                    }} />
                ))}
            </View>

            <Button onPress={() => Linking.openURL(article.url)} inline rounded inverted centered style={{ marginBottom: 80 }}>
                Otevřít v prohlížeči
            </Button>
        </ScrollView>
    ) : (
        <View>
            <Text>Načítání dat...</Text>
        </View>
    );
}

export default ArticleDetailPage;
