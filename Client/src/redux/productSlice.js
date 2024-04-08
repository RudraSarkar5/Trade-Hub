import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";

const initialState ={
    isNextButtonAvailable : false,
    numberOfButtonPage : 0,
    products : []
}

export const fetchProducts = createAsyncThunk(
  "products/getAllProducts",
  async function ({ page, limit,numberOfButtonPage, starting }) {
    let response = await axios.get(
      `/product/all-products?page=${page}&limit=${limit}&numberOfButtonPage=${numberOfButtonPage}&starting=${starting}`
    );

    return response.data;
  }
);

export const searchedProductName = createAsyncThunk("products/searchedProducts",async function(data){
  console.log("slice",data); 
  const response = await axios.get(`product/search-products/${data}`);
   return response.data;
})

const productSlice = createSlice({
    name : "products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.numberOfButtonPage = action.payload.numberOfButton;
            state.products = action.payload.products;
            state.isNextButtonAvailable = action.payload.isNextButtonAvailable;

        })
        .addCase(searchedProductName.fulfilled,(state,action)=>{
          state.numberOfButtonPage = 0;
          state.products = action.payload.products;
          state.isNextButtonAvailable = false;
        })
    }
})

export default productSlice.reducer;