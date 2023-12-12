import { environment } from "../../environments/environment";
import authenticationService from "./authenticationService";

const token = authenticationService.getAuthData() ? authenticationService.getAuthData().token : null;

const productService = {
    
    fetchProducts: async(page, pageSize) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/products?page=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();
        return data;
    },

    fetchProductById: async(productId) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/products/${productId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();
        return data;
    },

    createProduct: async(productInfo) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/products`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        });

        const data = await response.json();
        return data;
        
    },

    updateProduct: async(productInfo) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/products/${productInfo.code}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        });

        const data = await response.json();
        return data;
    },

    deleteProduct: async(productCode) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/products/${productCode}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();
        return data;
    }
}


export default productService;