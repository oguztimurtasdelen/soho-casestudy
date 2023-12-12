import React from 'react';
import { Link } from "react-router-dom";

const ProductDetails = ({product}) => {
    return (
        <div className="card mb-3" style={{ border:"none"}} >
            <div className="row g-0">
                <div className="col-md-4">
                <img src={product.image || 'https://static.vecteezy.com/system/resources/previews/011/912/699/non_2x/secret-mystical-box-isometry-yellow-cubic-packaging-with-question-marks-unknown-package-gift-help-with-frequently-asked-questions-mysterious-container-with-surprise-vector.jpg'} className="img-fluid rounded-start" alt={product.name} />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-text">{product.explanation}</p>
                    <p className="card-text"><small className="text-body-secondary">Code: {product.code}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Price: {`$${product.price}`}</small></p>
                </div>
                </div>
            </div>
            <div className='card-footer' style={{border:"none",}}>
                <button className='btn btn-dark' style={{width:"100%"}}><span icon="home"></span>Add Chart</button>
            </div>
        </div>
        
        
    );
}

export default ProductDetails;