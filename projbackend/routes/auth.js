const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
router.post(
  "/signup",
  [
    check("name", "username should have min 3 char").isLength({ min: 3 }),
    check("email", "email required").isEmail(),
    check("password", "password should have min 3 char ").isLength({ min: 3 }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "email required").isEmail(),
    check("password", "password field is required ").isLength({ min: 1 }),
  ],
  signin
);
router.get("/signout", signout);
router.get("/testroutes", isSignedIn, (req, res)=>{
  res.send(" This is Protected Route ");
});
module.exports = router;
