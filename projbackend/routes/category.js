const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { removeCategory,getCategoryById,createCategory,getAllCategory,getCategory,updateCategory} = require("../controllers/category");
//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);
//actual routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories",getAllCategory);
//update
router.put(         
    "/category/:categoryId/:userId", 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
    );

//delete
router.delete(
    "/category/:categoryId/:userId", 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
    );

module.exports = router;
