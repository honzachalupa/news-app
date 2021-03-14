import { Context } from '@honzachalupa/helpers';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { IContext } from '../App';

export const useAppState = () => {
    const appStateRef = useRef(AppState.currentState);
    const context = useContext(Context) as IContext;
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
