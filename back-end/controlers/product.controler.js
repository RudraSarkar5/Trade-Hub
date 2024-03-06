import productModel from "../models/product.model.js"
import cloudinary from "cloudinary";
import fs from "fs";
import { fileRemoveFromCloud,
        fileRemoveFromDisc,
        fileUploadInCloudinary
       } from "../utility/fileManage.js";

export const getAllProducts = async (req, res) => {
    
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
   
    console.log("user product not found ",error.message);
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

 try{

  //   this will check any field is empty or not if empty then simply send a error response
  if (!productName || !description || !category || !price ) {
    return res.status(401).json({
      success: false,
      message: "please fill all field",
    });
  }

  // if user don't added any images
  if (!req.files.length) {
    return res.status(401).json({
      success: false,
      message: "please add images ",
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

        const result = await fileUploadInCloudinary(image);
       
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
      value : product
    });

  }
   catch (error) {

    console.log(error.message);

    await productModel.findByIdAndDelete(product._id);

    return res.status(500).json({
        success : false,
        message : error.message
    })

  }
  finally{

    
    if ( req.files.length){
      fileRemoveFromDisc(req.files);
    }
        
  }

}

export const updateProduct = async(req,res)=>{

  const { productId } = req.params;
 
  let images = {};

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
    
    

    if (req.files.length > 0) {
      //   if there is lest than three images has uploaded then simply return a error response
      if (req.files.length < 3) {
        return res.status(401).json({
          success: false,
          message: "please select atleast 3 images",
        });
      }
      const existedImagesInDb = product.images;
      fileRemoveFromCloud(existedImagesInDb);
      product.images = [];
      images = req.files;
      
      //   this function will upload all imgaes to cloudinary and simply set all the link to product collection named images array
     const uploadImages = async () => {
      for (const image of images) {
        
        const productImage = {};

        const result = await fileUploadInCloudinary(image);
       
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
      value : product
    });
  }
 } catch (error) {

  console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });

  } finally {

    if(req.files.length){
     fileRemoveFromDisc(req.files);
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

        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : "product not deleted successfully..."
        })
    }
    
}

export const searchProducts = async (req,res)=>{
  const { searchedProductName } = req.params;
  console.log(searchedProductName);
  
  try {
    const products = await productModel.find({productName:{$regex:searchedProductName,$options:"i"}});
    return res.status(200).json({
      success :true,
      products
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success : false,
      message : "not getting product ..."
    })
  }
}




