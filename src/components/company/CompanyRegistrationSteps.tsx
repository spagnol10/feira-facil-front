import React from 'react';
import { EnumRegisterCompanyStep } from "../../utils/types"; 

import { CompanyIcon, PersonOwnerIcon, FairIcon, DollarSymbolIcon } from "../svg/SvgIcons"; 
import DefaultHeaderTitle from "../standard/DefaultHeaderTitle";

interface CompanyRegistrationStepsProps {
    registerFair: boolean;
    stepsTaken: EnumRegisterCompanyStep[];
    handleUpdateView: (step: EnumRegisterCompanyStep) => void;
    validateDisable: (step?: EnumRegisterCompanyStep) => boolean | undefined;
}

export default function CompanyRegistrationSteps({
    registerFair,
    stepsTaken,
    handleUpdateView,
    validateDisable,
}: CompanyRegistrationStepsProps) {
    return (
        <>
            <DefaultHeaderTitle
                title="Finalize o cadastro da empresa🏪"
                content="Tenha acesso ao sistema completo após finalizar seu cadastro e definir seu plano."
            />
            <div className="flex p-0.5">
                <button
                    disabled={!!registerFair || validateDisable(EnumRegisterCompanyStep.REGISTER_COMPANY)}
                    className="flex flex-col w-1/4 items-center gap-1"
                    title={!!registerFair ? "Finalize o cadastro da feira" : "Informações do cadastro da empresa"}
                    onClick={() => handleUpdateView(EnumRegisterCompanyStep.REGISTER_COMPANY)}>
                    <CompanyIcon />
                    <p className="hidden md:flex text-sm">
                        Cadastro empresa
                    </p>
                    <hr className="h-1 bg-secondary rounded-md w-full" />
                </button>
                <button disabled={!!registerFair || validateDisable(EnumRegisterCompanyStep.REGISTER_OWNER)}
                    className="flex flex-col w-1/4 items-center gap-1"
                    title={!!registerFair ? "Finalize o cadastro da feira" : "Informações do cadastro do dono da empresa"}
                    onClick={() => handleUpdateView(EnumRegisterCompanyStep.REGISTER_OWNER)}>
                    <PersonOwnerIcon />
                    <p className="hidden md:flex text-sm">
                        Dono empresa
                    </p>
                    <hr className={`h-1 w-full bg-primary-light rounded-md
                        ${stepsTaken.includes(EnumRegisterCompanyStep.REGISTER_OWNER) && 'bg-secondary'}`} />
                </button>
                <button disabled={validateDisable(EnumRegisterCompanyStep.FAIRS)}
                    className="flex flex-col w-1/4 items-center gap-1"
                    onClick={() => handleUpdateView(EnumRegisterCompanyStep.FAIRS)}>
                    <FairIcon />
                    <p className="hidden md:flex text-sm">
                        Seleção feiras
                    </p>
                    <hr className={`h-1 w-full bg-primary-light rounded-md
                        ${stepsTaken.includes(EnumRegisterCompanyStep.FAIRS) && 'bg-secondary'}`} />
                </button>
                <button disabled={!!registerFair || validateDisable(EnumRegisterCompanyStep.SELECT_PLAN)}
                    title={!!registerFair ? "Finalize o cadastro da feira" : "Informações do plano"}
                    className="flex flex-col w-1/4 items-center gap-1"
                    onClick={() => handleUpdateView(EnumRegisterCompanyStep.SELECT_PLAN)}>
                    <DollarSymbolIcon />
                    <p className="hidden md:flex text-sm">
                        Seleção do plano
                    </p>
                    <hr className={`h-1 w-full bg-primary-light rounded-md
                        ${stepsTaken.includes(EnumRegisterCompanyStep.SELECT_PLAN) && 'bg-secondary'}`} />
                </button>
            </div>
        </>
    );
}