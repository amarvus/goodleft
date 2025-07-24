import { createSlice } from "@reduxjs/toolkit";

const receivedRequestSlice = createSlice({
  name: "receivedRequests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
  },
});

export const { addRequest } = receivedRequestSlice.actions;
export default receivedRequestSlice.reducer;
