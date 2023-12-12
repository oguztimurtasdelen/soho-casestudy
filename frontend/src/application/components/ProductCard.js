import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
    return (
        <div className='col-lg-4 col-md-4 col-sm-6'>
            <div className='card' style={{marginBottom:"1rem", border:"none"}}>
                <img className='card-img-top' src={product.image || 'https://static.vecteezy.com/system/resources/previews/011/912/699/non_2x/secret-mystical-box-isometry-yellow-cubic-packaging-with-question-marks-unknown-package-gift-help-with-frequently-asked-questions-mysterious-container-with-surprise-vector.jpg'} alt={product.name}></img>
                <div className='card-body'>
                    <h3 className='card-title'>{product.name}</h3>
                    <p className='card-text text-body-secondary'>Price: {`$${product.price}`}</p>
                    <p className='card-text text-body-secondary'>Stock: {product.stock}</p>
                </div>
                <Link className="btn btn-dark card-footer" style={{width:"100%", border:"none"}} to={`/product/${product.code}`}>Details</Link>
                
            </div>
        </div>
        
        
    );
}

export default ProductCard;