import { toast } from "react-toastify";
import { Fair } from "../model/Fair";
import { RequestConfig } from "../utils/types";
import RestClient from "./client";

export function createFair(fair: Fair, token: string): Promise<Fair> {
    const restClient = RestClient();
    const toastify = toast.loading("Realizando cadastro...");

    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            json: JSON.stringify(fair)
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastError: true,
            toastifySuccessMsg: "Cadastro realizado com sucesso!"
        }
    };

    return restClient.post("/fair", reqConfig);
}

export function fecthFairsBy(state: string, city: string, token: string): Promise<Array<Fair>> {
    const restClient = RestClient();
    let headers = new Map();

    headers.set("state", state);
    headers.set("city", city);

    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers
        }
    };

    return restClient.get("/fair/location", reqConfig);
}