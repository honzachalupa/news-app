import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-ios-kit';
import WebView from 'react-native-render-html';
import { IContext } from '../../../App';
import { getArticle } from '../../../helpers/api';
import { IArticle, IFeed } from '../../../interfaces';

const ArticleDetailPage = ({ route }: any) => {
    const { articleId } = route.params;

    const theme = useTheme();

    const { feeds } = useContext(Context) as IContext;

    const [feed, setFeed] = useState<IFeed>();
    const [article, setArticle] = useState<IArticle>();

    useEffect(() => {
        getArticle(articleId, article => {
            setFeed(feeds.find(({ sourceId }) => sourceId === article.sourceId));
            setArticle(article);
        });
    }, []);

    console.log({ feed, article });

    return feed && article ? (
        <ScrollView>
            {article.images.length > 0 && (
                <Image source={{ uri: article.images[0] }} style={{ width: '100%', height: 300 }} />
            )}

            <View>
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 12 }}>
                    <Text style={{ color: theme.colors.text }}>{feed.name} ~ {moment(article.createdDate).format('D.M.YYYY H:mm')}</Text>
                    <Text style={{ color: theme.colors.primary, fontSize: 28, marginTop: 10 }}>{article.title}</Text>
                </View>

                <View style={{ padding: 12 }}>
                    {article.content.map((paragraph: string) => (
                        <WebView key={paragraph} source={{
                            html:
                                `<span style="color: ${theme.colors.text}; font-size: 18px; margin-bottom: 20px">${paragraph}</span>`
                        }} />
                    ))}
                </View>

                <Button onPress={() => Linking.openURL(article.url)} inline rounded inverted centered style={{ marginBottom: 80 }}>
                    Otevřít v prohlížeči
                </Button>
            </View>
        </ScrollView>
    ) : (
        <View>
            <Text>Načítání dat...</Text>
        </View>
    );
}

export default ArticleDetailPage;
