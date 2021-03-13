import { Context } from '@honzachalupa/helpers';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import { searchInArticles } from '../../helpers/data';
import { formatDateLabel, timestampToDate } from '../../helpers/formatting';
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
    const styles = getStyles();
    const navigation = useNavigation();
    const { isRefreshing, handleRefresh } = useContext(Context) as IContext;
    const [query, setQuery] = useState<string>('');
    const [isSearchShown, setIsSearchShown] = useState<boolean>();
    const [articlesFiltered, setArticlesFiltered] = useState<IArticle[]>([]);

    const handleOpenSearch = (value: boolean) => {
        setIsSearchShown(value);

        if (!value) {
            setArticlesFiltered(articles);
        }
    };

    const handleOpenDetail = (article: IArticle) =>
        navigation.navigate('ArticleDetail', {
            article
        });

    useEffect(() => {
        if (query.length > 0) {
            setArticlesFiltered(searchInArticles(articles, query));
        } else {
            setArticlesFiltered(articles);
        }
    }, [articles, query]);

    return (
        <SafeAreaView>
            <Text style={styles.feedName}>{feed?.name || label}</Text>

            <Ionicons
                name={isSearchShown ? 'ios-close' : 'ios-search'}
                size={20}
                color={theme.colors.text}
                style={styles.searchButton}
                onPress={() => handleOpenSearch(!isSearchShown)}
            />

            {isSearchShown && (
                <TextInput
                    placeholder="Hledání..."
                    onChangeText={setQuery}
                    autoCorrect={false}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    style={styles.searchInput}
                />
            )}

            {(!!query && articlesFiltered.length === 0) && (
                <Text>Žádné výsledky</Text>
            )}

            <FlatList
                data={articlesFiltered}
                refreshControl={
                    !isRefreshDisabled ? (
                        <RefreshControl
                            refreshing={articles.length === 0 || isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    ) : undefined
                }
                renderItem={({ item: article }) => (
                    <TouchableWithoutFeedback onPress={() => handleOpenDetail(article)}>
                        <View style={styles.card}>
                            <Image source={{ uri: article.images[0] }} style={styles.image} />

                            <View style={styles.textContainer}>
                                <Text style={styles.date}>{formatDateLabel(timestampToDate(article.createdDate))}</Text>

                                <Text style={{ ...styles.articleTitle, color: feed?.branding.accentColor || theme.colors.primary }}>{article.title}</Text>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                style={styles.articlesList}
            />
        </SafeAreaView>
    );
}

export default ArticlesList;
