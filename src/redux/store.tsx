import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { balanceReducer } from './balanceReducer';
import { coinsReducer } from './coinsReducer';
import { exchangesReducer } from './exchangesReducer';
import { feeReducer } from './feeReducer';
import { ordersReducer } from './ordersReducer';
import { selectCoinReducer } from './selectCoinReducer';
import { selectExchangeReducer } from './selectedExchangeReducer';

export const store = configureStore({
    reducer: {
        balance: balanceReducer,
        coins: coinsReducer,
        selectedCoin: selectCoinReducer,
        fee: feeReducer,
        orders: ordersReducer,
        exchanges: exchangesReducer,
        SelectedExchange: selectExchangeReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
