import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Toast } from "react-bootstrap";
import {  FaPen, FaTrash, FaHistory } from "react-icons/fa";
import { Link, NavLink, useHistory } from 'react-router-dom';

// Pages & Components
import Title from "../../application/components/Title";
import AddProductModal from "../components/AddProductModal";

// Services
import productService from "../../services/admin/productServices"

const Dashboard = () => {
    const history = useHistory();
    const [productData, setProductData] = useState({
        productList: [],
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
    });

    const _initialProduct = {
        _id: '',
        code: '',
        name: '',
        description: '',
        stock: 0,
        price: 0
    };

    const [initialProduct, setInitialProduct] = useState(_initialProduct);

    useEffect(() => {
        const getProducts = async () => {
            const response = await productService.fetchProducts(productData.currentPage, productData.pageSize);
            if (!response.error) {
                setProductData({
                    productList: response.productList,
                    totalPages: response.totalPages,
                    currentPage: productData.currentPage,
                    pageSize: productData.pageSize
                });
            } else {
                setProductData({
                    ...productData
                });
            }
            
        }
        getProducts();
    }, [productData.currentPage]);


    const [showAddProductModal, setOpenAddProductModal] = useState(false);
    const handleOpenAddProductModal = (product) => {
        setInitialProduct(product);
        setOpenAddProductModal(true);
    }
    const handleCloseAddProductModal = (data) => {
        if (data) {
            const productIndex = data._id ? productData.productList.findIndex(p => p._id === data._id) : null;
        
            if (productIndex > -1) {
                productData.productList[productIndex] = data;
            } else {
                productData.productList.push(data)
            }
            setInitialProduct(_initialProduct);
            
        }
        setOpenAddProductModal(false);
    }

    const handleDeleteProduct = async (productCode) => {
        const response = await productService.deleteProduct(productCode);
        if (!response.error) {
            const filteredProductList = productData.productList.filter(p => p.code !== productCode);
            productData.productList = filteredProductList;

            setInitialProduct(_initialProduct);
            // Show success message here
        } else {
            // Show error message here
        }
    }

    const handleOpenTransaction = (productCode) => {
        history.push(`/admin/order-management/${productCode}`)
    }    


    return (
        <div>
            <Title title={'DASHBOARD'}/>

            <Button className="mb-3" variant="primary" onClick={() => handleOpenAddProductModal(_initialProduct)}>
                Add New
            </Button>

            <Table striped responsive bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price($)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.productList.map((product, index) => (
                        <tr key={product._id}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{`${product.stock} pcs`}</td>
                            <td>{`$ ${product.price}`}</td>
                            <td>
                                <Button className="" variant="outline-light" size="sm" onClick={() => handleOpenAddProductModal(product)}><FaPen /></Button>
                                {' '}
                                <Button className="" variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(product.code)}><FaTrash /></Button>
                                {' '}
                                <Button className="" variant="outline-info" size="sm" onClick={() => handleOpenTransaction(product.code)}><FaHistory /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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

                <AddProductModal 
                    showModalDialog={showAddProductModal}
                    closeModalDialog={handleCloseAddProductModal}
                    initialProduct={initialProduct}
                />
            </div>
        </div>
    );
}

export default Dashboard;