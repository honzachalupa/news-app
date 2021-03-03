import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getArticle } from '../helpers/api';

export default ({ route }: any) => {
    const theme = useTheme();

    const [article, setArticle] = useState<any>([]);

    const { articleId, feed } = route.params;

    useEffect(() => {
        getArticle(articleId, setArticle);
    }, []);

    return (
        <View style={{ padding: 12 }}>
            <Text style={{ color: theme.colors.text }}>{feed.name}</Text>
            <Text style={{ color: theme.colors.primary, fontSize: 28, marginBottom: 15 }}>{article.title}</Text>
            <Text style={{ color: theme.colors.text }}>{moment(article.createdDate).format('D.M.YYYY H:mm')}</Text>
            <Text style={{ color: theme.colors.text, fontSize: 20, marginTop: 15, marginBottom: 10 }}>{article.content}</Text>
        </View>
    );
}
