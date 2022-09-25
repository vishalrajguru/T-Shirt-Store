import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Cart from "./core/Cart";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import AddCategory from "./admin/helper/AddCategory";
import ManageCategories from "./admin/helper/ManageCategories";
import AddProduct from "./admin/helper/AddProduct";
import ManageProduct from "./admin/helper/ManageProduct";
import UpdateProduct from "./admin/helper/UpdateProduct";

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/category"
          exact
          component={ManageCategories}
        />
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={AddProduct}
        />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoutes
          path="/admin/products"
          exact
          component={ManageProduct}
        />
        <AdminRoutes
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
