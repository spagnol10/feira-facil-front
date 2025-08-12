import React, { useState } from "react";
import { handleLogin } from "../repositories/auth.repository";
import { getUserAuthData } from "../repositories/user.repository";
import { AppContextType, AuthUserDataType, IAppContext, SimpleCompanyData } from "../utils/types";

const AppContext = React.createContext<AppContextType>({} as IAppContext);

export default function DataProvider(props: any) {
    const [user, setUser] = useState<AuthUserDataType>();
    const [showFullNavbar, setShowFullNavBar] = useState(false);

    function handleChangeShowFullNavbar() {
        setShowFullNavBar(!showFullNavbar);
    }

    function handleUpdateDocument(document: string) {
        setUser((previous: any) => {
            return {
                ...previous,
                document
            }
        })
    }

    function handleUpdateCompany(company: SimpleCompanyData) {
        setUser((previous: any) => {
            return {
                ...previous,
                company: company
            }
        })
    }

    async function handleAuth(phone: string, password: string) {
        const data = await handleLogin(phone, password);

        if (data && data.token) {
            const userData = await getUserAuthData(data.token);

            setUser(userData);

            localStorage.setItem("token", data.token);
            localStorage.setItem("expiration", (new Date().getTime() + (data.expiresIn * 60000)).toString());
        }
    }

    async function handleFetchUserData() {
        const userData = await getUserAuthData(localStorage.getItem("token") || "");

        if (userData) {
            setUser(userData);
        }
    }

    return (
        <AppContext.Provider value={{
            user,
            showFullNavbar,
            handleAuth,
            handleFetchUserData,
            handleUpdateDocument,
            handleUpdateCompany,
            handleChangeShowFullNavbar
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export function useAppContext(): AppContextType {
    return React.useContext(AppContext);
}