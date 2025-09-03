import { toast } from "react-toastify";
import { User } from "../model/User";
import { AuthUserDataType, PreRegisterUserType, RequestConfig, UpdateUserType } from "../utils/types";
import RestClient from "./client";
import { onlyNumbers } from "../utils/util";

export function handlePreRegister(data: PreRegisterUserType): Promise<void> {
    const toastify = toast.loading("Realizando cadastro😎");
    const restClient = RestClient();
    let headers = new Map();

    headers.set("Content-Type", "application/json");
    headers.set("Authorization", process.env.NEXT_PUBLIC_PRE_REGISTER_TOKEN);

    const reqConfig: RequestConfig = {
        reqParams: {
            json: JSON.stringify(data),
            headers,
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Cadastro realizado com sucesso! Realize o login."
        }
    };

    return restClient.post("/user/pre", reqConfig);
}

export function getUserAuthData(token: string): Promise<AuthUserDataType> {
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token
        },
        reqInitConfig: {
            throws: true,
        }
    };

    return restClient.get("/user", reqConfig);
}

export function getUserData(token: string): Promise<User> {
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token
        },
        reqInitConfig: {
            throws: true,
        }
    };

    return restClient.get("/user", reqConfig);
}

export function completeRegister(updatePayload: UpdateUserType, token: string): Promise<User> {
    const toastify = toast.loading("Finalizando cadastro😎");
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            json: JSON.stringify(updatePayload)
        },
        reqInitConfig: {
            throws: true,
            toastify,
            // toastifySuccessMsg: "Cadastro finalizado com sucesso."
        },
    };

    return restClient.post("/user", reqConfig);
}

export function updateUserData(updatePayload: UpdateUserType, token: string): Promise<User> {
    const toastify = toast.loading("Atualizando o cadastro💫");
    const restClient = RestClient();
    const reqConfig: RequestConfig = {
        reqParams: {
            token,
            json: JSON.stringify(updatePayload)
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Cadastro atualizado com sucesso👍."
        },
    };

    return restClient.patch("/user", reqConfig);
}

export function handleSendToken(phone: string, isResetToken: boolean): Promise<void> {
    const toastify = toast.loading("Enviando código...");
    const restClient = RestClient();
    let headers = new Map();

    headers.set("phone", onlyNumbers(phone));
    headers.set("Authorization", process.env.NEXT_PUBLIC_PRE_REGISTER_TOKEN);

    const reqConfig: RequestConfig = {
        reqParams: {
            headers,
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Código enviado!📲"
        }
    };

    const path = isResetToken ? "send-reset-token" : "send-token";

    return restClient.post("/user/".concat(path), reqConfig);
}

export function handleValidateToken(token: string): Promise<void> {
    const toastify = toast.loading("Validando código...");
    const restClient = RestClient();
    let headers = new Map();

    headers.set("token", token);
    headers.set("Authorization", process.env.NEXT_PUBLIC_PRE_REGISTER_TOKEN);

    const reqConfig: RequestConfig = {
        reqParams: {
            headers,
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Código verificado!✅"
        }
    };

    return restClient.get("/user/validate-token", reqConfig);
}

export function handleChangePassword(phone: string, password: string, code: string): Promise<void> {
    const toastify = toast.loading("Atualizando senha...");
    const restClient = RestClient();
    let headers = new Map();

    headers.set("token", code);
    headers.set("phone", onlyNumbers(phone));
    headers.set("password", password);
    headers.set("Authorization", process.env.NEXT_PUBLIC_PRE_REGISTER_TOKEN);

    const reqConfig: RequestConfig = {
        reqParams: {
            headers,
        },
        reqInitConfig: {
            throws: true,
            toastify,
            toastifySuccessMsg: "Senha atualizada!✅"
        }
    };

    return restClient.post("/user/reset-password", reqConfig);
}
