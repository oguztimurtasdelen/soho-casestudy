import { environment } from "../../environments/environment";
import authenticationService from "./authenticationService";

const token = authenticationService.getAuthData() ? authenticationService.getAuthData().token : null;

const transactionService = {

    fetchTransactionsByProduct: async(productcode) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/transaction/${productcode}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        return data;
    },

    createTransaction: async(transactionInfo) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/transaction`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionInfo)
        });

        const data = await response.json();
        return data;
    }
}


export default transactionService;