import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IContext } from '../../App';
import { filterFeedsAndArticles } from '../../helpers/data';
import { IArticle, IFeed } from '../../interfaces';
import ArticleListItem from './ArticleListItem';
import FeedListItem from './FeedListItem';
import getStyles from './styles';

const HomePage = ({ navigation }: any) => {
    const flatListRef = useRef<any>();
    const { colors } = useTheme();
    const styles = getStyles();
    const { isRefreshing, isOnline, settingsIsAutoPlayOn, handleRefresh } = useContext(Context) as IContext;
    const { feedsFiltered, articlesFiltered } = filterFeedsAndArticles();

    const handleOpenDetail = (article: IArticle) => {
        navigation.navigate('ArticleDetail', {
            article
        });
    };

    const handleOpenFeedArticlesList = (feed: IFeed) => {
        navigation.navigate('FeedArticlesList', {
            feed
        });
    };

    const handleOpenSettings = () => {
        navigation.navigate('Settings');
    };

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

    const resetCarouselIndex = () => {
        if (flatListRef && flatListRef.current) {
            flatListRef.current.snapToItem(0);
        }
    }

    useEffect(() => {
        if (flatListRef && flatListRef.current) {
            if (settingsIsAutoPlayOn) {
                flatListRef.current.startAutoplay();
            } else {
                flatListRef.current.stopAutoplay();
            }
        }
    }, [settingsIsAutoPlayOn]);

    return (
        <SafeAreaView edges={['right', 'top', 'left']}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => handleRefresh(resetCarouselIndex)}
                    />
                }
                style={styles.container}
            >
                <View style={{ padding: 20 }}>
                    <Text style={styles.date}>{moment().format('dddd D. MMMM')}</Text>
                    <Text style={styles.headline}>Nejnovější zprávy</Text>

                    {!isOnline && (
                        <Ionicons
                            name="ios-cloud-offline-outline"
                            size={25}
                            color="red"
                            style={styles.networkStatus}
                        />
                    )}

                    <Ionicons
                        name="ios-cog-outline"
                        size={30}
                        color={colors.text}
                        style={styles.settingsButton}
                        onPress={handleOpenSettings}
                    />
                </View>

                {feedsFiltered.length > 0 ? (
                    <View>
                        <Carousel
                            ref={flatListRef}
                            data={articlesFiltered}
                            horizontal
                            autoplay={settingsIsAutoPlayOn}
                            autoplayDelay={5000}
                            autoplayInterval={8000}
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
                            data={groupFeeds(feedsFiltered)}
                            horizontal
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            showsHorizontalScrollIndicator={false}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={(Dimensions.get('window').width / 3 * 2)}
                            activeSlideAlignment="start"
                            renderItem={({ item: feedsGroup }: { item: IFeed[] }) => (
                                <View key={feedsGroup[0].id} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {feedsGroup.map(feed => (
                                        <FeedListItem key={feed.id} feed={feed} onClick={handleOpenFeedArticlesList} />
                                    ))}
                                </View>
                            )}
                            containerCustomStyle={styles.feedsGrid}
                        />
                    </View>
                ) : (
                    <Text style={styles.warningMessage}>Vyberte si prosím v nastavení zdroje, které vás zajímají.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomePage;
