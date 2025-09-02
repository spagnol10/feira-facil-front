// src/components/company/CompanyManagementNav.tsx

import React from 'react';
import { EnumCompanyScreen } from '../../utils/types';
import DefaultHeaderTitle from '../standard/DefaultHeaderTitle';

interface CompanyManagementNavProps {
    setScreenProcess: (screen: EnumCompanyScreen) => void;
    isSelectedScreen: (screen: EnumCompanyScreen) => boolean;
}

export default function CompanyManagementNav({
    setScreenProcess,
    isSelectedScreen,
}: CompanyManagementNavProps) {
    return (
        <>
            <DefaultHeaderTitle
                title="Gerencie aqui suas configurações da empresa🏪"
                content="Aqui você configura seus dados, feiras que participa, conta bancária e suas maquininhas"
            />
            <nav className="flex w-fit gap-8 border-b border-b-primary pb-0.5 mb-10 self-center pr-8 md:self-start md:mb-8">
                <button
                    onClick={() => setScreenProcess(EnumCompanyScreen.COMPANY)}
                    className={`text-secondary text-xs pl-8 ${isSelectedScreen(EnumCompanyScreen.COMPANY) ? "font-bold" : "hover:text-secondary-light"}`}
                >
                    Cadastro
                </button>
                <button
                    onClick={() => setScreenProcess(EnumCompanyScreen.FAIRS)}
                    title="Realize o gerenciamento da feira"
                    className={`text-secondary text-xs ${isSelectedScreen(EnumCompanyScreen.FAIRS) ? "font-bold" : "hover:text-secondary-light"}`}
                >
                    Feiras
                </button>
                <button
                    onClick={() => setScreenProcess(EnumCompanyScreen.BANK_ACCOUNT)}
                    title="Realize o gerenciamento da conta"
                    className={`text-secondary text-xs ${isSelectedScreen(EnumCompanyScreen.BANK_ACCOUNT) ? "font-bold" : "hover:text-secondary-light"}`}
                >
                    Conta
                </button>
                <button
                    onClick={() => setScreenProcess(EnumCompanyScreen.POS)}
                    title="Realize o gerenciamento das maquininhas"
                    className={`text-secondary text-xs ${isSelectedScreen(EnumCompanyScreen.POS) ? "font-bold" : "hover:text-secondary-light"}`}
                >
                    Maquininhas
                </button>
            </nav>
        </>
    );
}