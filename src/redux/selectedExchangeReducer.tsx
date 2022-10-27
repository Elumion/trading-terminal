import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Exchange } from 'ccxt';

interface ExchangeState {
    data: Exchange | {};
    name: string;
    id: string;
}

const initialState = { data: {}, name: '', id: '' } as ExchangeState;

const selectExchangeSlice = createSlice({
    name: 'selectExchange',
    initialState,
    reducers: {
        exchangeSelected(state, action) {
            try {
                const values = action.payload;
                let newExchange: Exchange;
                const ccxt = (window as any).ccxt;
                if (values.needPassword) {
                    newExchange = new ccxt[`${values.exchange}`]({
                        apiKey: values.apiKey,
                        secret: values.apiSecret,
                        password: values.password,
                        proxy: window.Main.globalConfig.proxy,
                    });
                } else {
                    newExchange = new ccxt[`${values.exchange}`]({
                        apiKey: values.apiKey,
                        secret: values.apiSecret,
                        proxy: window.Main.globalConfig.proxy,
                    });
                }
                state.data = newExchange;
                state.name = values.name;
                state.id = values.id;
            } catch (err) {
                console.log(err);
            }
        },
        resetSelectedExchange: (state: ExchangeState) => {
            state.data = {};
            state.name = '';
            state.id = '';
        },
    },
});

export const { exchangeSelected, resetSelectedExchange } =
    selectExchangeSlice.actions;
export const selectExchangeReducer = selectExchangeSlice.reducer;
