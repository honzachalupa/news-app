import { useTheme } from '@react-navigation/native';
import { BlurView as ExpoBlurView } from 'expo-blur';
import React from 'react';

interface IProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const BlurView = ({ children, style }: IProps) => {
    const theme = useTheme();

    return (
        <ExpoBlurView intensity={90} tint={theme.dark ? 'dark' : 'light'} style={style}>
            {children}
        </ExpoBlurView>
    );
};

export default BlurView;
