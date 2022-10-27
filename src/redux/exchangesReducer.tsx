import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReduxWrapper, SavedExchange } from '../@types/redux.types';

export const fetchExchanges = createAsyncThunk(
    'exchange/fetchExchanges',
    async (_, { rejectWithValue }) => {
        try {
            const response = await window.Main.getExchanges();

            return response;
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    },
);

const initialState = {} as ReduxWrapper<SavedExchange[] | []>;

const exchangesSlice = createSlice({
    name: 'exchanges',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchExchanges.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchExchanges.rejected, (state, action) => {
            state.data = [];
            state.status = 'rejected';
        });
    },
});

export const exchangesReducer = exchangesSlice.reducer;
