const Category = require("../models/category");




exports.getCategoryById= (req, res, next, id)=>{
    Category.findById(id).exec((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category= category;
        next();
    });
};
exports.createCategory= (req, res,)=>{
    const category = new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "not able to save category in db"
            })
        }
        res.json({category});
    });
};
exports.getCategory=(req, res)=>{
   return res.json(req.category)
};
exports.getAllCategory=(req, res, next)=>{
    Category.find().exec((err, items)=>{
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(items);
        next();
    });
};
exports.updateCategory=(req, res)=>{
    const category= req.category;
    category.name= req.body.name;
    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to Update Category"
            })
        }
        res.json(updatedCategory);
        });
};
exports.removeCategory=(req, res)=>{
    const category= req.category;
    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to Remove Category"
            })
        }
        res.json({
            msg: `${category} Successfully Deleted`
        });
    })

}