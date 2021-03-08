import { Context } from '@honzachalupa/helpers';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IContext } from '../../../App';
import { IArticle } from '../../../interfaces';
import ListItem from './ListItem';
import getStyle from './style';

const ArticlesListPage = ({ navigation }: any) => {
    const { articles } = useContext(Context) as IContext;

    const theme = useTheme();
    const style = getStyle(theme);

    const handleOpenDetail = (articleId: IArticle['id']) => {
        navigation.navigate('ArticleDetail', {
            articleId
        });
    };

    return (
        <SafeAreaView>
            <View style={{ padding: 20 }}>
                <Text style={style.date}>{moment().format('dddd d. MMMM')}</Text>
                <Text style={style.headline}>Nejnovější zprávy</Text>
            </View>

            <FlatList
                data={articles}
                renderItem={({ item: article }: { item: IArticle }) => (
                    <ListItem key={article.id} article={article} onClick={handleOpenDetail} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default ArticlesListPage;
