import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Exchange, Market } from 'ccxt';
import { ReduxWrapper } from '../@types/redux.types';

export const fetchCoins = createAsyncThunk(
    'coins/fetchCoins',
    async (exchange: Exchange, { rejectWithValue }) => {
        try {
            exchange.setSandboxMode(true); //=============
            const response = await exchange.fetchMarkets();
            return response as Market[];
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {} as ReduxWrapper<Market[] | []>;

const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCoins.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchCoins.rejected, (state, action) => {
            state.data = [];
            state.status = 'rejected';
        });
    },
});

export const coinsReducer = coinsSlice.reducer;
