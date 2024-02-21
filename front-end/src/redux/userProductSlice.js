import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import toast from "react-hot-toast";

const initialValue = {
    productLoaded : false,
    productNumber : 0,
    products : []
}


export const addProduct =
    createAsyncThunk("product/addProduct",async function(data){
        try {
            let response = axios.post("/product/add-product",data);
            toast.promise(response,{
                loading:"creating product...",
                success:(response)=>response.data.message,
                error:(error)=>error.response.data.message
            })
            response = await response;
            return response.data;
        } catch (error) {
            throw error;
        }
    })
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async function ({productFormData, _id }) {
    console.log(productFormData,_id);
    try {
      let response = axios.put(
        `/product/update-product/${_id}`,
        productFormData
      );
      toast.promise(response, {
        loading: "updating product...",
        success: (response) => response.data.message,
        error: (error) => error.response.data.message,
      });
      response = await response;
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

 export const getUserProducts = createAsyncThunk("/product/userProducts",async function(){
        try {
          let response = axios.get("/product/user-products");
          toast.promise(response, {
            loading: "fetching products...",
            success: (response) => response.data.message,
            error: (error) => error.response.data.message,
          });
          response = await response;
          return response.data;
        } catch (error) {
          throw error;
        }
 });   
 export const deleteProduct = createAsyncThunk(
   "/product/deleteProducts",
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
       throw error;
     }
   }
 );   

  


const userProductSlice = createSlice({
    name : "products",
    initialState : initialValue,
    reducers : {},
    extraReducers:(builder)=>{
        builder
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.productNumber = state.productNumber + 1;
            state.products.push(action.payload.value);
            state.productLoaded=false;
        })
        .addCase(getUserProducts.fulfilled,(state,action)=>{
         
            state.productLoaded = true;
            state.productNumber = action.payload.value.length;
            state.products=action.payload.value;
        })
        .addCase(getUserProducts.rejected,(state,action)=>{
            state.productLoaded = true;
            state.products=[];
            state.productNumber=0;
            
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
          state.productLoaded=false;
            
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
          state.productLoaded=false;
            
        })
    }

})

export default userProductSlice.reducer;