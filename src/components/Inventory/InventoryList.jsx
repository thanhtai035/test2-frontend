import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import { Link } from 'react-router-dom';


function InventoryList({ mos, showDialog, setToDone }) {
    console.log(mos)
    return (
        <div className='content'>
            <div className='w3-container' style={{ "margin-top": "200px" }}>
                <div class="w3-responsive">
                    <table class="w3-table w3-striped w3-bordered w3-xlarge">
                        <tr className='w3-green'>
                            <th>
                                Name
                            </th>
                            <th>
                                Begin
                            </th>
                            <th>
                                Total In
                            </th>
                            <th>
                                Total Out
                            </th>
                            <th>
                                Available
                            </th>

                        </tr>
                        {mos.map((product, index) => {

                            return (
                                <tr>
                                    <th>
                                        {product.name}
                                    </th>
                                    <th>
                                        {product.begin}
                                    </th>
                                    <th>
                                        {product.totalIn}
                                    </th>
                                    {product.totalOut}

                                    <th>
                                        {product.available}
                                    </th>
                                    <th>
                                    </th>
                                    <th></th>
                                </tr>


                            )
                        }
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}


export default InventoryList