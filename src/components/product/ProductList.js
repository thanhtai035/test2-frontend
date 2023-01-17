import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import API from '../misc/api'
import { Link } from 'react-router-dom';


function ProductList({products, showDialog}) {

        return (
            <div className='content'>
            <div className='w3-container' style={{ "margin-top": "200px" }}>
                <div class="w3-responsive">
                    <table class="w3-table w3-striped w3-bordered w3-xlarge">
                        <tr className='w3-green'>
                            <th>
                                Code
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                        {products.map(product =>
                            <tr>
                                <th>
                                    {product.code}
                                </th>
                                <th>
                                    {product.name}
                                </th>
                                <th>
                                    {product.description}
                                </th>
                                <th>
                                    <Link exact to={'/update-product?code=' + product.code} key={product.code} className='w3-button w3-card w3-green'>Update</Link>
                                    
                                    <button key={product.code} className='w3-button w3-card w3-red' onClick={() => showDialog(product.code)}>Delete</button>
                                </th>
                                <th></th>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
            <Link exact to={'/add-product'} className="w3-button w3-black w3-xlarge w3-padding w3-right">Add Product</Link>

        </div>
            );
    }


export default ProductList