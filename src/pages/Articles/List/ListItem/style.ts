import { Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default (theme: Theme) => StyleSheet.create({
    card: {
        width: 350,
        height: 350,
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        marginLeft: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '76%'
    },
    textContainer: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    feedName: {
        color: theme.colors.primary,
        fontSize: 14,
        marginBottom: 5
    },
    articleTitle: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: '600'
    }
});
