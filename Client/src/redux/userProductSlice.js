import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    productUpToDate : false,
    productNumber : 0,
    products : []
}


export const addProduct = createAsyncThunk(
  "products/addProduct",
  async function (data) {
    try {
      let response =  axios.post("/products/add-product", data);
      toast.promise(response,{
        loading : "creating product...",
        success : "product created!",
        error:((error)=>error?.response?.data?.message)
      })
      response = await response;
      return response.data;
    } catch (error) {
        toast.error("failed to add product");
    }
  }
);


export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async function ({productFormData, _id }) {
    
    try {
      let response = axios.put(
        `/products/update-product/${_id}`,
        productFormData
      );
      toast.promise(response, {
        loading: "updating product...",
        success:  "product created successfully",
        error: ((error) => error?.response?.data?.message)
      });
      response = await response;
      return response.data;
    } catch (error) {
        console.error(error.message);
    }
  }
);

// this will fetch all user product
 export const getUserProducts = createAsyncThunk("product/userProducts",async function(){
        try {
          let response = await axios.get("/products/user-products");
          return response.data;
        } catch (error) {
            console.log(error.message);
            throw error;
          }
 });  

 export const deleteProduct = createAsyncThunk(
   "product/deleteProducts",
   async function (productId) {
    
     try {
       let response = axios.delete(`/products/delete-product/${productId}`);
       
       toast.promise(response, {
         loading: "deleting product...",
         success: (response) => response.data.message,
         error: (error) => error.response.data.message,
       });
       response = await response;
       return response.data;
     } catch (error) {
        console.log(error.message);
     }
   }
 );   

  


const userProductSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},
    extraReducers:(builder)=>{
        builder
          .addCase(addProduct.fulfilled,(state,action)=>{
             state.productUpToDate = true;
             state.productNumber = state.productNumber+1;
             state.products.push(action.payload.product);
          })

          .addCase(getUserProducts.fulfilled, (state, action) => {
            state.productUpToDate = true;
            state.productNumber = action?.payload?.products?.length;
            state.products = action?.payload?.products;
          })

          .addCase(deleteProduct.fulfilled, (state, action) => {
            state.productUpToDate = false;
          })
          
          .addCase(updateProduct.fulfilled, (state, action) => {
            state.productUpToDate = false;
          });
    }

})

export default userProductSlice.reducer;