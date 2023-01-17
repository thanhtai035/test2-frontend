import React from 'react'
import { Link } from 'react-router-dom'


function Pagination(page, totalPage, url) {
    const previousPage = page - 1
    const nextPage = page + 1
    const minPage = page == 1 ? { "display": "block" } : { "display": "none" }
    const maxPage = page == totalPage ? { "display": "block" } : { "display": "none" }

    return (
        <div class="w3-bar">
            <Link className='w3-button'>{previousPage}</Link>
            <Link className='w3-button'>{page}</Link>
            <Link className='w3-button'>{nextPage}</Link>
        </div>
    )
}

export default Pagination