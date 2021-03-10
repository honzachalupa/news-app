import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const theme = useTheme();

    return StyleSheet.create({
        imageContainer: {
            width: '100%',
            height: Dimensions.get('window').width,
            position: 'relative'
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
        saveButton: {
            backgroundColor: theme.colors.card,
            borderRadius: 20,
            padding: 7,
            overflow: 'hidden',
            position: 'absolute',
            top: 50,
            right: 20,
            zIndex: 9
        },
        textContainer: {
            width: '100%',
            height: Dimensions.get('window').width,
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            position: 'absolute',
            top: -70,
            zIndex: 2
        },
        category: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'white',
            textTransform: 'uppercase',
            borderRadius: 12,
            overflow: 'hidden',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 12
        },
        date: {
            color: 'white',
            opacity: 0.7,
            marginBottom: 8
        },
        feedName: {
            backgroundColor: theme.colors.primary,
            color: 'white',
            fontSize: 14,
            textTransform: 'uppercase',
            borderRadius: 12,
            overflow: 'hidden',
            paddingTop: 5,
            paddingBottom: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 12
        },
        articleTitle: {
            color: 'white',
            fontSize: 24,
            fontWeight: '600'
        },
        articleContentContainer: {
            backgroundColor: theme.colors.card,
            padding: 20,
            borderRadius: 50,
            position: 'relative',
            top: -50,
            zIndex: 3
        },
        infoNodesContainer: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginBottom: 10
        },
        infoNode: {
            backgroundColor: theme.colors.background,
            borderRadius: 24,
            overflow: 'hidden',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 12,
            marginBottom: 12,
            marginRight: 12,
            flexDirection: 'row',
        },
        infoNodeIcon: {
            opacity: 0.3
        },
        infoNodeValue: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: '600',
            marginTop: 4,
            marginLeft: 5
        }
    });
};
