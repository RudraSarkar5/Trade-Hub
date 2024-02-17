import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getUserProducts, updateProduct } from "../controlers/product.controler.js";
import { handleMulterError, upload } from "../middlewares/multer.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const productRoute = Router();

productRoute.get("/all-products",getAllProducts);
productRoute.get("/user-products", isLoggedIn,getUserProducts);
productRoute.post(
  "/add-product",
  isLoggedIn,
  upload.array("images", 5),
  handleMulterError,
  addProduct
);
productRoute.put(
  "/update-product",
  isLoggedIn,
  upload.array("images", 5),
  handleMulterError,
  updateProduct
);
productRoute.delete("/delete-product/:productId",deleteProduct);

export default productRoute;