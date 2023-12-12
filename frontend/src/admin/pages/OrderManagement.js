import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, Form, Toast } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';

// Services
import transactionService from '../../services/admin/transactionService';

// Pages & Components
import Title from "../../application/components/Title";

// Assets

const OrderManagement = () => {
  const { productcode } = useParams();
  const [transactionList, setTransactionList] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const [transactionData, setTransactionData] = useState({
    productCode: '',
    type: 'IN', //default value
    quantity: 0,
    description: ''
  });

  useEffect(() =>{
    const fetchTransactions = async () => {
      const response = await transactionService.fetchTransactionsByProduct(productcode);
      if (!response.error) {
        setProductInfo(response.productInfo);
        setTransactionList(response.transactionList || []);
        setTransactionData({ ...transactionData, productCode: response.productInfo.code });
      } else {
        // Show error message here
      }

    };
    fetchTransactions();
  }, [productcode]);

  
  const onSubmitTransactionForm = async (e) => {
    e.preventDefault();

    const result = await transactionService.createTransaction(transactionData);
    
    if (!result.error) {
      setTransactionList([...transactionList, result.transactionInfo]);
      // Show success message here
      
    } else {
      // Show error message here
    }
  }

  
  return (
    <div>
      <Title title={`ORDER MANAGEMENT: ${productcode}`}/>
      
      <Form onSubmit={onSubmitTransactionForm}>
        <div className='row'>
          <div className='col-lg-2 col-md-6 col-sm-12'>
            <Form.Group controlId="type">
              <Form.Label>Action Type</Form.Label>
              <Form.Select
                required
                value={transactionData.type}
                onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value })}
              >
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className='col-lg-2 col-md-6 col-sm-12'>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type='number'
                required
                value={transactionData.quantity}
                onChange={(e) => setTransactionData({ ...transactionData, quantity: e.target.value })}
              />
            </Form.Group>
          </div>

          <div className="col-lg-8 col-md-12 col-sm-12">
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Description"
                    value={transactionData.descrtiption}
                    onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                />
            </Form.Group>
          </div>

          <div className='d-grid'>
            <Button className='mb-3 mt-3' variant='primary' type='submit'>ADD</Button>
          </div>

        </div>
      </Form>

      <Table striped responsive bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{transaction.type === "IN" ? <FaArrowRight style={{color:"green"}} title={transaction.type}/> : <FaArrowLeft style={{color:"red"}} title={transaction.type}/>}</td>
              <td>{format(new Date(transaction.createdAt), "dd.MM.yyyy HH:mm:ss")}</td>
              <td>{`${transaction.quantity} pcs`}</td>
              <td>{<FaInfoCircle title={transaction.description}/> }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


export default OrderManagement;