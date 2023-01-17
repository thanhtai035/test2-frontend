import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import { Link } from 'react-router-dom';


function MPOList({ mos, showDialog, setToDone }) {
    return (
        <div className='content'>
            <div className='w3-container' style={{ "margin-top": "200px" }}>
                <div class="w3-responsive">
                    <table class="w3-table w3-striped w3-bordered w3-xlarge">
                        <tr className='w3-green'>
                            <th>
                            Material Orders
                            </th>
                            <th>
                            
                            </th>
                            <th>

                            </th>
                        
                  
                        </tr>
                        {mos.map((product, index) => {
                            const linkVisibility = product.done ? { "display": "none" } : { "display": "block" }
                            const isDone = product.done ? "Done" : "pending"
                            const compo = Object.keys(product.components)
                            const num = Object.values(product.components)
                            return (
                                <div>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            {product.date}
                                        </th>

                                        <th>
                                            {isDone}
                                        </th>
                                        <th>
                                            <button key={product.id} onClick={() => setToDone(product.id)} className='w3-button w3-card w3-green' style={linkVisibility}>Set To Done </button>
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
        </div>
    );
}


export default MPOList