import { Id, toast } from "react-toastify";
import { RequestInteractionConfigType } from "./types";
import { getToastError, getToastSuccess, getToastWarn } from "./util";

export function handleWarnToast(warnPhrase: string, toastId?: Id) {
    let message = warnPhrase && warnPhrase.includes("Error:") ? warnPhrase.replace("Error:", "") : warnPhrase;

    toastId ? toast.update(toastId, getToastWarn(message)) : toast.warn(message);
}

export function handleErrorToast(errorPhrase: string, toastId?: Id) {
    let message = errorPhrase && errorPhrase.includes("Error:") ? errorPhrase.replace("Error:", "") : errorPhrase;

    toastId ? toast.update(toastId, getToastError(message)) : toast.error(message);
}

export function handleSuccessToast(successPhrase: string, toastId?: Id) {
    toastId ? toast.update(toastId, getToastSuccess(successPhrase)) : toast.success(successPhrase);
}

export async function handleResponseError(res: Response, reqIntConfig?: RequestInteractionConfigType) {
    var error = "Erro desconhecido";

    if (res.status == 403) {
        error = "Erro ao se comunicar com os serviços Feira-Fácil.";
    }

    if (res.status == 401 && res.url.includes("token")) {
        error = "Credenciais informadas inválidas tente novamente.";
    }

    if (res.status == 403 || res.status == 401) {
        if (reqIntConfig?.toastError && !reqIntConfig?.throws) {
            if (res.status == 401) {
                handleWarnToast(error, reqIntConfig.toastify);
            } else {
                handleErrorToast(error, reqIntConfig.toastify);
            }

            return;
        }

        if (reqIntConfig?.toastError) {
            handleErrorToast(error, reqIntConfig.toastify);
        }

        if (reqIntConfig?.throws) {
            throw new Error(error);
        }
    }

    return res
        .json()
        .then(err => {
            let error = err.error;
            error = error ? error : "Erro desconhecido ao realizar operação.";

            handleException(reqIntConfig, error);
        })
        .catch(err => handleException(reqIntConfig, err.message));
}

function handleException(reqIntConfig?: RequestInteractionConfigType, err?: string) {

    if (!err) {
        err = "Erro desconhecido ao realizar operação.";
    }

    if (reqIntConfig?.toastError) {
        if (reqIntConfig?.throws) {
            handleErrorToast(err, reqIntConfig.toastify);

            throw new Error(err);
        }

        handleErrorToast(err, reqIntConfig.toastify);

        return;
    } else {
        if (reqIntConfig?.throws) {
            throw new Error(err);
        }
    }

    if (reqIntConfig?.toastify) {
        handleErrorToast(err, reqIntConfig.toastify);
    }
}

export function resolveRequestError(err: any, reqIntConfig?: RequestInteractionConfigType) {
    if (err instanceof TypeError && err.message == "Failed to fetch") {
        const error = "Serviços Feira-Fácil indisponíveis!";

        if (reqIntConfig?.toastError || reqIntConfig?.toastify) {
            handleError(error, reqIntConfig);
        } else if (reqIntConfig?.throws) {
            throw new Error(error);
        }
    } else {
        const error = err.message ? err.message : "Erro desconhecido ao realizar operação.";

        handleError(error, reqIntConfig);
    }
}

export function handleError(error: string, reqIntConfig?: RequestInteractionConfigType) {
    handleErrorToast(error, reqIntConfig?.toastify);

    if (reqIntConfig?.throws) {
        throw new Error(error);
    }
}