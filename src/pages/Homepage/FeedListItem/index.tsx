import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { clearProviderName } from '../../../helpers/formatting';
import { IFeed } from '../../../interfaces';
import getStyles from './styles';

interface IProps {
    feed: IFeed;
    onClick: (feedId: IFeed) => void;
}

const FeedListItem = ({ feed, onClick }: IProps) => {
    const styles = getStyles();

    return (
        <TouchableWithoutFeedback onPress={() => onClick(feed)}>
            <View style={styles.card}>
                <Image style={styles.logo} resizeMode="contain" source={{ uri: feed.branding.logo }} />

                <Text style={{ ...styles.feedName, color: feed.branding.accentColor }}>{clearProviderName(feed.name)}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FeedListItem;
