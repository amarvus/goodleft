import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import receivedRequestReducer from "./receivedRequestSlice";

const appstore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    requests: requestReducer,
    receivedRequests: receivedRequestReducer,
  },
});

export default appstore;
