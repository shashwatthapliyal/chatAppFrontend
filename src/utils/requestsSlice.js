import { createSlice } from "@reduxjs/toolkit";


const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        // to remove a single request that has been resolved (accepted, rejected)
        removeRequest: (state, action) => {
            const newArray = state.filter((req) => req._id != action.payload);
            return newArray;
        }
    }
})


export const { addRequests,removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;