import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { IContext } from '../App';
import { getArticles, getFeeds } from '../helpers/api';
import { IArticle, IFeed } from '../interfaces';

export default ({ navigation }: any) => {
    const { updateContextProperty } = useContext(Context) as IContext;
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [feeds, setFeeds] = useState<IFeed[]>([]);
    const [articles, setArticles] = useState<{ [key: string]: IArticle[] }>({});
    const [listData, setListData] = useState<any>([]);

    const formatData = (feeds: IFeed[], articles: { [key: string]: IArticle[] }) => {
        setListData(feeds.map((definition: IFeed) => ({
            title: definition.name,
            data: articles[definition.sourceId]
        })));
    };

    const getUnreadArticlesCount = (articles: { [key: string]: IArticle[] }) => {
        let sum = 0;

        Object.values(articles).forEach((articles: any) =>
            sum += articles.length
        );

        return sum;
    };

    const handleRefresh = () => {
        setIsLoading(true);

        getFeeds(setFeeds);
    };

    const handleOpenDetail = (article: IArticle) => {
        navigation.navigate('ArticleDetail', {
            articleId: article.id,
            feed: feeds.find((feed: IFeed) => feed.sourceId === article.sourceId)
        });
    };

    useEffect(() => {
        getFeeds(setFeeds);
    }, []);

    useEffect(() => {
        Promise.all(
            feeds.map(feed => {
            getArticles(feed.sourceId, articles => {
                setArticles(prevState => ({
                    ...prevState,
                    [feed.sourceId]: articles
                }));
            });
        })).then(() =>
            setIsLoading(false)
        )
    }, [feeds]);

    useEffect(() => {
        updateContextProperty('unreadArticlesCount', getUnreadArticlesCount(articles));

        if (Object.keys(articles).length > 0) {
            formatData(feeds, articles);
        }
    }, [articles]);

    return (
        <View>
            {listData.length > 0 ? (
                <SectionList
                    sections={listData.filter((x: any) => x.data)}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ backgroundColor: theme.colors.background, paddingLeft: 12, paddingRight: 12 }}>
                            <Text key={title} style={{ color: theme.colors.primary, fontSize: 20, marginTop: 20, marginBottom: 10 }}>{title}</Text>
                        </View>
                    )}
                    renderItem={({ item: article }: { item: IArticle }) => (
                        <View key={article.id} style={{ paddingLeft: 12, paddingRight: 12 }}>
                            <TouchableOpacity onPress={() => handleOpenDetail(article)}>
                                <Text style={{ color: theme.colors.text, fontWeight: '600', marginTop: 10 }}>{article.title}</Text>

                                <Text style={{ color: theme.colors.text, marginTop: 5 }}>{article.contentPreview}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    refreshing={isLoading}
                    onRefresh={handleRefresh}
                />
            ) : (
                    <View>
                        <Text>Načítání dat...</Text>
                    </View>
                )}
        </View>
    );
}
