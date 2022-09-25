import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { addItemsToCart } from '../admin/helper/CartHelper'

const Card = (product, addtoCart = true, removeFromCart = false) => {
    const [setNames, setSetNames] = useState({
        cardTitle: "",
        cardDescription: "",
        cardPrice: "",
        cardImgUrl:""
    })
    const [count, setCount] = useState(product.count)
    const [redirect, setRedirect] = useState(false)
    const additemtocart=()=>{
        addItemsToCart(product, ()=>setRedirect(true))
    }
    const getAredirect=redirect=>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }
    const [products, setProducts] = useState([])
    const { cardTitle, cardDescription, cardPrice, cardImgUrl } = setNames
 
    const showAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <button
                    onClick={additemtocart}
                    className="btn btn-block btn-outline-success mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }
    const showremoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                onClick={() => { }}
                className="btn btn-block btn-outline-danger m-2 mb-2">
                    Remove from cart
                </button>
            )
        )
    }
    useEffect(() => {
        console.log(products,"new");
        setSetNames({
            cardTitle: product ? product?.product?.name : 'A photo from pixel',
            cardDescription: product ? product?.product?.description : 'A good product you will ever have',
            cardPrice: product ? product?.product?.price : '$10',
            cardImgUrl: product ? product?.product?.url : '$10',
        })}, [])
        console.log(setNames,"set");


        return (
            <div className='card text-white bg-dark border text-center border-info'>
                <div className="card-header lead">{cardTitle}</div>
                <div className="card-body">
                    <div className="rounded p-2">
                        <img src={cardImgUrl} alt="" 
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                            className="mb-1 rounded"
                        />
                    </div>
                    {getAredirect(redirect)}
                    <p className="lead bg-success font-weight-normal text-wrap p-1 mt-1">
                        {cardDescription}
                    </p>
                    <p className="btn btn-info rounded btn-sm px-4">${cardPrice}</p>
                    <div className="row">
                        <div className="col-12">
                            {showAddToCart(addtoCart)}
                            {showremoveFromCart(removeFromCart)}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

export default Card;