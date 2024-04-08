import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import userProductReducer from "./userProductSlice";
import productReducer from "./productSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    userProducts: userProductReducer,
    products: productReducer
   
  },
});

export default store;