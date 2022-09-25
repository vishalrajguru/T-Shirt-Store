import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import { Base } from '../../core/Base';
import { createaProduct, getCategories, getProduct, updateProduct } from './adminApiCall';


const UpdateProduct = ({ match }) => {
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    url: "",
    categories: [],
    category: "",
    loading: false,
    createProduct: "",
    getRedirect: false,
    formData: "",
    error: false,
    success: false,

  })
  const { name, error, success, description, price, url, stock, categories, category, loading, createProduct, getRedirect, formData } = value;
  const preload = (productId) => {
    getProduct(productId).then(data => {
      // console.log(data);
      if (data.error) {
        setValue({ ...value, error: data.error })
      } else {
        getPreloadCategories();
        setValue({
          ...value,
          name: data.name,
          description: data.description,
          category: data.category._id,
          price: data.price,
          stock: data.stock,
          url: data.url
        }
        )
      }
    })
  }
  const getPreloadCategories = () => {
    getCategories().then(data => {
      console.log(data);
      if (data.error) {
        setValue({ ...value, error: data.error })
      } else {
        setValue({ categories: data }
        )

      }
    })
  }
  useEffect(() => {
    
    preload(match.params.productId);
    getPreloadCategories();
  }, [])


  const { user, token } = isAuthenticated();
  const handleOnchange = name => event => {

    setValue({
      ...value, [name]: event.target.value
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: "", loading: true })

    //backend req   
    updateProduct(match.params.productId, user._id, token, { name, description, price, stock, category, url })
      .then(data => {
        if (data.error) {
          setValue({ ...value, error: data.error })
        } else {
          setValue({
            ...value,
            name: "",
            description: "",
            price: "",
            stock: "",
            url: "",
            loading: false,
            createProduct: data.name,
            success: true,
            error: "",
            getRedirect: true
          });

          setTimeout(() => {
            setValue({ success: false })
          }, 4000);
        }
      }
      ).catch(err => (console.log(err)))

  }
  const performRedirect = () => {
    if(getRedirect){
      return <Redirect to="/admin/dashboard"/> 
    }
    }
 
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left"><div className="alert alert-success"
          style={{ display: success ? "" : "none" }}

        >
          {createProduct} Product has been Updated Successfully!!

        </div>
        </div>
      </div>
    )
  }
  const errorMessage = () => {
    return (<div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
          style={{ display: error ? "" : "none" }}

        >
          {error}
        </div>
      </div>
    </div>
    )
  }
  const goBack = () => {
    return <div className="mt-5">
      <Link className='btn btn-sm btn-dark mb-3' to="/admin/dashboard">Admin Home</Link>
    </div>
  }
  const updateProductForm = () => (
    <div className="form-group col-9 container">
      <p className="lead">Enter the Details of Product</p>

      <input type="text" className="form-control my-3"
        autoFocus
        onChange={handleOnchange("name")}
        value={name}
        required
        placeholder='Name'

      />
      <input type="text" className="form-control my-3"
        autoFocus
        onChange={handleOnchange("description")}
        value={description}
        required
        placeholder='Description...'

      />
      <select className="form-control my-3"
        onChange={handleOnchange("category")}
        value={category}
      >
        <option>Select Category</option>
        {categories && (
          categories.map((category, index) => (
            <option key={index} value={category._id}>{category.name}</option>
          ))
        )}

      </select>
      <input type="number" className="form-control my-3"
        autoFocus
        onChange={handleOnchange("price")}
        value={price}
        required
        placeholder='Price'

      />
      <input type="number" className="form-control my-3"
        autoFocus
        onChange={handleOnchange("stock")}
        value={stock}
        required
        placeholder='Quantity'

      />
      <input type="text" className="form-control my-3"
        autoFocus
        onChange={handleOnchange("url")}
        value={url}
        required
        placeholder='ImgUrl'

      />
      <button onClick={onSubmit} className="btn bg-success btn-success">Update Product</button>

    </div>

  )
  return (
    <Base className="container p-4 bg-info m-5" title='Create a Product' description='Add a new product'>
      {successMessage()}
      {errorMessage()}
      {updateProductForm()}
      {goBack()}
      {performRedirect()}


    </Base>

  )
}

export default UpdateProduct;