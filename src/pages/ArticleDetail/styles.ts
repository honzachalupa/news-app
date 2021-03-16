import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';

export default () => {
    const { colors } = useTheme();

    return StyleSheet.create({
        articleContentContainer: {
            backgroundColor: colors.card,
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
            backgroundColor: colors.background,
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
            color: colors.text,
            fontSize: 20,
            fontWeight: '600',
            marginTop: 4,
            marginLeft: 5
        },
        video: {
            width: '100%',
            aspectRatio: 16 / 10,
            marginBottom: 20,
            borderRadius: 15
        },
        galleryImage: {
            width: Dimensions.get('window').width - 40,
            aspectRatio: 16 / 10,
            marginBottom: 20,
            borderRadius: 15
        },
        shareButton: {
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 80
        }
    });
};
