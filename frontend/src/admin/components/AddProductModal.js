import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Services
import productService from "../../services/admin/productServices";


// Assets

// Components & Pages
import Title from "../../application/components/Title";

const AddProductModal = ({showModalDialog, closeModalDialog, initialProduct}) => {
    const [productData, setProductData] = useState(initialProduct);

    useEffect(() => {
        setProductData(initialProduct);
    }, [initialProduct]);

    // Submit Form
    const onSubmitForm = async (e) => {
        e.preventDefault();
        var result;

        if (initialProduct._id) {
            result = await productService.updateProduct(productData);
        } else {
            result = await productService.createProduct(productData);
        }

        if (!result.error) {
            // Show success message here
            closeModalDialog(result.productInfo);
        } else {
            // Show error message here
        }

        
    }
    return (
        <Modal show={showModalDialog} onHide={closeModalDialog}>
            <Modal.Header closeButton>
                <Modal.Title style={{width:'-webkit-fill-available'}}>
                    <Title title={initialProduct._id ? `Product Code: ${initialProduct.code}` : 'ADD PRODUCT'}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitForm}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group controlId="code">
                                <Form.Label>Product Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product code"
                                    value={productData.code}
                                    onChange={(e) => setProductData({ ...productData, code: e.target.value })}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group controlId="name">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    value={productData.name}
                                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-12">
                            <Form.Group controlId="description">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter product description"
                                    value={productData.description}
                                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group controlId="stock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter stock amount"
                                    value={productData.stock}
                                    onChange={(e) => setProductData({ ...productData, stock: parseInt(e.target.value) })}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-6">
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter product price"
                                        value={productData.price}
                                        onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="d-grid">
                        <Button className='mt-3 mb-3' variant="primary" type="submit">
                            {initialProduct._id ? 'UPDATE' : 'ADD'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddProductModal;