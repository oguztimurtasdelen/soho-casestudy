import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

// Services
import productService from '../../services/application/productServices';

// Components & Pages
import ProductDetails from '../components/ProductDetails';
import Title from '../components/Title';

// Assets
import { systemMessages } from "../../assets/messages";


const ProductDetailsPage = () => {
    const { productid } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await productService.fetchProductById(productid);
            setProduct(productData.product);
        };
        fetchProduct();
    }, [productid]);

    if (!product) {
        return (
            <div className="alert alert-dark" role="alert">
                {systemMessages['product.search.nofound']}
            </div>
        );
    } else {
        return (
            <div>
                <Title title={product.name}/>
                <ProductDetails product={product}/>
            </div>
        )
    }
}

export default ProductDetailsPage;