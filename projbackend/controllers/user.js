const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "no user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};
exports.getUser = (req, res) => {
  // req.profile.salt = undefined;
  // req.profile.encry_password = undefined;
  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to modify",
        });
      }
      // req.user.salt = undefined;
      // req.user.encry_password = undefined;
      res.json(user);
    }
  );
};
exports.userPurchaseList= (req, res)=>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No order found in this account"
            });
        }
        return res.json(order);
    })
}
exports.pushOrderInPurchaseList= (req, res, next)=>{
    let purchases=[]
    req.body.products.forEach(product=>{
        purchases.push({
                _id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                amount: req.body.order.amount,
                transaction: req.body.order.transaction_id
        });
    });
    //store this in db
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases : purchases}},
        {new: true},
        (err, purchases)=>{
            if(err){

                return res.status(400).json({
                    error: "Item can not be added to purchase list"
                });
            }

            next();

        }
    
);

}
