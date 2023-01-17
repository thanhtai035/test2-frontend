import React from "react"
import { Link, NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <>
            <nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top"  id="mySidebar">
                <div class="w3-container w3-display-container w3-padding-16">
                </div>
                <div class="w3-padding-64 w3-large w3-text-black w3-xlarge" id="sideBarBold">
                    <Link exact to='/products' class="w3-bar-item w3-button">Product</Link>
                    {/* <a th:href="@{/}" class="w3-bar-item w3-button">Home</a>
                    <a th:href="@{/admin/items/}" class="w3-bar-item w3-button">Items</a>
                    <a th:href="@{/admin/orders/}" class="w3-bar-item w3-button">Orders</a>
                    <a th:href="@{/admin/accounts}" class="w3-bar-item w3-button">Accounts</a> */}
                </div>
            </nav>
        </>
    )
}

export default SideBar