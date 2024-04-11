import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  searchProducts,
  updateProduct,
} from "../controllers/product.controller.js";

import {
  upload,
} from "../middlewares/multer.middleware.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const productRoute = Router();

// to get all products in home page
productRoute.route("/all-products").get(getAllProducts);

// to search products
productRoute.route("/search-products/:searchedProductName").get(searchProducts);

// to get user products
productRoute.route("/user-products").get(isLoggedIn, getUserProducts);

// to add a product
productRoute
  .route("/add-product")
  .post(isLoggedIn, upload.array("images", 5), addProduct);

// to update a particular product
productRoute
  .route("/update-product/:productId")
  .put(isLoggedIn, upload.array("images", 5), isLoggedIn, updateProduct);

// to delete a product
productRoute.route("/delete-product/:productId").delete(deleteProduct);

export default productRoute;
