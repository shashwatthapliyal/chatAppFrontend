import { createSlice } from "@reduxjs/toolkit";


const connectionsSlice = createSlice({
    name:"connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        // addConnection()
    }
})


export const { addConnections ,removeConnection} = connectionsSlice.actions;
export default connectionsSlice.reducer;