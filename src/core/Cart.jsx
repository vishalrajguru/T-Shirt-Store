import React, { useState, useEffect } from 'react';
import { loadCart } from '../admin/helper/CartHelper';
import { API } from '../backend';
import '../Styles.css';
import { Base } from './Base';
import Card from './Card';
import { getProducts } from './coreapicalls';

const Cart = () => {
    const [products, setProducts] = useState([]);    
    useEffect(() => {
        setProducts(loadCart());
        console.log(products,"cartpage");
    }, [])
    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((item, index) => (
                    
                    <Card
                        key={index}
                        product={item}
                        addtoCart={false}
                        removeFromCart={true}
                        />
                        
                ))}
            </div>
        );

    };
    const checkOut = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )

    }
    return (
        <Base title='Cart' description='Checkout page'>
            <div className="row">
                <div className="col-6">
                    {loadAllProducts()}
                </div>
                <div className="col-6">
                    {checkOut()}
                </div>
            </div>
        </Base>
    )
}
export default Cart;
