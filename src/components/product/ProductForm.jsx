import React, { Component, useState } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import API from '../misc/api'
import { Link, useParams } from 'react-router-dom';
import Product from './Product';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            name: '',
            description: '',
            categories: ['']
        }
    }



    addCategory = () => {
        let buf = this.state.categories
        buf.push('')
        this.setState(
            {
                categories: buf
            }
        )

    }

    removeCategory = (index) => {
        let num = this.state.categories.length
        if (num > 1) {
            let buf = [...this.state.categories];
            buf.splice(index, 1)
            this.setState(
                {
                    categories: buf
                }
            )
        }
    }

    handleCategory = (index, e) => {
        const { name, value } = e.target;

        const list = [...this.state.categories];
        list[index] = value;
        this.setState(
            {
                categories: list
            }
        )

    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState({
            [id]: value
        })
    }

    saveProduct = async (event) => {
        event.preventDefault()
        const product = this.state

        let method = 'POST'
        let url = 'http://localhost:8080/api/products'

        console.log(product)
        API.request({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await this.props.authState.accessToken.accessToken
            },
            data: JSON.stringify(product)
        })
            .then(() => {
                window.location.replace('/products');
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        const checkPath = this.props.match.path.localeCompare("/add-product")
        const showCode = checkPath == 0 ? { "display": "block" } : { "display": "none" }
        const msg = checkPath == 0 ? "Add new product" : "Update Product"

        let product = { ...this.state }
        product.code = checkPath == 1 ? new URLSearchParams(this.props.location.search).get('code') : ''


        return (
            <div id="form">
                <form class="w3-container" style={{ margin: "250px" }} onsubmit="return false">
                    <h1 className='w3-margin w3-text-black w3-xxxlarge'>{msg}</h1>
                    <div style={showCode}>
                        <label class="w3-text-black w3-xlarge"><b>Code </b></label>
                        <input class="w3-input w3-border w3-text-black" id="code" onChange={this.handleChange} value={this.state.code} type="text" required />
                    </div>
                    <div>
                        <label class="w3-text-black w3-xlarge"><b>Name </b></label>
                        <input class="w3-input w3-border w3-white" id="name" onChange={this.handleChange} value={this.state.name} type="text" required />
                    </div>
                    <div>
                        <label class="w3-text-black w3-xlarge"><b>Description</b></label>
                        <input class="w3-input w3-border w3-white" id="description" onChange={this.handleChange} value={this.state.description} type="text" required />
                    </div>
                    <div className='w3-container'>
                        <label class="w3-text-black w3-xlarge"><b>Category</b></label>
                    </div>
                    <div id='categoryList'>

                    </div>

                    {
                        this.state.categories.map((category, index) => (
                            <div>
                                <input class="w3-input w3-border w3-white w3-left" value={category} required type='text' id={index} onChange={(evnt) => this.handleCategory(index, evnt)}></input>
                                <button class="w3-button w3-red" type="button" onClick={() => this.removeCategory({ index })}> X</button>
                            </div>
                        ))}


                    <div>
                        <button class="w3-button w3-green w3-large w3-margin" type="button" onClick={this.addCategory}> Add Category <i class="fa fa-plus"></i></button>
                    </div>
                    <Link exact to='/products' className='w3-button w3-red w3-padding w3-large'>Cancel</Link>
                    <button class="w3-btn w3-teal w3-large w3-bordered w3-margin" onClick={this.saveProduct}>Submit</button>

                </form>            </div>
        )
    }
}

export default withOktaAuth(ProductForm)