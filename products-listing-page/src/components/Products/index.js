import { Component } from "react";

import {ThreeDots} from 'react-loader-spinner'

import Header  from "../Header";

import ProductCard  from "../ProductCard";

import CategoryItem from "../Filters";

import "./index.css"

const categoryList = [
    {tabId: 'all', displayText: 'All'},
    {tabId: 'jewelery', displayText: 'Jewelery'},
    
    {tabId: 'electronics', displayText: 'Electronics'},
    {tabId: `men's clothing`, displayText: 'Men'},
    {tabId: `women's clothing`, displayText: 'Women'},
  ]
  

class AllProducts extends Component {
    state = {productsData : [],activeTabId: categoryList[0].tabId,isLoading : true,sort : ""}
    componentDidMount () {
        this.getAllProductData()
    }

    onChangeOfSort = (event) => {
        const sortValue = event.target.value
        const {productsData} = this.state
        let sortedProducts;
        if (sortValue  === "Asc") {
            sortedProducts =  [...productsData.sort((a,b)=> a.price - b.price)]
        }
        else {
           sortedProducts =  [...productsData.sort((a,b)=> b.price - a.price)]

        }
        this.setState({productsData : sortedProducts,sort : sortValue})
    }

    getAllProductData = async() => {
        try {
        const apiUrl = 'https://fakestoreapi.com/products'
        const options = {
            method : "GET"
        }
        const response = await fetch(apiUrl,options);
        const data = await response.json()
        const formatData = data.map((each)=>({
            id : each.id,
            title : each.title,
            price : each.price,
            imageUrl : each.image,
            discount : Math.floor(Math.random() * 30),
            category : each.category,
            description : each.description,

        }))
        if (response.ok === true) {
        this.setState({productsData : formatData,isLoading : false})
        }
        else {
            console.log('Error while fetching')
        }
    }
    catch(e) {
        console.log(e)
    }
    }

    renderLoader = () =>(
        <div className="loader-container">
           <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#ffffff"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperClass=""
  />
        </div>
    )

    filterCategory = (id) => {
        this.setState({activeTabId : id})
    }

    getFilteredProducts = (data) => {
        const {activeTabId} =this.state
        const filters = data.filter((each)=> each.category === activeTabId)
        return filters
        
    }

    renderSuccessView = () => {
        const {productsData,activeTabId,sort} = this.state
        const filteredProducts = this.getFilteredProducts(productsData)
        const products = activeTabId === "all" ? productsData : filteredProducts
         
        return (
            <div className="all-products-container">
            <Header />
            <ul className="categories-container">
          {categoryList.map(each => (
            <CategoryItem
              tabDetails={each}
              key={each.tabId}
              filterCategory={this.filterCategory}
              isActive={each.tabId === activeTabId}
              getAllProductData = {this.getAllProductData}
            />
          ))}
          
        </ul>
        <select onChange={this.onChangeOfSort} value={sort}>
            <option value = "Asc">Sort by Asc</option>
            <option value= "Desc">Sort by Desc</option>
        </select>
        
          
            <ul className="products-container">
                {products.map((each)=>(
                    <ProductCard productDetails = {each} key = {each.id}/>
                ))}
            </ul>
            </div>
        )
    }
    render() {
        const {isLoading} = this.state
        return (
           <>
            {isLoading ? this.renderLoader() : this.renderSuccessView()}
           </>
        )
    }
}

export default AllProducts

