import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import { Video } from 'expo-av';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Share, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { Button } from 'react-native-ios-kit';
import WebView from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import ArticleSummary, { EArticleSummaryViews } from '../../components/ArticleSummary';
import { IArticle } from '../../interfaces';
import getStyles from './styles';

const ArticleDetailPage = ({ route: { params: { article } } }: { route: { params: { article: IArticle } } }) => {
    const { colors } = useTheme();
    const styles = getStyles();

    const { savedArticles, markArticleAsRead } = useContext(Context) as IContext;
    const [isGalleryShown, setIsGalleryShown] = useState<boolean>(false);

    const galleryImages = article.images.slice(1, article.images.length);

    const handleShare = async () => {
        await Share.share({
            title: article.title,
            url: article.url
        });
    };

    useEffect(() => {
        // markArticleAsRead(article.id);
    }, []);

    return (
        <ScrollView contentContainerStyle={{ width: '100%' }}>
            <StatusBar hidden />

            <ArticleSummary article={article} view={EArticleSummaryViews.DETAIL_HEADER} onClick={() => galleryImages.length > 0 ? setIsGalleryShown(true) : {}} />

            <View style={styles.articleContentContainer}>
                <View style={styles.infoNodesContainer}>
                    {!!article.author && (
                        <View style={styles.infoNode}>
                            <Ionicons
                                name="ios-person-circle-outline"
                                size={24}
                                color={colors.text}
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
                                color={colors.text}
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
                                    color={colors.text}
                                    style={styles.infoNodeIcon}
                                />

                                <Text style={styles.infoNodeValue}>{galleryImages.length}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>

                {article.content.map((paragraph: string, i: number) => (
                    <View key={paragraph}>
                        {i === 1 && article.videos && article.videos.length > 0 && (
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
                                `<span style="color: ${colors.text}; font-size: 20px; line-height: 40%; margin-bottom: 20px; opacity: 0.9">${paragraph}</span>`
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

            <Button onPress={handleShare} inline rounded inverted centered style={styles.shareButton}>
                Sdílet
            </Button>
        </ScrollView>
    );
}

export default ArticleDetailPage;
