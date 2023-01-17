import React, { Component } from 'react'
import { withOktaAuth } from '@okta/okta-react'
import DeleteDialog from '../components/staff/DeleteDialog'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
import MOList from './MOList'
import API from '../components/misc/api'

class MO extends Component {
    state = {
        MO: [],
        code: '',
        page: 1,
        totalPage: 1
    }

    deleteModal = null


    showDialog = (code) => {
        this.code = code
        this.deleteModal.open()
    }

    async componentDidMount() {
    
        this.getProducts(1)
        this.deleteModal = M.Modal.init(document.getElementById('deleteModal'))
    }
    getProducts = async (page) => {
        API.get(`mo`, {
            headers: {
                'Authorization': 'Bearer ' + await this.props.oktaAuth.authStateManager._authState.accessToken.accessToken
            }
        })
            .then(response => {
                let pageNum = new URLSearchParams(window.location.search).get('page');
                let keyword = new URLSearchParams(window.location.search).get('keyword');
                if (pageNum == null) {
                    pageNum = 1;
                }
                let pageData = new Object()
                if (keyword != null) {
                    let filter = response.data.filter(item =>
                        item.client.includes(keyword)
                    )
                    pageData = filter.slice((pageNum * 2) - 2, pageNum * 2)
                } else {
                    pageData = response.data.slice((pageNum * 2) - 2, pageNum * 2)
                }
                console.log(this.props.oktaAuth.authStateManager._authState.accessToken.accessToken)
                this.setState({
                    MO: pageData,
                    page: pageNum,
                    totalPage: (pageData.length / 3) + 1
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProduct = async () => {
        API.delete(`mo/${this.code}`, {
          headers: {
            'Authorization': 'Bearer ' + await this.props.authState.accessToken.accessToken
          }
        })
          .then(() => {
            window.location.reload(false);
          })    
          .catch(error => {
            console.log(error)
          })
    }

    setToDone = async (code) => {
        API.put(`mo/${code}`, {
            headers: {
              'Authorization': 'Bearer ' + await this.props.authState.accessToken.accessToken
            }
          })
            .then(() => {
            })    
            .catch(error => {
              console.log(error)
            })
      }

      searchKeyword = () => {
        window.location.replace(window.location.pathname + '?keyword=' + document.getElementById('search').value + "&page=1")
    }
    render() {
        const currentPage = this.state.page
        const previousPage = currentPage - 1
        let pageNum = new URLSearchParams(window.location.search).get('page');
        const nextPage = previousPage  + 2;
        const minPage = currentPage > 1 ? { "display": "block" } : { "display": "none" }
        const maxPage = currentPage< this.state.totalPage + 1? { "display": "block" } : { "display": "none" }
        const keyword = new URLSearchParams(window.location.search).get('keyword');
        const url = keyword == null ? window.location.pathname + '?page=' : window.location.pathname + '?keyword=' + keyword + '&page='
        return (
            <div>
                <MOList mos={this.state.MO} showDialog={this.showDialog} setToDone={this.setToDone}/>
                <input class="w3-input w3-border w3-white" id="search" type="text"  />
                <button className='w3-green w3-xlarge w3-padding w3-center w3-margin' onClick={this.searchKeyword}>Search</button>
                <div class="w3-bar w3-large w3-container w3-center">
                    <a href={url + previousPage} class="w3-button" style={minPage}>{previousPage}</a>
                    <a href={url + currentPage} class="w3-button w3-green">{currentPage}</a>
                    <a href={url + nextPage} style={maxPage} class="w3-button   ">{nextPage}</a>
                </div>
                <DeleteDialog deleteObject={this.deleteProduct}/>
            </div>
        )
    }
}

export default withOktaAuth(MO)