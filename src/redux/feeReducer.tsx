import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Exchange } from 'ccxt';
import { ReduxFee, ReduxWrapper } from '../@types/redux.types';

interface Props {
    exchange: Exchange;
    coinName: string;
}

export const fetchFee = createAsyncThunk(
    'fee/currentCoinFee',
    async (dataObj: Props, { rejectWithValue }) => {
        try {
            const { exchange, coinName } = dataObj;
            exchange.setSandboxMode(true); //=============
            const response: ReduxFee = await exchange.fetchTradingFee(coinName);
            return response as ReduxFee;
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    },
);

const initialState = {} as ReduxWrapper<ReduxFee>;

const fetchFeeSlice = createSlice({
    name: 'fee',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFee.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchFee.rejected, (state, action) => {
            // state.data = {};
            state.status = 'rejected';
        });
    },
});

export const feeReducer = fetchFeeSlice.reducer;
