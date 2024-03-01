import productModel from "../models/product.model.js"
import cloudinary from "cloudinary";
import { log } from "console";
import fs from "fs";

export const getAllProducts = async (req, res) => {
    
     const { page, limit, starting,numberOfButtonPage } = req.query;
     
     // Convert query parameters to integers
     const pageNumber = parseInt(page);
     const limitNumber = parseInt(limit);
     const startingNumber = parseInt(starting);
     const numberOfButtonPageNumber= parseInt(numberOfButtonPage);

     // Calculate the number of documents to skip
     let skip =  limitNumber*(startingNumber-1);

     // Find products with pagination
    try {
       let numberOfButton = await productModel
         .find({})
         .skip(skip)
         .limit(limitNumber  * numberOfButtonPageNumber)
         .count();
    
         numberOfButton = Math.ceil(numberOfButton / limitNumber);
  
         skip = (pageNumber-1) * limitNumber;
  
       const products = await productModel.find({}).skip(skip).limit(limitNumber);
       return res.status(200).json({
         success: true,
         messgae: "successfully fetched data",
         products,
         numberOfButton
       });
  
    } catch (error) {
      console.log(error);
    }

};
export const getUserProducts = async (req, res) => {
    const userId = req.user._id;
  try {
    const products = await productModel.find({userId});
   
    if (products.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        value : products
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message, 
    });
  }
};

export const addProduct = async(req,res)=>{
    const id = req.user._id;
  // this will destructure the req.body object
  const { productName, description, category, price } = req.body;
  
  

  //   this will check any field is empty or not if empty then simply send a error response
  if (!productName || !description || !category || !price ) {
   
    return res.status(401).json({
      success: false,
      message: "please fill all field",
    });
  }
  

  //   if there is lest than three images has uploaded then simply return a error response
  
  if (req.files.length < 3) {
    
    return res.status(401).json({
      success: false,
      message: "please select atleast 3 images",
    });
  }

  const images = req.files;
  

  try {
    const product = await productModel.create({
      productName,
      description,
      category,
      price,
      userId: id,
    });

    //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
    const uploadImages = async () => {
      for (const image of images) {
        const productImage = {};
        const result = await cloudinary.v2.uploader.upload(image.path, {
          folder: "productImages",
        });
        if (result) {
          productImage.secure_url = result.secure_url;
          productImage.public_id = result.public_id;
        }
        product.images.push(productImage);
      }
    };

    await uploadImages();
    await product.save();
    return res.status(200).json({
      success: true,
      message: "product added successfully",
      value:product
    });
  } catch (error) {
    return res.status(500).json({
        success : false,
        message : error.message
    })
  }finally{
   
      for (const image of images) {
        fs.unlinkSync(image.path);
      }    
  }

}

export const updateProduct = async(req,res)=>{
  const { productId } = req.params;
 
  let images = req.files;
  try {
    const product = await productModel.findById(productId);
    // this will destructure the req.body object
    const { productName, description, category, price } = req.body;
   
      // this will check any field is empty or not if empty then simply send a error response
    if (!productName || !description || !category || !price) {
      return res.status(401).json({
        success: false,
        message: "please fill all field",
      });
    }

    product.productName = productName;
    product.description = description;
    product.category = category;
    product.price = price;
    
     console.log(req.files.length);
    if (req.files.length > 0) {
      //   if there is lest than three images has uploaded then simply return a error response
      if (req.files.length < 3) {
        return res.status(401).json({
          success: false,
          message: "please select atleast 3 images",
        });
      }
      const existedImagesInDb = product.images;
      for (const image of existedImagesInDb) {
        await cloudinary.v2.uploader.destroy(image.public_id);
      }
      product.images = [];
      images = req.files;
      

      //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
      const uploadImages = async () => {
        try {
          for (const image of images) {
            let productImage = {};
            const result = await cloudinary.v2.uploader.upload(image.path, {
              folder: "productImages",
            });
            if (result) {
              productImage.secure_url = result.secure_url;
              productImage.public_id = result.public_id;
            }
            product.images.push(productImage);
          }
        } catch (error) {
          throw error;
        }
        
      };

      await uploadImages();
      
    }
    await product.save();
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
    });
 } catch (error) {
  console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    if(req.files.length > 0){
      for (const image of images) {
        fs.unlinkSync(image.path);
      }
    }
    
  }  
  
}

export const deleteProduct = async(req,res)=>{
    const {productId} = req.params;
    console.log(productId);
    try {
        const result = await productModel.findByIdAndDelete(productId);
        if (result) {
          return res.status(200).json({
            success: true,
            message: "product deleted successfully",
            value : result
          });
        }
             
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "what"
        })
    }
    
}




