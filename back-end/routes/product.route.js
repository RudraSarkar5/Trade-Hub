import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  searchProducts,
  updateProduct,
} from "../controlers/product.controler.js";

import { handleMulterError, upload } from "../middlewares/multer.middleware.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.middlewars.js";

const productRoute = Router();

productRoute.route("/all-products").get(getAllProducts);
productRoute.route("/search-products/:searchedProductName").get(searchProducts);
productRoute.route("/user-products").get(isLoggedIn, getUserProducts);
productRoute
  .route("/add-product")
  .post(isLoggedIn, upload.array("images", 5), handleMulterError, addProduct);
productRoute
  .route("/update-product/:productId")
  .put(isLoggedIn, upload.array("images", 5), handleMulterError, updateProduct);
productRoute.route("/delete-product/:productId").delete(deleteProduct);

export default productRoute;
