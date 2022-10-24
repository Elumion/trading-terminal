import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Exchange } from 'ccxt';

const initialState = { data: {}, name: '', id: '' } as {
    data: Exchange;
    name: string;
    id: string;
};

const selectExchangeSlice = createSlice({
    name: 'selectExchange',
    initialState,
    reducers: {
        exchangeSelected(state, action) {
            try {
                const values = action.payload;
                let newExchange: any;
                const ccxt: any = (window as any).ccxt;
                if (values.needPassword) {
                    newExchange = new ccxt[`${values.exchange}`]({
                        apiKey: values.apiKey,
                        secret: values.apiSecret,
                        password: values.password,
                        proxy: (window as any).Main.globalConfig.proxy,
                    });
                } else {
                    newExchange = new ccxt[`${values.exchange}`]({
                        apiKey: values.apiKey,
                        secret: values.apiSecret,
                        proxy: (window as any).Main.globalConfig.proxy,
                    });
                }
                state.data = newExchange;
                state.name = values.name;
                state.id = values.id;
            } catch (err) {
                console.log(err);
            }
        },
        resetSelectedExchange: (state: any) => {
            state.data = null;
            state.name = '';
            state.id = '';
        },
    },
});

export const { exchangeSelected, resetSelectedExchange } =
    selectExchangeSlice.actions;
export const selectExchangeReducer = selectExchangeSlice.reducer;
