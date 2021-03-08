import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IFeed } from '../../../../interfaces';
import getStyles from './styles';

interface IProps {
    feed: IFeed;
    onClick: (feedId: IFeed['id']) => void;
}

const FeedListItem = ({ feed, onClick }: IProps) => {
    const styles = getStyles();

    return (
        <TouchableOpacity onPress={() => onClick(feed.id)}>
            <View style={{ ...styles.card, backgroundColor: feed.branding.backgroundColor }}>
                <Image style={styles.logo} resizeMode="contain" source={{ uri: feed.branding.logo }} />

                <Text style={styles.feedName}>{feed.name.replace('Idnes ', '')}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FeedListItem;
