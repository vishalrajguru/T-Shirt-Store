const Product = require("../models/product");
const http = require("http");
const { formidable} = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product not found",
        });
      }
      res.json(product);
      req.product = product;
      next();
    });
};
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product ",
      });
    }
   return res.status(200)
  });
};
exports.updateProduct = (req, res) => {
  
  let product = req.product;
  // console.log(req.body)
  // console.log(product)
    product = _.extend(product, req.body )  
    //save to the Database
    product.save((err, productnew) => {
      if (err) {
        return res.status(400).json({
          error: "unable to update product"
        });
      }
      return res.status(200);
    });
  }
exports.getAllProducts = (req, res, next) => {
  let limit= req.body.limit ? parseInt(req.body.limit):4;
  let sortBy= req.body.sortBy ? req.body.sortBy : "_id";


  Product.find()
  .limit(limit)
  .populate("category")
  .sort([[sortBy, "asc"]])
  .exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "No Product Found",
      });
    }
    res.json(items);
    next();
  });
}; 
exports.createProduct = (req, res) => {
  // console.log(req.body)
  // let product = new Product(req.body);
  // console.log(product);
  // let form = new formidable.IncomingForm  ;
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, file) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "problem with image",
  //     });
  //   }
  //   console.log(fields);
  //   console.log(file);

    const { name, description, price, stock, category,url } = req.body;
    if (!name || !description || !price || !stock || !category || !url) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }
    let product = new Product(req.body);

    //handle files here
    // if (file.photo) {
    //   if (file.photo.size > 3000000) {
    //     return res.status(400).json({
    //       error: "file size too big",
    //     });
    //   }
    //   product.photo.data = fs.readFileSync(file.photo.path);
    //   product.photo.contentType = file.photo.type;
    // }
    //save to the Database
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "unable to save product to database ",
        });
      }
      res.json(product);
    });
  // });
};
exports.updateStock=(req, res, next)=>{
  let myOperation= req.body.order.product.map(prod=>{
    return {
      updateOne:{
        filter: {_id: prod._id},
        update:{$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
  })
  Product.bulkWrite(myOperation, {}, (err, product)=>{
    if(err){
      return res.status(400).json({
        error: "Bulk operation failed"
      }) 
 
    }
    next();
  })
}
exports.getAllUniqueCategories=(req, res)=>{
  Product.distinct("category", {},(err, category)=>{
    if(err){
      return res.status(400).json({
        error: "No categories found"
      })
    }
    res.json(category);
  } )
}
