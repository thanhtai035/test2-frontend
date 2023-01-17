import React, { useState, useEffect } from "react"
import { Route } from 'react-router-dom'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
import { useHistory } from 'react-router-dom';
import Navbar from './components/common/Navbar'

import Product from "./components/product/Product";
import ProductForm from "./components/product/ProductForm";
import BOMForm from "./components/BOM/BOMForm";
import MO from "./MO/MO";
import MPO from "./components/MPO/MPO";
import BOM from "./components/BOM/BOM";
import MOForm from "./MO/MOForm";
import Inventory from "./components/Inventory/Inventory";

function App() {

  const oktaAuth = new OktaAuth({
    issuer: `https://dev-27044634.okta.com/oauth2/default`,
    clientId: `0oa7xj2om73nhXae15d7`,
    redirectUri: `${window.location.origin}/implicit/callback`
  })

  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} >
      <div className="App"> 
        <Navbar />

        <SecureRoute path='/customer' exact component={Product} />
        <SecureRoute path='/products' exact component={Product} />
        <SecureRoute path='/add-product' component={ProductForm} />
        <SecureRoute path='/add-bom' component={BOMForm} />
        <SecureRoute path='/update-product' component={ProductForm} />
        <SecureRoute path='/mo' component={MO} />
        <SecureRoute path='/mpo' component={MPO} />
        <SecureRoute path='/bom' component={BOM} />
        <SecureRoute path='/add-bom' component={BOMForm} />
        <SecureRoute path='/update-bom' component={BOMForm} />
        <SecureRoute path='/add-mo' component={MOForm} />
        <SecureRoute path='/update-mo' component={MOForm} />
        <SecureRoute path='/inventory' component={Inventory} />
        <Route path='/implicit/callback' component={LoginCallback} />
      </div>
    </Security>
  )
}

export default App
