import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import { Link } from 'react-router-dom';


function BOMList({ products, showDialog, setToDone }) {
    return (
        <div className='content'>
            <div className='w3-container' style={{ "margin-top": "200px", "margin-left": "200px" }}>
                <div class="w3-responsive">
                    <table class="w3-table w3-striped w3-bordered w3-xlarge">
                        <tr className='w3-green'>
                            <th>
                                Bill Of Material
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                        {products.map(product => {
                            const compo = Object.keys(product.components)
                            const num = Object.values(product.components)
                            return (
                                <div>
                                    <tr>
                                        <th>
                                            Bill Of Material For: {product.title}
                                        </th>
                                        <th>
                                            <Link exact to={'/update-bom?title=' + product.title} className='w3-button w3-card w3-green'>Update</Link>
                                            <button key={product.title} className='w3-button w3-card w3-red' onClick={() => showDialog(product.title)}>Delete</button>
                                        </th>
                                        <th></th>
                                    </tr>
                                    <tr className='w3-xlarge'>
                                        Component List
                                    </tr>
                                    {compo.map((comp, i) => {
                                        return (
                                            <tr>
                                                <th>
                                                    {comp}
                                                </th>
                                                {num[i]}
                                            </tr>
                                        )
                                    })
                                    }
                                </div>
                            )
                        }
                        )}
                    </table>
                </div>
            </div>
            <Link exact to={'/add-bom'} className="w3-button w3-black w3-xlarge w3-padding w3-right" style={{ "margin-right": "200px" }}>New Bill Of Material</Link>

        </div>
    );
}


export default BOMList