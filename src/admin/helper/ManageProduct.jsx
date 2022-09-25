import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth/helper'
import { Base } from '../../core/Base'
import { deleteProduct, getProducts } from './adminApiCall'


const ManageProduct = () => {
    const [msg, setMsg] = useState({
        error: false,
        success: false
    })
    const {success, error}= msg;
    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left"><div className="alert alert-success"
              style={{ display: success ? "" : "none" }}
    
            >
               Product has been deleted Successfully!!
    
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
              Unable to delete product
            </div>
          </div>
        </div>
        )
      }
    const goBack = () => {
        return <div className="mt-3">
            <Link className='btn btn-sm btn-dark mb-3' to="/admin/dashboard">Admin Home</Link>
        </div>
    }
    const { user, token } = isAuthenticated();
    const [products, setProducts] = useState([])

    const preload = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        }).catch(error => {
            console.log(error);
        })

        // console.log(products);
    }
    const deleteTheProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                setMsg({...msg,error: data.error });
               
            } else {
                setMsg({...msg, success: true });
                setTimeout(() => {
                    setMsg({success: false})
                  }, 4000);
                preload();
            }
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        // 
        preload();

    }, [])







    return (<Base className="container py-2 bg-info m-5" title='Welcome' description='Manage your product here'>
        {goBack()}
        {errorMessage()}
        {successMessage()}
        <h3 className='mb-4'>All Products:</h3>
        <div className="row">
            <div className="col-12">
                <h2 className="text-center text-white my-3">Total product 3</h2>
                {/* {    console.log("this is state ",products)} */}
                {products.map((item, index) => {
                    return (<div key={index} className="row text-center mb-2">
                        <div className="col-4">
                            <h3 className="text-left text-white">{item.name}</h3>
                        </div>
                        <div className="col-4">
                            <Link className="btn btn-success" to={`/admin/product/update/${item._id}`}>Update</Link>
                        </div>
                        <div className="col-4">
                            <button onClick={() => { deleteTheProduct(item._id) }} className='btn btn-danger'>Delete</button>
                        </div>

                    </div>)
                })}
            </div>
        </div>

    </Base>
    )
}

export default ManageProduct