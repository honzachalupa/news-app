import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useAppState = () => {
    const appStateRef = useRef(AppState.currentState);
    const [appState, setAppState] = useState<AppStateStatus>(appStateRef.current);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        appStateRef.current = nextAppState;
        setAppState(appStateRef.current);
    }

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    return appState;
};
