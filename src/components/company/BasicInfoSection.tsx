import { useState } from "react";

import {
  formatCNPJInput,
  formatCurrency,
  formatPhoneInput,
  isValidPositiveStrNumber,
  isValidString,
  validateEmail,
  validatePhone,
} from "../../utils/util";
import { Company } from "../../model/Company";
import { ArrowLeftIcon, InfoIcon } from "../svg/SvgIcons";
import CustomInput from "../standard/CustomInput";
import AddressForm from "../addressform/view";
import Button from "../standard/Button";

interface Props {
  company: Company | null;
  setCompany: (c: Company) => void;
  companyDocument: string;
  setCompanyDocument: (doc: string) => void;
  handleCompanyGoBack: () => void;
  handleConsultCompanyData: () => void;
  handleAutonomousFlow: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, setter: any) => void;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLInputElement>, setter: any) => void;
}

export default function BasicInfoSection({
  company,
  setCompany,
  companyDocument,
  setCompanyDocument,
  handleCompanyGoBack,
  handleConsultCompanyData,
  handleAutonomousFlow,
  handleChange,
  handleCurrencyChange,
}: Props) {
  const [basicInfoFormScreen, setBasicInfoFormScreen] = useState(false);

  return (
    <>
      <h2 className="text-dark-color text-lg font-medium mt-8">
        Informações básicas
      </h2>

      <div className="h-fit flex mt-8 gap-10">
        {basicInfoFormScreen ? (
          <BasicInfoForm
            company={company}
            setCompany={setCompany}
            handleCompanyGoBack={handleCompanyGoBack}
            handleChange={handleChange}
            handleCurrencyChange={handleCurrencyChange}
          />
        ) : (
          <CompanyDocumentSearch
            companyDocument={companyDocument}
            setCompanyDocument={setCompanyDocument}
            handleConsultCompanyData={handleConsultCompanyData}
            handleAutonomousFlow={handleAutonomousFlow}
            setBasicInfoFormScreen={setBasicInfoFormScreen}
          />
        )}
      </div>
    </>
  );
}

function BasicInfoForm({
  company,
  setCompany,
  handleCompanyGoBack,
  handleChange,
  handleCurrencyChange,
}: any) {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-11/12 xl:w-8/12">
      <button onClick={handleCompanyGoBack} className="flex w-fit gap-4">
        <ArrowLeftIcon />
        <p className="text-secondary">Voltar</p>
      </button>

      <div className="flex flex-col gap-6 md:flex-row">
        <span className="w-full md:w-1/3">
          <CustomInput
            id="companyName"
            value={company?.companyName ?? ""}
            placeHolder="Insira a razão social"
            inputHeaderText="Razão social"
            invalid={company?.companyName ? !isValidString(company.companyName) : false}
            onChange={(e) => handleChange(e, setCompany)}
          />
        </span>

        <span className="md:w-1/3">
          <CustomInput
            id="tradingName"
            value={company?.tradingName ?? ""}
            placeHolder="Insira o nome fantasia"
            inputHeaderText="Nome fantasia"
            invalid={company?.tradingName ? !isValidString(company.tradingName) : false}
            onChange={(e) => handleChange(e, setCompany)}
          />
        </span>

        <span className="md:w-1/3">
          <CustomInput
            disabled
            id="document"
            value={company?.document ? formatCNPJInput(company.document) : ""}
            placeHolder="Insira o documento"
            inputHeaderText="Documento"
            onChange={(e) => handleChange(e, setCompany)}
          />
        </span>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <span className="w-full flex gap-6">
          <span className="w-full md:w-[30%]">
            <CustomInput
              id="email"
              value={company?.email ?? ""}
              placeHolder="Insira seu e-mail"
              invalid={company?.email ? !validateEmail(company.email) : false}
              inputHeaderText="E-mail"
              type="email"
              onChange={(e) => handleChange(e, setCompany)}
            />
          </span>

          <span className="w-full md:w-[30%]">
            <CustomInput
              id="phone"
              type="tel"
              value={formatPhoneInput(company?.phone ?? "")}
              invalid={company?.phone ? !validatePhone(company.phone) : false}
              placeHolder="Insira seu telefone"
              inputHeaderText="Telefone"
              maxLength={15}
              onChange={(e) => handleChange(e, setCompany)}
            />
          </span>
        </span>

        <span className="flex items-center gap-1 md:w-[48%]">
          <span className="w-full">
            <CustomInput
              id="annualRevenue"
              placeHolder="Insira a receita anual"
              invalid={
                company?.annualRevenue
                  ? !isValidPositiveStrNumber(company?.annualRevenue.toString())
                  : false
              }
              value={formatCurrency(company?.annualRevenue ?? 0)}
              inputHeaderText="Receita anual"
              onChange={(e) => handleCurrencyChange(e, setCompany)}
            />
          </span>
          <span
            className="cursor-help"
            title="Informações necessárias para cadastro na empresa que fornece as maquininhas(Adquirente)."
          >
            <InfoIcon fill="#A1A1A1" />
          </span>
        </span>
      </div>

      <AddressForm
        address={company?.address}
        setObject={setCompany}
        isParentSetObject
        showMessage
      />
    </div>
  );
}

function CompanyDocumentSearch({
  companyDocument,
  setCompanyDocument,
  handleConsultCompanyData,
  handleAutonomousFlow,
  setBasicInfoFormScreen,
}: any) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div>
        <p className="text-dark-color">
          Para facilitar o cadastramento, informe seu CNPJ:
        </p>
        <span className="w-44 flex mt-6">
          <CustomInput
            inputHeaderText="Documento"
            maxLength={18}
            onChange={(e) => setCompanyDocument(formatCNPJInput(e.target.value))}
            value={companyDocument}
            id="search-company-document"
          />
        </span>
        <span className="w-32 flex mt-6">
          <Button text="Consultar" onClick={handleConsultCompanyData} />
        </span>
      </div>

      <div className="flex h-min-max items-center">
        <p className="text-3xl font-semibold text-secondary">OU</p>
      </div>

      <div>
        <p className="text-dark-color">
          Caso seja autônomo, preencha apenas os dados de{" "}
          <strong>dono da empresa</strong>:
        </p>
        <span className="w-40 flex mt-6">
          <Button
            onClick={handleAutonomousFlow}
            text="Sou autônomo"
            className="border border-tertiary-light font bg-white text-tertiary"
          />
        </span>
      </div>
    </div>
  );
}