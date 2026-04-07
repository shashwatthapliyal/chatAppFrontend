import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
        // Update the feed when user clicks (interested,ignored) on the user's profiles on the feed
        updateFeed: (state, action) => {
            return state.filter((res) => res._id != action.payload)
        }
    }
})










export const { addFeed, removeUser, updateFeed } = feedSlice.actions;
export default feedSlice.reducer;