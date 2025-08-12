import router from "next/router";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { handleWarnToast } from "../utils/toast";
import { EnumScreen } from "../utils/types";
import { equalsEnum, handleLogout, isNullOrEmpty, verifyAuth } from "../utils/util";

export default function useMiddleware(page?: EnumScreen) {
    const [isAuth, setAuth] = useState(false);
    const { user, handleFetchUserData } = useAppContext();

    async function verifyUserAuth() {
        const isAuth = verifyAuth();

        if (!isAuth) {
            await handleLogout(false);
        }

        if (isAuth) {
            if(!user) {
                handleFetchUserData();
            }

            if (user && isNullOrEmpty(user.document)) {
                finishUserAccountFlow();

                if (equalsEnum(page, EnumScreen.PROFILE)) {
                    handleWarnToast("Finalize seu cadastro para liberar demais funcionalidades.");

                    setAuth(isAuth);
                }

                return;
            } else if (user && isNullOrEmpty(user?.company?.id)) {
                finishCompanyAccount();

                if (equalsEnum(page, EnumScreen.COMPANY)) {
                    handleWarnToast("Finalize o cadastro da sua empresa para liberar demais funcionalidades.");

                    setAuth(isAuth);
                }

                return;
            }
        }

        setAuth(isAuth);
    }

    function finishUserAccountFlow() {
        router.push("/profile");
    }

    function finishCompanyAccount() {
        router.push("/company");
    }

    return {
        isAuth,
        verifyUserAuth
    };
}