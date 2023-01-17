import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import { Link } from 'react-router-dom';


function MOList({ mos, showDialog, setToDone }) {
    return (
        <div className='content'>
            <div className='w3-container' style={{ margin: "200px" }}>
                <div class="w3-responsive">
                    <table class="w3-table w3-striped w3-bordered w3-xlarge">
                        <tr className='w3-green'>
                            <th>
                                Client
                            </th>
                            <th>
                                Start Date
                            </th>
                            <th>
                                Delivery Date
                            </th>
                            <th>
                                End Date
                            </th>
                            <th>
                                Status
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                        {mos.map(product => {
                            const linkVisibility = product.done ? { "display": "none" } : { "display": "block" }
                            const isDone = product.done ? "Done": "pending"
                            const compo = Object.keys(product.productDetails)
                            const num = Object.values(product.productDetails)
                            return (
                                <tr>
                                    <th>
                                        {product.client}
                                    </th>
                                    <th>
                                        {product.startDate}
                                    </th>
                                    <th>
                                        {product.deliveryDate}
                                    </th>
                                    <th>
                                        {product.endDate}
                                    </th>
                                    <th>
                                        {isDone}
                                    </th>
                                    <th>
                                        <button key={product.id} onClick={() => setToDone(product.id)} className='w3-button w3-card w3-green' style={linkVisibility}>Set To Done </button>

                                        <button key={product.id} className='w3-button w3-card w3-red' onClick={() => showDialog(product.id)}>Delete</button>
                                    </th>
                                    <th></th>
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
                                </tr>
                            )
                        }
                        )}
                    </table>
                </div>
            </div>
            <Link exact to={'/add-mo'} className="w3-button w3-black w3-xlarge w3-padding w3-right" style={{ "margin-right": "200px" }}>New Manufactoring Order</Link>
        </div>
    );
}


export default MOList