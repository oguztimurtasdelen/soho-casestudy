import { environment } from "../../environments/environment";

const productService = {
    fetchProducts: async(page, pageSize) => {
        const response = await fetch(`${environment.SERVER_URL}/products?page=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();
        return data;
    },

    fetchProductById: async(productId) => {
        const response = await fetch(`${environment.SERVER_URL}/products/${productId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();
        return data;
    }
}


export default productService;