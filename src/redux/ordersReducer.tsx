import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Exchange, Order } from 'ccxt';
import { ReduxWrapper } from '../@types/redux.types';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (exchange: Exchange, { rejectWithValue }) => {
        try {
            // exchange.setSandboxMode(true); //=============
            const response = await exchange.fetchOpenOrders();
            return response as Order[];
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {} as ReduxWrapper<Order[] | []>;

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.data = [];
            state.status = 'rejected';
        });
    },
});

export const ordersReducer = ordersSlice.reducer;
