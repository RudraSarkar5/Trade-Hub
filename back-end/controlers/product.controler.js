import productModel from "../models/product.model.js"
import cloudinary from "cloudinary";
import { log } from "console";
import fs from "fs";

export const getAllProducts = async (req, res) => {
    
  try {
    const products = await productModel.find({});
    if (products.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message, 
    });
  }
};
export const getUserProducts = async (req, res) => {
    const userId = req.user.id;
  try {
    const products = await productModel.find({userId});
    if (products.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message, 
    });
  }
};

export const addProduct = async(req,res)=>{
    const id = req.user.id;
  // this will destructure the req.body object
  const { name, description, category, price } = req.body;

  //   this will check any field is empty or not if empty then simply send a error response
  if (!name || !description || !category || !price) {
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
  const productImage = {};

  try {
    const product = await productModel.create({
      name,
      description,
      category,
      price,
      userId: id
    });

    //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
    const uploadImages = async () => {
      for (const image of images) {
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
    });
  } catch (error) {
    return res.status(500).json({
        success : false,
        message : error.message
    })
  }finally{
    for(const image of images){
        fs.unlinkSync(image.path);
    }
  }

}
export const updateProduct = async(req,res)=>{
  const { productId } = req.params;
  let images = null;
  try {
    const product = await productModel.findById(productId);
    // this will destructure the req.body object
    const { name, description, category, price } = req.body;
    //   this will check any field is empty or not if empty then simply send a error response
    if (!name || !description || !category || !price) {
      return res.status(401).json({
        success: false,
        message: "please fill all field",
      });
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;

    if (req.files) {
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
      const productImage = {};

      //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
      const uploadImages = async () => {
        for (const image of images) {
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
        message: "product updated successfully",
      });
    }
 } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    for (const image of images) {
      fs.unlinkSync(image.path);
    }
  }  
  
}

export const deleteProduct = async(req,res)=>{
    const {productId} = req.params;
    try {
        const result = await productModel.findByIdAndDelete(productId);
        if (result) {
          return res.status(200).json({
            success: true,
            message: "product deleted successfully"
          });
        }else{
             return res.status(500).json({
               success: false,
               message: "product is not deleted "
             });
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
    
}




