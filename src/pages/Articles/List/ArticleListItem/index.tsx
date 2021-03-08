import { Context } from '@honzachalupa/helpers';
import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IContext } from '../../../../App';
import { IArticle } from '../../../../interfaces';
import getStyles from './styles';

interface IProps {
    article: IArticle;
    onClick: (articleId: IArticle['id']) => void;
}

const ArticleListItem = ({ article, onClick }: IProps) => {
    const { feeds } = useContext(Context) as IContext;

    const styles = getStyles();

    const feed = feeds.find(({ sourceId }) => sourceId === article.sourceId);

    return (
        <TouchableOpacity onPress={() => onClick(article.id)}>
            <View style={styles.card}>
                {article.images.length > 0 && (
                    <Image source={{ uri: article.images[0] }} style={styles.image} />
                )}

                <View style={styles.textContainer}>
                    <Text style={styles.feedName}>{feed?.name}</Text>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ArticleListItem;
