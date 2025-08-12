import { handleResponseError, handleSuccessToast, resolveRequestError } from "../utils/toast";
import { RequestConfig, RequestInteractionConfigType, RequestParamsType } from "../utils/types";
import { encodeQueryString } from "../utils/util";

export default function RestClient() {

    function getRequestPath(path: string, reqParams?: RequestParamsType) {
        let url = process.env.NEXT_PUBLIC_BASE_URL.concat(path);

        if (reqParams && reqParams.query) {
            url = url.concat(encodeQueryString(reqParams.query));
        }

        return url;
    }

    function createRequestHeaders(reqParams: RequestParamsType) {
        const requestHeaders = new Headers();

        if (reqParams.headers) {
            for (const [key, value] of reqParams.headers) {
                requestHeaders.set(key, value);
            }
        }

        if (reqParams.token) {
            requestHeaders.set("Authorization", "Bearer ".concat(reqParams.token));
        }

        return requestHeaders;
    }

    function createRequest(method: string, requestHeaders: Headers, json?: string | FormData) {
        if (json) {
            requestHeaders.set("Content-Type", "application/json");

            return {
                headers: requestHeaders,
                body: json,
                method: method,
            };
        }

        return {
            headers: requestHeaders,
            method: method,
        };
    }

    function requestInitGET(reqParams: RequestParamsType) {
        const requestHeaders = createRequestHeaders(reqParams);

        return createRequest("GET", requestHeaders);
    }

    function requestInitPOST(reqParams: RequestParamsType) {
        const requestHeaders = createRequestHeaders(reqParams);

        return createRequest("POST", requestHeaders, reqParams.json);
    }

    function requestInitPUT(reqParams: RequestParamsType) {
        const requestHeaders = createRequestHeaders(reqParams);

        return createRequest("PUT", requestHeaders, reqParams.json);
    }
    function requestInitPATCH(reqParams: RequestParamsType) {
        const requestHeaders = createRequestHeaders(reqParams);

        return createRequest("PATCH", requestHeaders, reqParams.json);
    }

    function requestInitDELETE(reqParams: RequestParamsType) {
        const requestHeaders = createRequestHeaders(reqParams);

        return createRequest("DELETE", requestHeaders);
    }

    function fetchData(url: RequestInfo, reqInit?: RequestInit | undefined, reqIntConfig?: RequestInteractionConfigType) {
        return fetch(url, reqInit)
            .then(res => {
                if (res.ok) {
                    if (reqIntConfig?.toastifySuccessMsg) {
                        handleSuccessToast(reqIntConfig?.toastifySuccessMsg, reqIntConfig.toastify);
                    }

                    if (res.status == 204 || res.status == 201) {
                        return;
                    }

                    return res.json();
                }

                return handleResponseError(res, reqIntConfig);
            })
            .catch(err => resolveRequestError(err, reqIntConfig));
    }

    function fetchDataWithResponse(url: RequestInfo, reqInit?: RequestInit | undefined): Promise<Response> {
        return fetch(url, reqInit)
            .then(res => res)
            .catch(err => err);
    }

    function post(url: string, reqConfig: RequestConfig) {
        const reqInit = requestInitPOST(reqConfig.reqParams);

        return fetchData(getRequestPath(url, reqConfig.reqParams), reqInit, reqConfig.reqInitConfig);
    }

    function postWithReqInit(url: string, reqInit?: RequestInit | undefined, reqIntConfig?: RequestInteractionConfigType) {
        return fetchData(getRequestPath(url, undefined), reqInit, reqIntConfig);
    }

    function get(url: string, reqConfig: RequestConfig) {
        const reqInit = requestInitGET(reqConfig.reqParams);

        return fetchData(getRequestPath(url, reqConfig.reqParams), reqInit, reqConfig.reqInitConfig);
    }

    function getWithHttpResponse(url: string, reqConfig: RequestConfig) {
        const reqInit = requestInitGET(reqConfig.reqParams);

        return fetchDataWithResponse(getRequestPath(url, reqConfig.reqParams), reqInit);
    }

    function put(url: string, reqConfig: RequestConfig) {
        const reqInit = requestInitPUT(reqConfig.reqParams);

        return fetchData(getRequestPath(url, reqConfig.reqParams), reqInit, reqConfig.reqInitConfig);
    }

    function patch(url: string, reqConfig: RequestConfig) {
        const reqInit = requestInitPATCH(reqConfig.reqParams);

        return fetchData(getRequestPath(url, reqConfig.reqParams), reqInit, reqConfig.reqInitConfig);
    }

    function reqDelete(url: string, reqConfig: RequestConfig) {
        const reqInit = requestInitDELETE(reqConfig.reqParams);

        return fetchData(getRequestPath(url, reqConfig.reqParams), reqInit, reqConfig.reqInitConfig);
    }

    return {
        get,
        put,
        post,
        patch,
        reqDelete,
        postWithReqInit,
        getWithHttpResponse,
    };
}