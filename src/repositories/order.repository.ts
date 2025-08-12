import { toast } from "react-toastify";
import { OrderResponseType, RequestConfig, Sale } from "../utils/types";
import RestClient from "./client";

export function handleCreateSale(sale: Sale, token: string): Promise<OrderResponseType> {
    const toastId = toast.loading("Criando pedido...");

    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            json: JSON.stringify(sale),
        },
        reqInitConfig: {
            throws: true,
            toastify: toastId,
            toastifySuccessMsg: "Pedido criado com sucesso!",
            toastError: true,
        }
    };

    return restClient.post("/order", reqConfig);
}

export function handleGetSaleData(orderId: string, token: string): Promise<OrderResponseType> {
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers: new Map().set("id", orderId)
        }
    };

    return restClient.get("/order", reqConfig);
}

export function handleWaiveOrder(orderId: string, token: string): Promise<OrderResponseType> {
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers: new Map().set("id", orderId)
        }
    };

    return restClient.patch("/order/close", reqConfig);
}

export function handleReverseOrder(orderId: string, token: string): Promise<OrderResponseType> {
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers: new Map().set("id", orderId)
        },
        reqInitConfig: {
            throws: true
        }
    };

    return restClient.reqDelete("/order/reverse", reqConfig);
}
