import React, { useEffect, useState } from 'react';
import { Pagination } from "react-bootstrap";

// Components
import ProductCard from '../components/ProductCard';
import Title from '../components/Title';

// Services
import productService from "../../services/application/productServices";

// Assets
import { systemMessages } from "../../assets/messages";



const Home = () => {

    const [productData, setProductData] = useState({
        productList: [],
        totalPages: 0,
        currentPage: 1,
        pageSize: 12,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.fetchProducts(productData.currentPage, productData.pageSize);
            setProductData({
                productList: response.productList,
                totalPages: response.totalPages,
                currentPage: productData.currentPage,
                pageSize: productData.pageSize
            });
        };
        fetchData();
    }, [productData.currentPage]);

    if (productData.productList.length === 0) {
        return (
            <div className="alert alert-dark" role="alert">
                {systemMessages['product.search.nofound']}
            </div>
        );
    } else {
        return (
            <div>
                <Title title={'SOHO SHOPPING'}/>

                <div className='row'>
                    {productData.productList.map((product) => (
                        <ProductCard key={product.code} product={product} />
                    ))}

                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {Array.from({ length: productData.totalPages }, (_, i) => (
                                <Pagination.Item
                                    key={i+1}
                                    active={i + 1 === productData.currentPage}
                                    onClick={() => setProductData({...productData, currentPage: i+1})}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Home;