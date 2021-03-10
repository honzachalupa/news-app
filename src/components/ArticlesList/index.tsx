import { Context } from '@honzachalupa/helpers';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, Image, RefreshControl, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IContext } from '../../App';
import { IArticle, IFeed } from '../../interfaces';
import getStyles from './styles';

interface IProps {
    articles: IArticle[];
    feed?: IFeed;
    label?: string;
    isRefreshDisabled?: boolean;
}

const ArticlesList = ({ articles, feed, label, isRefreshDisabled }: IProps) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const { isRefreshing, handleRefresh } = useContext(Context) as IContext;

    const styles = getStyles();

    const handleOpenDetail = (article: IArticle) => {
        navigation.navigate('ArticleDetail', {
            article
        });
    };

    return (
        <SafeAreaView>
            <Text style={styles.feedName}>{feed?.name || label}</Text>

            <FlatList
                data={articles}
                refreshControl={
                    !isRefreshDisabled ? (
                        <RefreshControl
                            refreshing={!articles || isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    ) : undefined
                }
                renderItem={({ item: article }) => (
                    <TouchableWithoutFeedback onPress={() => handleOpenDetail(article)}>
                        <View style={styles.card}>
                            <Image source={{ uri: article.images[0] }} style={styles.image} />

                            <View style={styles.textContainer}>
                                <Text style={{ ...styles.articleTitle, color: feed?.branding.accentColor || theme.colors.primary }}>{article.title}</Text>

                                <Text style={styles.articleContent}>
                                    {article.contentPreview.substring(0, Math.min(130 - article.title.length, article.contentPreview.length))}...
                            </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </SafeAreaView>
    );
}

export default ArticlesList;
