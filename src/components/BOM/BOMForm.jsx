import React, { Component, useState } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import API from '../misc/api'
import { Link, useParams } from 'react-router-dom';

class BOMForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : {},
            title: '',
            components: [''],
            quantity: [0]
        }
    }

    async componentDidMount() {
       this.getData()
    }


    addCategory = () => {
        let buf = this.state.components
        let buf2 = this.state.quantity
        buf.push('')
        buf2.push(0)
        this.setState(
            {
                components: buf,
                quantity: buf2
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

    handleComponents = (index, e) => {
        const { name, value } = e.target;

        const list = [...this.state.components];
        list[index] = value;
        this.setState(
            {
                components: list
            }
        )

    }

    handleQuantity = (index, e) => {
        const { name, value } = e.target;

        const list = [...this.state.quantity];
        list[index] = value;
        this.setState(
            {
                quantity: list
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
        var obj = new Object()
        obj.title = this.state.title
        obj.components = new Object()
        event.preventDefault()
        for (let i = 0; i < this.state.components.length; i++) {
            let key = this.state.components[i]
            let num = this.state.quantity[i]
            obj.components[key] = parseInt(num)
        }
        console.log(JSON.stringify(obj))

        let method = 'POST'
        let url = 'http://localhost:8080/api/bom'
        API.request({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await this.props.authState.accessToken.accessToken
            },
            data: JSON.stringify(obj)
        })
            .then(() => {
                window.location.replace('/bom');
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        const checkPath = this.props.match.path.localeCompare("/add-bom")
        const showCode = checkPath == 0 ? { "display": "block" } : { "display": "none" }
        const msg = checkPath == 0 ? "Add new Bill Of Material" : "Update Bill Of Material"

        let product = { ...this.state }
        product.code = checkPath == 1 ? new URLSearchParams(this.props.location.search).get('title') : ''

        return (
            <div id="form" action="javascript:void(0);" onSubmit={this.saveProduct}>
                <form class="w3-container" style={{ margin: "250px" }} onsubmit="return false">
                    <h1 className='w3-margin w3-text-black w3-xxxlarge'>{msg}</h1>
                    <div className='w3-row'>

                        <div style={showCode}>
                            <label class="w3-text-black w3-xlarge"><b>Title </b></label>
                            <input class="w3-input w3-border w3-white" id="title" onChange={this.handleChange} value={this.state.title} type="text" required />
                        </div>
                        {
                            this.state.components.map((component, index) => (
                                <div className='w3-col'>
                                    <label class="w3-text-black w3-xlarge"><b>Component</b></label>

                                    <input class="w3-input w3-border w3-white w3-left" value={component} required type='text' id={index} onChange={(evnt) => this.handleComponents(index, evnt)}></input>
                                </div>
                            ))}
                        {
                            this.state.quantity.map((value, index) => (
                                <div>
                                    <label class="w3-text-black w3-xlarge"><b>Quantity</b></label>
                                    <input class="w3-input w3-border w3-white w3-left" value={value} required min={1} type='number' id={index} onChange={(evnt) => this.handleQuantity(index, evnt)}></input>
                                    <div>
                                        <button class="w3-button w3-red" type="button" onClick={() => this.removeCategory({ index })}> X</button>

                                    </div>
                                </div>
                            ))}
                    </div>


                    <div>
                        <button class="w3-button w3-green w3-large w3-margin" type="button" onClick={this.addCategory}> Add Component <i class="fa fa-plus"></i></button>
                    </div>
                    <Link exact to='/bom' className='w3-button w3-red w3-padding w3-large'>Cancel</Link>
                    <button class="w3-btn w3-teal w3-large w3-bordered w3-margin" type='submit'>Submit</button>

                </form>
            </div>
        )
    }
}

export default withOktaAuth(BOMForm)