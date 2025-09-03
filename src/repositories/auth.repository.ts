import { toast } from "react-toastify";
import { AuthUserResponseData, RequestConfig } from "../utils/types";
import RestClient from "./client";
import { onlyNumbers } from "../utils/util";

export function handleLogin(phone: string, password: string): Promise<AuthUserResponseData> {
    const restClient = RestClient();
    // const toastify = toast.loading("Realizando login🔐...");
    const headers = new Map().set("Content-Type", "application/json");
    const data = {
        phone: onlyNumbers(phone),
        password
    }

    const reqConfig: RequestConfig = {
        reqParams: {
            json: JSON.stringify(data),
            headers,
        },
        reqInitConfig: {
            throws: true,
            // toastify,
            // toastifySuccessMsg: "Login realizado com sucesso!✅"
        }
    };

    return restClient.post("/auth", reqConfig);
}
