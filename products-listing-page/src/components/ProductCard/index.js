import { FaRegBookmark } from "react-icons/fa";
import './index.css'

const ProductCard = (props) => {
    const {productDetails} = props 
    const {title,price,discount,imageUrl} = productDetails
    const discountAmount = Math.floor(price * discount / 100)
    const offerPrice = price - discountAmount
    return(
        <li className = "product-card">
        
           <div className = "product-image-container">
           <button type='button' className="bookmark-icon"><FaRegBookmark size={35} color="black"/></button>
            <img src = {imageUrl} alt = {title} className='image'/>
           </div>
           <div className="product-details">
          
            <p className="product-title">{title}</p>
            <div className="price-details">
            <div>
            <p className="offer-price">₹{offerPrice}</p>
            <p className="price">₹{price}</p>
            <p className="discount">{`(${discount}% Off)`}</p>
            </div>
            <div>
            <button className="bag-image">
            <img src = "https://res.cloudinary.com/dchxbofyt/image/upload/v1708089792/Group_450_qb0vph.png"  alt="shopping-bag"/>
            </button>
            </div>
            
            </div>
            
           </div>
        </li>
    )
}

export default ProductCard