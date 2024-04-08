import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    needProductReLoad : true,
    productNumber : 0,
    products : []
}


export const addProduct = createAsyncThunk(
  "products/addProduct",
  async function (data) {
    try {
      let response =  axios.post("/product/add-product", data);
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
        `/product/update-product/${_id}`,
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
          let response = await axios.get("/product/user-products");
          return response.data;
        } catch (error) {
            console.log(error.message);
          }
 });  

 export const deleteProduct = createAsyncThunk(
   "product/deleteProducts",
   async function (productId) {
    
     try {
       let response = axios.delete(`/product/delete-product/${productId}`);
       
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
             state.needProductReLoad = true;
             console.log("fullfilled state");
          })

          .addCase(getUserProducts.fulfilled, (state, action) => {
            state.needProductReLoad = false;
            state.productNumber = action?.payload?.value?.length;
            state.products = action?.payload?.value;
          })

          .addCase(getUserProducts.rejected, (state, action) => {
            state.needProductReLoad = false;
            state.products = [];
            state.productNumber = 0;
          })
          .addCase(deleteProduct.fulfilled, (state, action) => {
            state.needProductReLoad = true;
          })
          .addCase(updateProduct.fulfilled, (state, action) => {
            state.needProductReLoad = true;
          });
    }

})

export default userProductSlice.reducer;