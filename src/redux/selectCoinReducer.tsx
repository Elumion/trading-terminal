import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState = { data: {} } as {
    data: { limit: string; amount: string };
};

const selectCoinSlice = createSlice({
    name: 'selectCoin',
    initialState,
    reducers: {
        coinSelected(state, action: PayloadAction<string>) {
            const splittedValue = action.payload.split('/');

            state.data = { limit: splittedValue[1], amount: splittedValue[0] };
        },
    },
});

export const { coinSelected } = selectCoinSlice.actions;
export const selectCoinReducer = selectCoinSlice.reducer;
