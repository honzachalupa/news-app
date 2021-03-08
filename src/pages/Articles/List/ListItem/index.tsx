import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IContext } from '../../../../App';
import { IArticle } from '../../../../interfaces';
import getStyle from './style';

interface IProps {
    article: IArticle;
    onClick: (articleId: IArticle['id']) => void;
}

const ListItem = ({ article, onClick }: IProps) => {
    const { feeds } = useContext(Context) as IContext;

    const theme = useTheme();
    const style = getStyle(theme);

    const feed = feeds.find(({ sourceId }) => sourceId === article.sourceId);

    return (
        <TouchableOpacity onPress={() => onClick(article.id)}>
            <View style={style.card}>
                {article.images.length > 0 && (
                    <Image source={{ uri: article.images[0] }} style={style.image} />
                )}

                <View style={style.textContainer}>
                    <Text style={style.feedName}>{feed?.name}</Text>
                    <Text style={style.articleTitle}>{article.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ListItem;
