import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
    name: "filter",
    initialState: { name: "" },
    reducers: {
        changeFilter: (state, action) => ({
            ...state,
            name: action.payload,
        }),
    },
});

export const { changeFilter } = filterReducer.actions;
export default filterReducer.reducer;