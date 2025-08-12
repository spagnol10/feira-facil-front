import { toast } from "react-toastify";
import { AcquirerConfig } from "../model/AcquirerConfig";
import { Company } from "../model/Company";
import { RequestConfig, SimpleCompanyData } from "../utils/types";
import RestClient from "./client";

export function handleCreateCompany(data: Company, token: string): Promise<SimpleCompanyData> {
    const toastify = toast.loading("Realizando cadastro...");
    const restClient = RestClient();

    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            json: JSON.stringify(data)
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Cadastro realizado com sucesso!"
        }
    };

    return restClient.post("/company", reqConfig);
}

export function handleFetchCompanyData(companyId: string, token: string): Promise<Company> {
    const restClient = RestClient();
    const headers = new Map();

    headers.set("id", companyId);

    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers
        },
        reqInitConfig: {
            throws: true,
        }
    };

    return restClient.get("/company", reqConfig);
}

export function handleFetchAcquirerCompanyData(companyId: string, token: string): Promise<AcquirerConfig> {
    const restClient = RestClient();
    const headers = new Map();

    headers.set("companyId", companyId);

    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers
        },
        reqInitConfig: {
            throws: true,
        }
    };

    return restClient.get("/company/acquirer-config", reqConfig);
}

export function handleCreateAcquirer(data: AcquirerConfig, companyId: string, token: string): Promise<AcquirerConfig> {
    const toastify = toast.loading("Realizando cadastro...");
    const restClient = RestClient();
    const headers = new Map();

    headers.set("companyId", companyId);

    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            headers,
            json: JSON.stringify(data)
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Cadastro realizado com sucesso!"
        }
    };

    return restClient.post("/company/acquirer-config", reqConfig);
}