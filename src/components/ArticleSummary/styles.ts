import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const { colors } = useTheme();

    const cardWidthHeight = Dimensions.get('window').width - 75;

    return StyleSheet.create({
        card: {
            width: cardWidthHeight,
            height: cardWidthHeight,
            backgroundColor: colors.card,
            borderRadius: 15,
            marginLeft: 20,
            overflow: 'hidden'
        },
        card_articleDetail: {
            width: '100%',
            height: Dimensions.get('window').width,
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            position: 'relative'
        },
        actionsContainer: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 9
        },
        actionsGroup: {
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            top: 30
        },
        statusLabel: {
            borderRadius: 12,
            overflow: 'hidden',
            paddingTop: 5,
            paddingBottom: 4,
            paddingLeft: 10,
            paddingRight: 10,
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 99
        },
        saveStatusValue: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'uppercase',
            marginLeft: 5
        },
        readStatusValue: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'uppercase',
            marginLeft: 5
        },
        articleAction: {
            backgroundColor: colors.card,
            borderRadius: 20,
            paddingTop: 9,
            paddingBottom: 9,
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: 10,
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0
        },
        gradient: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 1
        },
        textContainer: {
            width: '100%',
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'absolute',
            bottom: 0
        },
        textContainer_articleDetail: {
            width: '100%',
            paddingLeft: 20,
            paddingRight: 20,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'absolute',
            bottom: 60
        },
        feedName: {
            color: 'white',
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'uppercase',
            borderRadius: 12,
            overflow: 'hidden',
            paddingTop: 5,
            paddingBottom: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 12
        },
        date: {
            color: 'white',
            opacity: 0.7,
            marginBottom: 8
        },
        articleTitle: {
            color: 'white',
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 12
        }
    });
};
