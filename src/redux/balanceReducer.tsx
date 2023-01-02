import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Balances, Exchange } from 'ccxt';
import { CustomBalance, ReduxWrapper } from '../@types/redux.types';

export const fetchBalance = createAsyncThunk(
    'balance/fetchBalance',
    async (exchange: Exchange, { rejectWithValue }) => {
        try {
            // exchange.setSandboxMode(true); //=============
            const response = await exchange.fetchBalance();
            return response as Balances;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {} as ReduxWrapper<Balances>;

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBalance.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchBalance.rejected, (state, action) => {
            // state.data = {};
            state.status = 'rejected';
        });
    },
});

export const balanceReducer = balanceSlice.reducer;
