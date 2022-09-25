import { API } from '../backend';
import React from 'react'

export const getProducts = () => {
    return fetch(`${API}/products`, { method: "GET" })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
};

