import productModel from "../models/product.model.js"
import cloudinary from "cloudinary";
import fs from "fs";
import { fileRemoveFromCloud,
        fileRemoveFromDisc,
        fileUploadInCloudinary
       } from "../utility/fileManage.js";
import AppError from "../utility/customError.js";

export const getAllProducts = async (req, res, next) => {
    
     const { page, limit, starting,numberOfButtonPage } = req.query;
     
     // Convert query parameters to integers
     const pageNumber = parseInt(page);
     const noOfItemPerPage = parseInt(limit);
     const startingNumber = parseInt(starting);
     const numberOfButtonPageNumber= parseInt(numberOfButtonPage);

     // Calculate the number of documents to skip
     let skip = noOfItemPerPage * (startingNumber - 1);

     // Find products with pagination
    try {
       const numberOfItemAvailable = await productModel
         .find({})
         .skip(skip)
         .limit((noOfItemPerPage+1) * numberOfButtonPageNumber)
         .count();
        
        const isNextButtonAvailable = (noOfItemPerPage * numberOfButtonPageNumber) < numberOfItemAvailable ; 

        const numberOfButton = isNextButtonAvailable
          ? numberOfButtonPageNumber
          : Math.ceil(numberOfItemAvailable / noOfItemPerPage);
  
         skip = ((pageNumber*starting) - 1) * noOfItemPerPage;
  
       const products = await productModel
         .find({})
         .skip(skip)
         .limit(noOfItemPerPage);

       return res.status(200).json({
         success: true,
         messgae: "successfully fetched data",
         products,
         numberOfButton,
         isNextButtonAvailable
       });
  
    } catch (error) {

      next(error);

    }

};

export const getUserProducts = async (req, res, next) => {
    
  const userId = req.user._id;
  
  try {

    const products = await productModel.find({userId});
   
    
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products,
      });

  } catch (error) {
   
    next(error);
  
  }
};

export const getProductDetails = async (req, res, next) => {
  
  const { productId } = req.params;

  try {

    const product = await productModel.findById(productId);
   
    
      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        product,
      });

  } catch (error) {
   
    next(error);
  
  }
};

export const addProduct = async(req, res, next)=>{

    const id = req.user._id;
    let product = null;
    
  // this will destructure the req.body object
  const { productName, description, category, price } = req.body;

 try{

  //   this will check any field is empty or not if empty then simply send a error response
  if (!productName || !description || !category || !price ) {

    throw new AppError("please fill all field",401);
    
  }

  // if user don't added any images
  if (!req.files.length) {

    throw new AppError("please add images ", 401);
    
  }

  //   if there is lest than three images has uploaded then simply return a error response
  if (req.files.length < 3) {
    
     throw new AppError("please select atleast 3 images", 401);
   
  }

  const images = req.files;

     product = await productModel.create({
      productName,
      description,
      category,
      price,
      userId: id,
    });

    //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
    
    
    
    const uploadImage = async (image) => {
        
        const productImage = {};

        const result = await fileUploadInCloudinary(image);
       
        if (result) {
          productImage.secure_url = result.secure_url;
          productImage.public_id = result.public_id;
        }
       
        product.images.push(productImage);

    };

    const uploadProductImages = async () => {

      const allPromisses = images.map((image)=>{
        return uploadImage(image);
      })
      
       await Promise.all(allPromisses);
    };

    await uploadProductImages();
    await product.save();

    return res.status(200).json({
      success: true,
      message: "product added successfully",
      product,
    });

  }
   catch (error) {

    if(product){

      await productModel.findByIdAndDelete(product._id);

    }

    next(error);

  }
  finally{

    const deleteFileFromLocal = async()=>{
       const fileRemovePromisses = req.files.map((image) => {
         return fileRemoveFromDisc(image);
       });
       await Promise.all(fileRemovePromisses);
    }

    if ( req.files.length){

      deleteFileFromLocal();
     
    }
        
  }

}

export const updateProduct = async(req, res, next)=>{

  const { productId } = req.params;
  const  userId = req.user._id;
 
  let images = {};

  try {

    const product = await productModel.findOne({ _id: productId, userId });

    if ( !product){
      throw new AppError("no product found",400);
    }
    
    // this will destructure the req.body object
    const { productName, description, category, price } = req.body;
   
      // this will check any field is empty or not if empty then simply send a error response
    if (!productName || !description || !category || !price) {

      throw new AppError("please fill all field", 401);

    }

    product.productName = productName;
    product.description = description;
    product.category = category;
    product.price = price;
    
    

    if (req.files.length) {

      //   if there is lest than three images has uploaded then simply return a error response
      if (req.files.length < 3) {

       throw new AppError("please select atleast 3 images", 401);

      }
      
      const productImages = product.images.map((imageObject) => {
        return imageObject.public_id;
      });
      
      const removeproductImagesFromCloud = async (productsPubicIds) => {
        const removePromisses = productsPubicIds.map((image_id) => {
          return fileRemoveFromCloud(image_id);
        });

        await Promise.all(removePromisses);
      };

      await removeproductImagesFromCloud(productImages);

      product.images = [];
      images = req.files;
      
      //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
      const uploadImage = async (image) => {

        const productImage = {};

        const result = await fileUploadInCloudinary(image);

        if (result) {
          productImage.secure_url = result.secure_url;
          productImage.public_id = result.public_id;
        }

        product.images.push(productImage);

      };

      const uploadProductImages = async () => {
        const allPromisses = images.map((image) => {
          return uploadImage(image);
        });

        await Promise.all(allPromisses);
      };

      await uploadProductImages();
      
    }
    
    await product.save();

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      product
    });
  
 } catch (error) {

    next(error);

  } finally {

    const deleteFileFromLocal = async () => {
      const fileRemovePromisses = req.files.map((image) => {
        return fileRemoveFromDisc(image);
      });
      await Promise.all(fileRemovePromisses);
    };

    if (req.files.length) {
       deleteFileFromLocal();
    }
    
  }  
  
}

export const deleteProduct = async(req, res, next)=>{

    const { productId } = req.params;
    
    try {

        const product = await productModel.findByIdAndDelete(productId);

        if (product) {

          const productImages = product.images.map((imageObject) => {
            return imageObject.public_id;
          });

          const removeproductImagesFromCloud = async (productsPubicIds) => {
            const removePromisses = productsPubicIds.map((image_id) => {
              return fileRemoveFromCloud(image_id);
            });

            await Promise.all(removePromisses);
          };

          await removeproductImagesFromCloud(productImages);

          return res.status(200).json({
            success: true,
            message: "product deleted successfully",
            product,
          });
        }else{

          throw new AppError("no product found",400);

        }
             
        
    } catch (error) {

        next(error);
    }
    
}

export const searchProducts = async (req, res, next)=>{

  const { searchedProductName } = req.params;
  
  try {
    const products = await productModel.find({productName:{$regex:searchedProductName,$options:"i"}});
    
    return res.status(200).json({
      success :true,
      products
    })

  } catch (error) {

    next(error);

  }

}




