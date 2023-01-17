import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { withOktaAuth } from '@okta/okta-react'
import M from 'materialize-css'
import 'w3-css/w3.css'

class Navbar extends Component {
  state = {
    authenticated: false,
    user: null
  }

  async componentDidMount() { 
    this.checkAuthentication()

    
  }

  async componentDidUpdate() {
    this.checkAuthentication()
  }

  checkAuthentication = async () => {
    if (this.props.authState) {
      const authenticated = await this.props.authState.isAuthenticated
      if (authenticated !== this.state.authenticated) {
        const user = await this.props.oktaAuth.getUser()
        this.setState({ authenticated, user })
      } 
    }
  }

  logHandleLogInOut = async () => {
    this.state.authenticated ? this.props.oktaAuth.signOut('/') : this.props.oktaAuth.signInWithRedirect('/')
  }

  render() {
    const linkVisibility = this.state.authenticated ? { "display": "block" } : { "display": "none" }
    const username = this.state.authenticated && this.state.user.preferred_username
    const logInOut = this.state.authenticated ? "Sign Out" : "Sign In"

    return (
      <div className="w3-top" id="navBar">
        <div className="w3-bar w3- w3-card">
          <p className="w3-padding-large w3-bar-item w3-left w3-cursive w3-wide w3-large w3-margin w3-hide-small"> PHUONG HAI</p>
          <Link exact to="/" className="w3-padding-large w3-button w3-bar-item w3-right w3-large w3-margin right" id='loginBtn' onClick={this.logHandleLogInOut}>{logInOut}</Link>
          <Link exact to="/products" className="w3-padding-large w3-button w3-bar-item w3-right w3-large w3-margin right" style={linkVisibility}>Products</Link>
          <Link exact to="/mo" className="w3-padding-large w3-button w3-bar-item w3-right w3-large w3-margin right" style={linkVisibility}>Manufacturing Order</Link>
          <Link exact to="/bom" className="w3-padding-large w3-button w3-bar-item w3-right w3-large w3-margin right" style={linkVisibility}>Bill Of Material</Link>
          <Link exact to="/mpo" className="w3-padding-large w3-button w3-bar-item w3-right w3-large w3-margin right" style={linkVisibility}>Material Purchase Order</Link>
          <Link exact to="/inventory" className="w3-padding-large w3-button w3-bar-item w3-right w3-large w3-margin right" style={linkVisibility}>Inventory</Link>

        </div>
      </div>
    )
  }
}

export default withOktaAuth(Navbar)