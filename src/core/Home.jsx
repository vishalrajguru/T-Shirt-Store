import React, { useState, useEffect } from 'react';
import { API } from '../backend';

import '../Styles.css';
import { Base } from './Base';
import Card from './Card';
import { getProducts } from './coreapicalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadallproducts = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data)
        console.log(data,"setproduct");
      }
    })
    
  }
  useEffect(() => {
    loadallproducts();
  }, [])

  return (
    <Base title='Home Page' description='Welcome to the Tshirt Store'>
      <div className="row text-center">
        <h1 className="text-white">All of Products</h1>
        <div className="row">

          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product}/>


              </div>
            )
          })}
        </div>
      </div>


    </Base>
  )
}
export default Home;
