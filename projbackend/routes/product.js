const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllUniqueCategories
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
//param
router.param("userId", getUserById);
router.param("productId", getProductById);

//actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
router.get("/products", getAllProducts);
router.get("/product/:productId", getProductById);
router.get("/procuts/categories", getAllUniqueCategories);
//delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
//update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
module.exports = router;
