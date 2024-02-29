import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import userProductReducer from "./userProductSlice";
import productReducer from "./productSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userProducts: userProductReducer,
    products: productReducer,
    chat: chatReducer
  },
});

export default store;