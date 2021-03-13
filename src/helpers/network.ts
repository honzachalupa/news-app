import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);

    useEffect(() => {
        NetInfo.fetch().then(({ isConnected }) => {
            setIsConnected(isConnected);
        });

        const unsubscribeNetInfo = NetInfo.addEventListener(({ isConnected }) => {
            setIsConnected(isConnected);
        });

        return () => {
            unsubscribeNetInfo();
        };
    }, []);

    return isConnected;
};
