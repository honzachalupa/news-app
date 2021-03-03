import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Linking, SectionList, TouchableOpacity, View } from 'react-native';
import { IArticle, IFeed, IFeedDefinition } from '../interfaces';
import { getFeeds, getFeedsDefinitions } from './helpers/api';

export default () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [definitions, setDefinitions] = useState<IFeedDefinition[]>([]);
    const [feeds, setFeeds] = useState<{ [key: string]: IFeed }>({});
    const [listData, setListData] = useState<any>([]);

    const formatData = (definitions: IFeedDefinition[], feeds: { [key: string]: IFeed }) => {
        setListData(definitions.map((definition: IFeedDefinition) => ({
            title: definition.name,
            data: feeds[definition.id].articles.splice(0, 5).map((article: IArticle) => article)
        })));
    };

    const handleRefresh = () => {
        setIsLoading(true);

        getFeedsDefinitions(setDefinitions);

        getFeeds(data => {
            setFeeds(data);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        getFeedsDefinitions(setDefinitions);

        getFeeds(data => {
            setFeeds(data);
        });
    }, []);

    useEffect(() => {
        if (definitions.length > 0 && Object.keys(feeds).length > 0) {
            formatData(definitions, feeds);
        }
    }, [definitions, feeds]);

    return (
        <View>
            {listData.length > 0 ? (
                <SectionList
                    sections={listData}
                    renderSectionHeader={({ section: { title } }: any) => (
                        <View style={{ backgroundColor: '#f2f2f2', paddingLeft: 12, paddingRight: 12 }}>
                            <Text key={title} style={{ fontSize: 20, marginTop: 20, marginBottom: 10 }}>{title}</Text>
                        </View>
                    )}
                    renderItem={({ item: article }: { item: IArticle }) => (
                        <View key={article.id} style={{ paddingLeft: 12, paddingRight: 12 }}>
                            <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
                                <Text style={{ fontWeight: '600', marginTop: 10 }}>{article.title}</Text>

                                <Text style={{ marginTop: 5 }}>{article.contentPreview}</Text>
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
