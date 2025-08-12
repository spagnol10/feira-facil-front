import { toast } from "react-toastify";
import { Company } from "../model/Company";
import { handleError, handleSuccessToast } from "../utils/toast";
import { IbgeCitiesResponse } from "../utils/types";
import { Address } from "../model/Address";

//#DOC - https://servicodados.ibge.gov.br/api/docs/localidades
export function fecthExternalCitiesByState(state: string): Promise<Array<IbgeCitiesResponse>> {
    return fetch(process.env.NEXT_PUBLIC_IBGE_LOC_API.concat(state).concat("/distritos"))
        .then(res => res.json())
        .catch(console.error);
}

//#DOC - https://docs.awesomeapi.com.br/api-cep
export function fecthExternalAddresByZipCode(zipCode: string): Promise<Address | void> {
    return fetch(process.env.NEXT_PUBLIC_CEP_API.concat(zipCode))
        .then(res => res.json())
        .then(res => Address.fromExternalData(res))
        .catch(console.error);
}

//#DOC - https://api.cnpjs.dev/
export function handleFetchExternalCnpjData(document: string): Promise<Company | undefined> {
    const toastify = toast.loading("Buscando informações CNPJ...");

    return fetch(process.env.NEXT_PUBLIC_CNPJ_API.concat(document))
        .then(res => res.json())
        .then(res => {
            handleSuccessToast("Dados CNPJ retornados com sucesso!", toastify);

            return Company.fromExternalData(res);
        })
        .catch(() => {
            handleError("Erro ao buscar informações do CNPJ.");

            return undefined;
        });
}