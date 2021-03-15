import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import { Video } from 'expo-av';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Linking, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { Button } from 'react-native-ios-kit';
import WebView from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import BlurView from '../../components/BlurView';
import { formatDateLabel, timestampToDate } from '../../helpers/formatting';
import { IArticle, IFeed } from '../../interfaces';
import getStyles from './styles';

const ArticleDetailPage = ({ route: { params: { article } } }: { route: { params: { article: IArticle } } }) => {
    const theme = useTheme();
    const styles = getStyles();

    const { feeds, savedArticles, handleSaveArticle, handleUnsaveArticle, markArticleAsRead } = useContext(Context) as IContext;
    const [feed, setFeed] = useState<IFeed>();
    const [isGalleryShown, setIsGalleryShown] = useState<boolean>(false);

    const isSaved = savedArticles.map(({ id }) => id).includes(article.id);
    const galleryImages = article.images.slice(1, article.images.length);

    useEffect(() => {
        setFeed(feeds.find(({ sourceId }) => sourceId === article.sourceId));
        markArticleAsRead(article.id);
    }, []);

    return feed && article ? (
        <ScrollView contentContainerStyle={{ width: '100%' }}>
            <StatusBar hidden />

            {article.images.length > 0 && (
                <View style={styles.headerImageContainer}>
                    <Image source={{ uri: article.images[0] }} style={styles.headerImage} />
                    <Image source={require('./../../assets/gradient.png')} style={styles.gradient} />
                </View>
            )}

            {isSaved ? (
                <BlurView style={styles.saveButton}>
                    <Ionicons
                        name="ios-bookmark"
                        size={25}
                        color={theme.colors.primary}
                        onPress={() => handleUnsaveArticle(article.id)}
                    />
                </BlurView>
            ) : (
                <BlurView style={styles.saveButton}>
                    <Ionicons
                        name="ios-bookmark-outline"
                        size={25}
                        color={theme.colors.primary}
                        onPress={() => handleSaveArticle(article)}
                    />
                </BlurView>
            )}

            <TouchableWithoutFeedback onPress={() => galleryImages.length > 0 ? setIsGalleryShown(true) : {}}>
                <View style={styles.textContainer}>
                    {article.category ? (
                        <Text style={{ ...styles.feedName, backgroundColor: feed.branding.accentColor, color: feed.branding.backgroundColor }}>{feed?.name} - {article.category}</Text>
                    ) : (
                        <Text style={{ ...styles.feedName, backgroundColor: feed.branding.accentColor, color: feed.branding.backgroundColor }}>{feed?.name}</Text>
                    )}

                    <Text style={styles.date}>{formatDateLabel(timestampToDate(article.createdDate))}</Text>

                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
            </TouchableWithoutFeedback>

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

                    {galleryImages.length > 0 && (
                        <TouchableWithoutFeedback onPress={() => setIsGalleryShown(true)}>
                            <View style={styles.infoNode}>
                                <Ionicons
                                    name="ios-image"
                                    size={24}
                                    color={theme.colors.text}
                                    style={styles.infoNodeIcon}
                                />

                                <Text style={styles.infoNodeValue}>{galleryImages.length}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>

                {article.content.map((paragraph: string, i: number) => (
                    <View key={paragraph}>
                        {i === 1 && article.videos.length > 0 && (
                            article.videos.map(uri => (
                                <Video
                                    key={uri}
                                    source={{ uri }}
                                    resizeMode="cover"
                                    shouldPlay={false}
                                    useNativeControls
                                    style={styles.video}
                                />
                            ))
                        )}

                        <WebView key={paragraph} source={{
                            html:
                                `<span style="color: ${theme.colors.text}; font-size: 20px; line-height: 40%; margin-bottom: 20px; opacity: 0.9">${paragraph}</span>`
                        }} />
                    </View>
                ))}

                <ImageView
                    images={galleryImages.map(uri => ({ uri }))}
                    imageIndex={0}
                    visible={isGalleryShown}
                    onRequestClose={() => setIsGalleryShown(false)}
                />
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
