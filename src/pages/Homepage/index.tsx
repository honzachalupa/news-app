import { Context } from '@honzachalupa/helpers';
import moment from 'moment';
import React, { useContext } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { IContext } from '../../App';
import { IArticle, IFeed } from '../../interfaces';
import ArticleListItem from './ArticleListItem';
import FeedListItem from './FeedListItem';
import getStyles from './styles';

const ArticlesListPage = ({ navigation }: any) => {
    const { feeds, articles, isRefreshing, handleRefresh } = useContext(Context) as IContext;

    const styles = getStyles();

    const handleOpenDetail = (article: IArticle) => {
        navigation.navigate('ArticleDetail', {
            article
        });
    };

    const todaysDate = moment().locale('cs-CZ').format('dddd d. MMMM');

    const groupFeeds = (feeds: IFeed[]) => {
        const feedsGroups: IFeed[][] = [];

        for (let i = 0; i < feeds.length; i += 4) {
            const group = [feeds[i]];

            if (feeds[i + 1]) {
                group.push(feeds[i + 1]);
            }

            if (feeds[i + 2]) {
                group.push(feeds[i + 2]);
            }

            if (feeds[i + 3]) {
                group.push(feeds[i + 3]);
            }

            feedsGroups.push(group);
        }

        return feedsGroups;
    };

    return (
        <SafeAreaView style={{ marginBottom: -35 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={{ padding: 20 }}>
                    <Text style={styles.date}>{todaysDate}</Text>
                    <Text style={styles.headline}>Nejnovější zprávy</Text>
                </View>

                <Carousel
                    data={articles}
                    horizontal
                    // autoplay
                    // autoplayDelay={5000}
                    // autoplayInterval={8000}
                    inactiveSlideScale={1}
                    showsHorizontalScrollIndicator={false}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - 55}
                    activeSlideAlignment="start"
                    renderItem={({ item: article }: { item: IArticle }) => (
                        <ArticleListItem key={article.id} article={article} onClick={handleOpenDetail} />
                    )}
                />

                <Text style={styles.subheadline}>Zdroje</Text>

                <Carousel
                    data={groupFeeds(feeds)}
                    horizontal
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    showsHorizontalScrollIndicator={false}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={280}
                    activeSlideAlignment="start"
                    renderItem={({ item: feedsGroup }: { item: IFeed[] }) => (
                        <View key={feedsGroup[0].id} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {feedsGroup.map(group => (
                                <FeedListItem feed={group} onClick={() => { }} />
                            ))}
                        </View>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ArticlesListPage;
