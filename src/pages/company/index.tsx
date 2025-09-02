import Image from "next/image";
import bankCodes from "../../assets/bankcodes.json";
import PosImage from "../../assets/pos_stone.webp";
import AddressForm from "../../components/addressform/view";
import CompanyRegistrationSteps from "../../components/company/CompanyRegistrationSteps";
import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import CustomSelectOne from "../../components/standard/CustomSelectOne";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import Header from "../../components/standard/Header";
import TablePaginator from "../../components/standard/TablePaginator";
import { ArrowLeftIcon, CheckboxCircleIcon, ChevronDownIcon, ConciergeIcon, ConnectPeopleIcon, DeliveryTruckIcon, GearIcon, InfoIcon, NewReleaseIcon, PlusIcon, POSIcon } from "../../components/svg/SvgIcons";
import { EnumAcquirerConfigStatus, EnumCompanyScreen, EnumPlanType, EnumRegisterCompanyStep, EnumScreen, EnumTransferIntervalType, EnumWeekDaysType } from "../../utils/types";
import { equalsEnum, formatCNPJInput, formatCPFInput, formatCurrency, formatDateDDMMYYYYInput, formatHHmmInput, formatPhoneInput, getAccountStatusDescription, getAccountType, getTransferIntervalDescription, getWeekDayDescription, handleChange, handleCurrencyChange, isValidPositiveStrNumber, isValidString, siglasUF, validateCPF, validateEmail, validatePhone, weekDayMap } from "../../utils/util";
import useCompanyViewModel from "../../viewmodel/company/view.model";
import CompanyManagementNav from "../../components/company/CompanyManagementNav";

export default function CompanyView() {
    const {
        user,
        isAuth,
        company,
        owner,
        acquirerConfig,
        screenProcess,
        isClient,
        companyDocument,
        basicInfoFormScreen,
        ownerInfoFormScreen,
        useUserInfo,
        registerStep,
        stepsTaken,
        selectedPlan,
        fairs,
        fairsFilter,
        showAllTaxes,
        registerFair,
        loadingText,
        companyDataView,
        plan,

        // Ações de navegação e fluxo
        handleUpdateView,
        handleNextRegisterStep,
        addStepTaken,
        handleAutonomousFlow,
        handleCompanyGoBack,
        handleOwnerGoBack,

        // Empresa
        handleConsultCompanyData,
        isValidCompanyData,
        isIndividualCompany,

        // Owner
        handleSelectInfoOwnerFlow,
        isValidOwnerData,

        // Feiras
        handleListFairs,
        handleSelectUF,
        handleSelectCityFetchFairs,
        handleChangeFairCompany,
        handleChangeFairWeekDay,
        handleStartCreateFair,
        handleCreateFair,
        isValidFairData,
        validFairHour,

        // Botão e controle de step
        renderBotomButton,
        validateDisable,

        // Criação
        createCompany,
        createAcquirerConfig,

        // Configurações financeiras
        defineBank,
        defineAccountType,
        defineWeekDay,
        defineTransferInterval,
        enableAnticipation,
        isValidBankAccountData,
        setScreenProcess, 
        isSelectedScreen, 
    } = useCompanyViewModel();

    return (
        (isClient && isAuth) &&
        <>
            <Header title="FeiraFácil" content="Gerencie sua empresa!" />
            <DefaultScreenLayout loadingText={loadingText} screen={EnumScreen.COMPANY} >
                <div className="flex flex-col md:h-full">
                    {!user?.company ?
                        <>
                            <CompanyRegistrationSteps
                                registerFair={!!registerFair}
                                stepsTaken={stepsTaken}
                                handleUpdateView={handleUpdateView}
                                validateDisable={validateDisable}
                            />
                        </>
                        :
                        <>
                            <CompanyManagementNav
                                setScreenProcess={setScreenProcess}
                                isSelectedScreen={isSelectedScreen}
                            />
                        </>
                    }
                    {equalsEnum(screenProcess, EnumCompanyScreen.FIRST_REGISTER) &&
                        <>
                            <div className="lg:h-full">
                                {equalsEnum(registerStep, EnumRegisterCompanyStep.REGISTER_COMPANY) &&
                                    <>
                                        <h2 className="text-dark-color text-lg font-medium mt-8">
                                            Informações básicas
                                        </h2>
                                        <div className="h-fit flex mt-8 gap-10">
                                            {basicInfoFormScreen ?
                                                <div className="flex flex-col gap-6 w-full lg:w-11/12 xl:w-8/12">
                                                    <button onClick={handleCompanyGoBack} className="flex w-fit gap-4">
                                                        <ArrowLeftIcon />
                                                        <p className="text-secondary">
                                                            Voltar
                                                        </p>
                                                    </button>
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        <span className="w-full md:w-1/3">
                                                            <CustomInput id="companyName" value={company?.companyName ?? ""}
                                                                placeHolder="Insira a razão social" inputHeaderText="Razão social"
                                                                invalid={company?.companyName ? !isValidString(company.companyName) : false}
                                                                onChange={e => handleChange(e, setCompany)} />
                                                        </span>
                                                        <span className="md:w-1/3">
                                                            <CustomInput id="tradingName" value={company?.tradingName ?? ""}
                                                                placeHolder="Insira o nome fantasia" inputHeaderText="Nome fantasia"
                                                                invalid={company?.tradingName ? !isValidString(company.tradingName) : false}
                                                                onChange={e => handleChange(e, setCompany)} />
                                                        </span>
                                                        <span className="md:w-1/3">
                                                            <CustomInput disabled id="document" value={company?.document ? formatCNPJInput(company!.document) : ""}
                                                                placeHolder="Insira o documento" inputHeaderText="Documento" onChange={e => handleChange(e, setCompany)} />
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        <span className="w-full flex gap-6">
                                                            <span className="w-full md:w=[30%]">
                                                                <CustomInput id="email" value={company?.email ?? ""} placeHolder="Insira seu e-mail"
                                                                    invalid={company?.email ? !validateEmail(company.email) : false}
                                                                    inputHeaderText="E-mail" type="email" onChange={e => handleChange(e, setCompany)} />
                                                            </span>
                                                            <span className="w-full md:w=[30%]">
                                                                <CustomInput id="phone" type="tel" value={formatPhoneInput(company?.phone ?? "")}
                                                                    invalid={company?.phone ? !validatePhone(company.phone) : false}
                                                                    placeHolder="Insira seu telefone" inputHeaderText="Telefone" maxLength={15}
                                                                    onChange={e => handleChange(e, setCompany)} />
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center gap-1 md:w-[48%]">
                                                            <span className="w-full">
                                                                <CustomInput id="annualRevenue" placeHolder="Insira a receita anual"
                                                                    invalid={company?.annualRevenue ? !isValidPositiveStrNumber(company?.annualRevenue.toString()) : false}
                                                                    value={formatCurrency(company?.annualRevenue ?? 0)}
                                                                    inputHeaderText="Receita anual" onChange={e => handleCurrencyChange(e, setCompany)} />
                                                            </span>
                                                            <span className="cursor-help" title="Informações necessárias para cadastro na empresa que fornece as maquininhas(Adquirente).">
                                                                <InfoIcon fill="#A1A1A1" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <AddressForm address={company?.address} setObject={setCompany} isParentSetObject showMessage />
                                                </div>
                                                :
                                                <div className="flex flex-col md:flex-row gap-8">
                                                    <div>
                                                        <p className="text-dark-color">
                                                            Para facilitar o cadastramento, informe seu CNPJ:
                                                        </p>
                                                        <span className="w-44 flex mt-6">
                                                            <CustomInput inputHeaderText="Documento" maxLength={18}
                                                                onChange={e => setCompanyDocument(formatCNPJInput(e.target.value))}
                                                                value={companyDocument} id="search-company-document" />
                                                        </span>
                                                        <span className="w-32 flex mt-6">
                                                            <Button text="Consultar" onClick={handleConsultCompanyData} />
                                                        </span>
                                                    </div>
                                                    <div className="flex h-min-max items-center">
                                                        <p className="text-3xl font-semibold text-secondary">
                                                            OU
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-dark-color">
                                                            Caso seja autônomo, preencha apenas os dados de <strong>dono da empresa</strong>:
                                                        </p>
                                                        <span className="w-40 flex mt-6">
                                                            <Button onClick={handleAutonomousFlow} text="Sou autônomo"
                                                                className="border border-tertiary-light font bg-white text-tertiary" />
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
                                {equalsEnum(registerStep, EnumRegisterCompanyStep.REGISTER_OWNER) &&
                                    <>
                                        <div className="w-fit flex gap-1 items-center mt-8">
                                            <h2 className="text-dark-color text-lg font-medium">
                                                {'Informações do '.concat(isIndividualCompany()
                                                    ? 'autônomo' : 'dono da empresa')}
                                            </h2>
                                            <span title="Informações necessárias para cadastro na empresa da maquininha(Adquirente).">
                                                <InfoIcon fill="#A1A1A1" size={16} />
                                            </span>
                                        </div>
                                        <div className="mt-8">
                                            {ownerInfoFormScreen ?
                                                <div className="flex flex-col gap-6 w-full lg:w-11/12 xl:w-8/12">
                                                    <button onClick={handleOwnerGoBack} className="flex w-fit gap-4">
                                                        <ArrowLeftIcon />
                                                        <p className="text-secondary">
                                                            Voltar
                                                        </p>
                                                    </button>
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        {isIndividualCompany() &&
                                                            <span className="md:w-2/3">
                                                                <CustomInput id="tradingName" value={company?.tradingName ?? ""}
                                                                    inputHeaderText="Nome fantasia"
                                                                    placeHolder="Nome da sua empresa (Ex: Baraquinha da jú)"
                                                                    invalid={company?.tradingName ? !isValidString(company.tradingName) : false}
                                                                    onChange={e => handleChange(e, setCompany)} />
                                                            </span>
                                                        }
                                                        <span className="w-full md:w-1/3">
                                                            <CustomInput id="name" value={owner?.name ?? ""} placeHolder="Insira seu nome"
                                                                invalid={owner?.name ? !isValidString(owner.name) : false}
                                                                inputHeaderText="Seu nome" onChange={e => handleChange(e, setOwner)} />
                                                        </span>
                                                        <span className="w-full md:w-2/4">
                                                            <CustomInput id="email" type="email" value={owner?.email ?? ""}
                                                                placeHolder="Insira seu e-mail" inputHeaderText="E-mail"
                                                                onChange={e => handleChange(e, setOwner)}
                                                                invalid={owner?.email ? !validateEmail(owner.email) : false} />
                                                        </span>
                                                        <span className="md:w-[28.7%]">
                                                            <CustomInput id="document" maxLength={14}
                                                                value={formatCPFInput(owner?.document ?? "")} placeHolder="Insira seu CPF"
                                                                inputHeaderText="Documento" onChange={e => handleChange(e, setOwner)}
                                                                invalid={owner?.document ? !validateCPF(owner.document) : false} />
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        <span className="w-full flex gap-6">
                                                            <span className="w-full">
                                                                <CustomInput id="phone" type="tel" value={formatPhoneInput(owner?.phone ?? "")}
                                                                    placeHolder="Insira seu telefone" inputHeaderText="Telefone"
                                                                    onChange={e => handleChange(e, setOwner)} maxLength={15}
                                                                    invalid={owner?.phone ? !validatePhone(owner.phone) : false} />
                                                            </span>
                                                            <span className="w-full">
                                                                <CustomInput id="birthdate" maxLength={10} placeHolder="Insira data nascimento"
                                                                    value={formatDateDDMMYYYYInput(owner?.birthdate ?? "")}
                                                                    invalid={owner?.birthdate ? owner?.birthdate?.length != 10 : false}
                                                                    inputHeaderText="Data nascimento" onChange={e => handleChange(e, setOwner)} />
                                                            </span>
                                                        </span>
                                                        <span className="w-full">
                                                            <CustomInput id="occupation" value={owner?.occupation ?? ""}
                                                                invalid={owner?.occupation ? !isValidString(owner.occupation) : false}
                                                                placeHolder="Informe sua ocupação (Ex: Vendedor, Agricultor)"
                                                                inputHeaderText="Ocupação" onChange={e => handleChange(e, setOwner)} />
                                                        </span>
                                                        <span className="flex items-center gap-1 md:w-[69.5%]">
                                                            <span className="w-full">
                                                                <CustomInput id="monthlyIncome" type="numeric" placeHolder="Insira sua receita mensal"
                                                                    invalid={owner?.monthlyIncome ? !isValidPositiveStrNumber(owner?.monthlyIncome.toString()) : false}
                                                                    value={formatCurrency(owner?.monthlyIncome ?? 0)}
                                                                    inputHeaderText="Receita mensal" onChange={e => handleCurrencyChange(e, setOwner)} />
                                                            </span>
                                                            <span title="Informações necessárias para cadastro na empresa da maquininha(Adquirente).">
                                                                <InfoIcon fill="#A1A1A1" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <AddressForm address={owner?.address} setObject={setOwner} isParentSetObject showMessage />
                                                </div>
                                                :
                                                <>
                                                    <div className="h-fit flex flex-col gap-4 md:flex-row">
                                                        <div className="flex items-top gap-2">
                                                            <label className="relative flex pt-0.5 items-top cursor-pointer" htmlFor="user-data-input">
                                                                <input
                                                                    id="user-data-input"
                                                                    name="color"
                                                                    type="radio"
                                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-tertiary-light checked:border-tertiary transition-all"
                                                                    onChange={() => setUseUserInfo(true)}
                                                                />
                                                                <span className="absolute top-3 bg-amber-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                                            </label>
                                                            <p className="text-dark-color">
                                                                Utilizar informações do meu usuário
                                                            </p>
                                                        </div>
                                                        <div className="flex h-min-max items-center">
                                                            <p className="text-3xl font-semibold text-secondary">
                                                                OU
                                                            </p>
                                                        </div>
                                                        <div className="flex items-top gap-2">
                                                            <label className="relative flex pt-0.5 items-top cursor-pointer" htmlFor="manual-data-input">
                                                                <input
                                                                    id="manual-data-input"
                                                                    name="color"
                                                                    type="radio"
                                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-tertiary-light checked:border-tertiary transition-all"
                                                                    onChange={() => setUseUserInfo(false)}
                                                                />
                                                                <span className="absolute top-3 bg-amber-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                                            </label>
                                                            <p className="text-dark-color">
                                                                Inserir manualmente
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="w-32 flex mt-6">
                                                        <Button text="Continuar" onClick={handleSelectInfoOwnerFlow} />
                                                    </span>
                                                </>
                                            }
                                        </div>
                                    </>
                                }
                                {equalsEnum(registerStep, EnumRegisterCompanyStep.FAIRS) &&
                                    <>
                                        {registerFair ?
                                            <>
                                                <div className="w-fit flex flex-col gap-1 mt-8">
                                                    <h2 className="text-dark-color text-lg font-medium">
                                                        Cadastro de feira
                                                    </h2>
                                                    <p className="text-sm">
                                                        Será possível utilizar a nova feira em seu cadastro,
                                                        porém <strong>só estará disponível para outros usuários
                                                            após validarmos</strong> o cadastro.
                                                    </p>
                                                </div>
                                                <div className="mt-8">
                                                    <div className="flex flex-col gap-6 w-full lg:w-11/12 xl:w-8/12">
                                                        <button onClick={() => setRegisterFair(undefined)} className="flex w-fit gap-4">
                                                            <ArrowLeftIcon />
                                                            <p className="text-secondary">
                                                                Voltar
                                                            </p>
                                                        </button>
                                                        <div className="flex flex-col gap-6 md:flex-row">
                                                            <span className="md:w-1/3">
                                                                <CustomInput id="name" value={registerFair?.name ?? ""}
                                                                    inputHeaderText="Nome da feira"
                                                                    placeHolder="Nome da feira (Ex: Feirinha do centro)"
                                                                    invalid={registerFair?.name ? !isValidString(registerFair.name) : false}
                                                                    onChange={e => handleChange(e, setRegisterFair)} />
                                                            </span>
                                                            <span className="w-full md:w-2/3">
                                                                <CustomInput id="description" value={registerFair?.description ?? ""}
                                                                    placeHolder="Insira uma descrição para feira (Ex: Feira municipal histórica da cidade...)"
                                                                    invalid={owner?.name ? !isValidString(owner.name) : false}
                                                                    inputHeaderText="Descrição" onChange={e => handleChange(e, setRegisterFair)} />
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-6 md:flex-row">
                                                            <span className="w-full">
                                                                <p>
                                                                    Informe os dias de funcionamento da feira
                                                                </p>
                                                                <div className="flex flex-wrap">
                                                                    {Array.from(weekDayMap.keys()).map(day => (
                                                                        <div key={day} id={day} className="flex mt-4 items-center md:first:-ml-6">
                                                                            <button onClick={() => handleChangeFairWeekDay(day)}
                                                                                className={`${registerFair.daysOfWeek?.includes(day) && 'bg-primary'}
                                                                                min-w-5 min-h-5 rounded-md border mx-6 border-gray-300`} />
                                                                            <p className="text-xs md:text-sm">
                                                                                {day}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-6">
                                                            <span className="w-1/2 md:w-1/5">
                                                                <CustomInput id="startAt" value={formatHHmmInput(registerFair?.startAt ?? "")}
                                                                    inputHeaderText="Horário início" maxLength={5}
                                                                    placeHolder="Horário início (Ex: 14:00)"
                                                                    invalid={registerFair.startAt ? !validFairHour(registerFair.startAt) : false}
                                                                    onChange={e => handleChange(e, setRegisterFair)} />
                                                            </span>
                                                            <span className="w-1/2 md:w-1/5">
                                                                <CustomInput id="endAt" value={formatHHmmInput(registerFair?.endAt ?? "")}
                                                                    inputHeaderText="Horário fim" maxLength={5}
                                                                    placeHolder="Horário fim (Ex: 19:00)"
                                                                    invalid={registerFair.endAt ? !validFairHour(registerFair.endAt) : false}
                                                                    onChange={e => handleChange(e, setRegisterFair)} />
                                                            </span>
                                                        </div>
                                                        <AddressForm address={registerFair?.address} setObject={setRegisterFair} isParentSetObject showMessage />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div className="bg-white p-6 w-full rounded-2xl shadow-lg mt-10">
                                                <div className="flex justify-between">
                                                    <h2 className="text-md font-semibold md:text-2xl text-secondary">
                                                        Feiras disponíveis
                                                    </h2>
                                                    <span className="flex gap-4 md:gap-6">
                                                        <span className="flex gap-4 md:gap-6">
                                                            <CustomSelectOne handleSelect={handleSelectUF} optionValue={fairsFilter.state}
                                                                options={siglasUF} inputHeaderText="UF" placeHolder="Selecione" />
                                                            <CustomSelectOne handleSelect={city => handleSelectCityFetchFairs(city)}
                                                                inputHeaderText="Cidade" placeHolder="Selecione UF"
                                                                optionValue={fairsFilter.city} options={fairsFilter.citiesByState} />
                                                        </span>
                                                        <span className="hidden md:flex w-36">
                                                            <Button text="Cadastrar feira" onClick={handleStartCreateFair} />
                                                        </span>
                                                        <button className="flex w-10 md:hidden h-10 justify-center 
                                                            items-center rounded-full border border-secondary"
                                                            onClick={handleStartCreateFair}>
                                                            <PlusIcon />
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="w-full border rounded-md mt-6">
                                                    {fairs?.length != 0 ?
                                                        fairs?.map(fair => (
                                                            <div key={fair.id} className="flex py-4 items-center border-b last:border-b-0">
                                                                <button onClick={() => handleChangeFairCompany(fair)}
                                                                    className={`${company?.fairs?.includes(fair) && 'bg-primary'}
                                                                    min-w-5 min-h-5 rounded-md border mx-6 border-gray-300`} />
                                                                <p className="text-xs md:text-sm">
                                                                    {fair.name} - Rua {fair.address?.street} - nº{fair.address?.number}
                                                                </p>
                                                            </div>
                                                        ))
                                                        :
                                                        <div className="flex py-4 items-center justify-center">
                                                            <p>
                                                                Nenhuma feira encontrada para o filtro.
                                                            </p>
                                                        </div>
                                                    }
                                                    {fairs == undefined &&
                                                        <div className="flex py-4 items-center justify-center">
                                                            <p>
                                                                Buscando feiras...
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                                {equalsEnum(registerStep, EnumRegisterCompanyStep.SELECT_PLAN) &&
                                    <div className="w-full mt-8 flex flex-col gap-12 items-center justify-center lg:h-full lg:flex-row md:gap-14">
                                        <button onClick={() => setSelectedPlan(planOptions[EnumPlanType.FREE_TEST_PLAN])}
                                            className={`h-2/3 md:h-fit flex flex-col w-full md:w-96 border-2 border-second-light rounded-md p-4 shadow-md 
                                                ${equalsEnum(selectedPlan, EnumPlanType.FREE_TEST_PLAN) && 'border-tertiary'}`}>
                                            <h2 className="text-center font-semibold text-xl underline lg:mt-24">
                                                Plano gratuito
                                            </h2>
                                            <ul className="text-left flex flex-col gap-2 mt-4">
                                                <li className="flex gap-2">
                                                    <CheckboxCircleIcon />
                                                    1 Mês de acesso grátis
                                                </li>
                                                <li className="flex gap-2">
                                                    <CheckboxCircleIcon />
                                                    Todas funções do sistema
                                                </li>
                                                <li className="flex w-full gap-2">
                                                    <span>
                                                        <CheckboxCircleIcon />
                                                    </span>
                                                    <p>
                                                        Apenas a forma de pagamento<strong> dinheiro</strong>*
                                                    </p>
                                                </li>
                                                <li className="flex gap-2">
                                                    <span>
                                                        <CheckboxCircleIcon />
                                                    </span>
                                                    <p>
                                                        Após período gratuito você pode migrar para o plano com máquininha ou mensal
                                                    </p>
                                                </li>
                                            </ul>
                                        </button>
                                        <button onClick={() => setSelectedPlan(planOptions[EnumPlanType.POS_PLAN])}
                                            className={`h-fit relative flex flex-col w-full md:w-fit border-2 rounded-md p-4
                                            ${equalsEnum(selectedPlan, EnumPlanType.POS_PLAN)
                                                    ? 'border-tertiary shadow-md'
                                                    : 'border-primary shadow-neon animate-border-pulse'}`}>
                                            <span className="absolute top-0 left-0 -ml-4 -mt-4.5 bg-tertiary px-4 py-2 shadow-md rounded-2xl">
                                                <p className="font-semibold text-white">
                                                    Melhor escolha
                                                </p>
                                            </span>
                                            <span className="w-full flex justify-center my-4">
                                                <Image src={PosImage} alt="Imagem POS Stone" height={240} />
                                            </span>
                                            <h2 className="text-center font-semibold text-xl underline">
                                                Plano com maquininha Stone
                                            </h2>
                                            <ul className="mt-4 text-left flex flex-col gap-2 h-fit 2xl:h-36">
                                                <li className="flex flex-col">
                                                    <span className="flex">
                                                        <span className="flex gap-2">
                                                            <span>
                                                                <CheckboxCircleIcon />
                                                            </span>
                                                            <p>
                                                                0.99% das transações*
                                                            </p>
                                                        </span>
                                                        <span onClick={() => setShowAllTaxes(!showAllTaxes)}
                                                            className="px-1" title="Descritivo de todos os valores">
                                                            <ChevronDownIcon width={20} />
                                                        </span>
                                                    </span>
                                                    {showAllTaxes &&
                                                        <span className="ml-4">
                                                            <p>- Percentual referente ao preço do uso do sistema</p>
                                                            <p>- Taxa da maquininha de cartão <strong>NÃO INCLUSA</strong></p>
                                                        </span>
                                                    }
                                                </li>
                                                <li className="flex gap-2">
                                                    <span>
                                                        <CheckboxCircleIcon />
                                                    </span>
                                                    <p>
                                                        Todas funções do sistema
                                                    </p>
                                                </li>
                                                <li className="flex gap-2">
                                                    <span>
                                                        <CheckboxCircleIcon />
                                                    </span>
                                                    <p>
                                                        Pagamento com <strong>MAQUININHA INTEGRADA</strong> e <strong>PIX</strong>
                                                    </p>
                                                </li>
                                            </ul>
                                        </button>
                                        <button onClick={() => setSelectedPlan(planOptions[EnumPlanType.MONTHLY_PLAN])}
                                            className={`h-2/3 md:h-fit flex flex-col w-full md:w-96 border-2 border-second-light rounded-md p-4 shadow-md 
                                                ${equalsEnum(selectedPlan, EnumPlanType.MONTHLY_PLAN) && 'border-tertiary'}`}>
                                            <h2 className="text-center font-semibold text-xl underline h-12 lg:mt-24">
                                                Plano mensal
                                            </h2>
                                            <ul className="text-left flex flex-col gap-2 mt-4">
                                                <li className="flex gap-2">
                                                    <CheckboxCircleIcon />
                                                    R$ 99,90 por mês
                                                </li>
                                                <li className="flex gap-2">
                                                    <CheckboxCircleIcon />
                                                    Todas funções do sistema
                                                </li>
                                                <li className="flex gap-2">
                                                    <CheckboxCircleIcon />
                                                    Forma de pagamento <strong>dinheiro</strong> e <strong>PIX</strong>
                                                </li>
                                                <li className="flex gap-2">
                                                    <CheckboxCircleIcon />
                                                    0.99% da transação no PIX
                                                </li>
                                            </ul>
                                        </button>
                                    </div>
                                }
                            </div>
                            {renderBotomButton() &&
                                <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                                    <span className="w-full md:w-40">
                                        {selectedPlan ?
                                            <Button disabled={!isValidCompanyData()}
                                                text="Finalizar" onClick={createCompany} />
                                            :
                                            <Button disabled={validateDisable()}
                                                text={registerFair ? "Cadastrar" : "Continuar"}
                                                onClick={handleNextRegisterStep} />
                                        }
                                    </span>
                                </div>
                            }
                        </>
                    }
                    {equalsEnum(screenProcess, EnumCompanyScreen.COMPANY) &&
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col gap-6 w-full lg:w-11/12 xl:w-8/12">
                                <nav className="flex w-fit gap-8 mb-6 md:mb-2">
                                    <button onClick={() => setCompanyDataView(true)}
                                        className={`text-secondary text-xs ${companyDataView ? 'font-bold' : 'hover:text-secondary-light'}`}>
                                        {'Dados '.concat(isIndividualCompany() ? 'do autônomo' : 'da empresa')}
                                    </button>
                                    {!isIndividualCompany() &&
                                        <button onClick={() => setCompanyDataView(false)}
                                            title={"Informações do dono da empresa"}
                                            className={`text-secondary text-xs ${!companyDataView ? 'font-bold' : 'hover:text-secondary-light'}`}>
                                            Dados do dono
                                        </button>
                                    }
                                </nav>
                                {companyDataView ?
                                    <>
                                        <div className="flex flex-col gap-6 md:flex-row">
                                            <span className="w-full md:w-1/3">
                                                <CustomInput id="companyName" value={company?.companyName ?? ""}
                                                    disabled inputHeaderText="Razão social"
                                                    invalid={company?.companyName ? !isValidString(company.companyName) : false}
                                                    onChange={e => handleChange(e, setCompany)} />
                                            </span>
                                            <span className="md:w-1/3">
                                                <CustomInput id="tradingName" value={company?.tradingName ?? ""}
                                                    disabled inputHeaderText="Nome fantasia"
                                                    invalid={company?.tradingName ? !isValidString(company.tradingName) : false}
                                                    onChange={e => handleChange(e, setCompany)} />
                                            </span>
                                            <span className="md:w-1/3">
                                                <CustomInput disabled id="document" value={company?.document ? formatCNPJInput(company!.document) : ""}
                                                    placeHolder="Insira o documento" inputHeaderText="Documento" onChange={e => handleChange(e, setCompany)} />
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-6 md:flex-row">
                                            <span className="w-full flex gap-6">
                                                <span className="w-full md:w=[30%]">
                                                    <CustomInput id="email" value={company?.email ?? ""} placeHolder="Insira seu e-mail"
                                                        invalid={company?.email ? !validateEmail(company.email) : false}
                                                        inputHeaderText="E-mail" type="email" onChange={e => handleChange(e, setCompany)} />
                                                </span>
                                                <span className="w-full md:w=[30%]">
                                                    <CustomInput id="phone" type="tel" value={formatPhoneInput(company?.phone ?? "")}
                                                        invalid={company?.phone ? !validatePhone(company.phone) : false}
                                                        placeHolder="Insira seu telefone" inputHeaderText="Telefone" maxLength={15}
                                                        onChange={e => handleChange(e, setCompany)} />
                                                </span>
                                            </span>
                                            <span className="flex items-center gap-1 md:w-[48%]">
                                                <span className="w-full">
                                                    <CustomInput id="annualRevenue" placeHolder="Insira a receita anual"
                                                        invalid={company?.annualRevenue ? !isValidPositiveStrNumber(company?.annualRevenue.toString()) : false}
                                                        value={formatCurrency(company?.annualRevenue ?? 0)}
                                                        inputHeaderText="Receita anual" onChange={e => handleCurrencyChange(e, setCompany)} />
                                                </span>
                                                <span className="cursor-help" title="Informações necessárias para cadastro na empresa que fornece as maquininhas(Adquirente).">
                                                    <InfoIcon fill="#A1A1A1" />
                                                </span>
                                            </span>
                                        </div>
                                        <AddressForm address={company?.address} setObject={setCompany} isParentSetObject />
                                    </>
                                    :
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {isIndividualCompany() &&
                                                <span className="md:w-2/3">
                                                    <CustomInput id="tradingName" value={company?.tradingName ?? ""}
                                                        inputHeaderText="Nome fantasia" disabled
                                                        invalid={company?.tradingName ? !isValidString(company.tradingName) : false}
                                                        onChange={e => handleChange(e, setCompany)} />
                                                </span>
                                            }
                                            <span className="w-full md:w-1/3">
                                                <CustomInput id="name" value={company?.owner.name ?? ""} disabled
                                                    invalid={company?.owner.name ? !isValidString(company?.owner.name) : false}
                                                    inputHeaderText="Seu nome" onChange={e => handleChange(e, setOwner)} />
                                            </span>
                                            <span className="w-full md:w-2/4">
                                                <CustomInput id="email" type="email" value={company?.owner.email ?? ""}
                                                    placeHolder="Insira seu e-mail" inputHeaderText="E-mail"
                                                    onChange={e => handleChange(e, setOwner)}
                                                    invalid={company?.owner.email ? !validateEmail(company?.owner.email) : false} />
                                            </span>
                                            <span className="md:w-[28.7%]">
                                                <CustomInput id="document" maxLength={14}
                                                    value={formatCPFInput(company?.owner.document ?? "")} disabled
                                                    inputHeaderText="Documento" onChange={e => handleChange(e, setOwner)}
                                                    invalid={company?.owner.document ? !validateCPF(company?.owner.document) : false} />
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-6 md:flex-row">
                                            <span className="w-full flex gap-6">
                                                <span className="w-full">
                                                    <CustomInput id="phone" type="tel" value={formatPhoneInput(company?.owner.phone ?? "")}
                                                        placeHolder="Insira seu telefone" inputHeaderText="Telefone"
                                                        onChange={e => handleChange(e, setOwner)} maxLength={15}
                                                        invalid={company?.owner.phone ? !validatePhone(company?.owner.phone) : false} />
                                                </span>
                                                <span className="w-full">
                                                    <CustomInput id="birthdate" maxLength={10} disabled
                                                        value={formatDateDDMMYYYYInput(company?.owner.birthdate ?? "")}
                                                        invalid={company?.owner.birthdate ? company?.owner.birthdate?.length != 10 : false}
                                                        inputHeaderText="Data nascimento" onChange={e => handleChange(e, setOwner)} />
                                                </span>
                                            </span>
                                            <span className="w-full">
                                                <CustomInput id="occupation" value={company?.owner.occupation ?? ""}
                                                    invalid={company?.owner.occupation ? !isValidString(company?.owner.occupation) : false}
                                                    placeHolder="Informe sua ocupação (Ex: Vendedor, Agricultor)"
                                                    inputHeaderText="Ocupação" onChange={e => handleChange(e, setOwner)} />
                                            </span>
                                            <span className="flex items-center gap-1 md:w-[69.5%]">
                                                <span className="w-full">
                                                    <CustomInput id="monthlyIncome" type="numeric" placeHolder="Insira sua receita mensal"
                                                        invalid={company?.owner.monthlyIncome ? !isValidPositiveStrNumber(company?.owner.monthlyIncome.toString()) : false}
                                                        value={formatCurrency(company?.owner.monthlyIncome ?? 0)}
                                                        inputHeaderText="Receita mensal" onChange={e => handleCurrencyChange(e, setOwner)} />
                                                </span>
                                                <span className="cursor-help" title="Informações necessárias para cadastro na empresa que fornece as maquininhas(Adquirente).">
                                                    <InfoIcon fill="#A1A1A1" />
                                                </span>
                                            </span>
                                        </div>
                                        <AddressForm address={company?.owner.address} setObject={setOwner} isParentSetObject />
                                    </div>
                                }
                            </div>
                            <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                                <span className="w-full md:w-40">
                                    <Button disabled text="Salvar alterações"
                                        onClick={() => console.log("Salvar Empresa - Feiras")} />
                                </span>
                            </div>
                        </div>
                    }
                    {equalsEnum(screenProcess, EnumCompanyScreen.FAIRS) &&
                        <>
                            <div>
                                <div className="bg-white p-6 w-full rounded-2xl shadow-lg">
                                    <h2 className="font-semibold text-2xl text-secondary">
                                        Feiras vinculadas
                                    </h2>

                                    <div className="w-full border rounded-md mt-6">
                                        {company?.fairs?.length != 0 ?
                                            company?.fairs?.map(fair => (
                                                <div key={fair.id} className="flex py-4 items-center border-b last:border-b-0">
                                                    <button onClick={() => handleChangeFairCompany(fair)}
                                                        className={`${company?.fairs?.includes(fair) && 'bg-primary'}
                                                                    min-w-5 min-h-5 rounded-md border mx-6 border-gray-300`} />
                                                    <p className="text-xs md:text-sm">
                                                        {fair.name} - Rua {fair.address?.street} - nº{fair.address?.number}
                                                    </p>
                                                </div>
                                            ))
                                            :
                                            <div className="flex py-4 items-center justify-center">
                                                <p>
                                                    Nenhuma feira cadastrada na empresa.
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* TODO */}
                                <div className="bg-white p-6 w-full rounded-2xl shadow-lg mt-10">
                                    <div className="flex justify-between">
                                        <h2 className="text-md font-semibold md:text-2xl text-secondary">
                                            Feiras disponíveis
                                        </h2>
                                        <span className="flex gap-4 md:gap-6">
                                            <span className="flex gap-4 md:gap-6">
                                                <CustomSelectOne handleSelect={handleSelectUF} optionValue={fairsFilter.state}
                                                    options={siglasUF} inputHeaderText="UF" placeHolder="Selecione" />
                                                <CustomSelectOne handleSelect={city => handleSelectCityFetchFairs(city)}
                                                    inputHeaderText="Cidade" placeHolder="Selecione UF"
                                                    optionValue={fairsFilter.city} options={fairsFilter.citiesByState} />
                                            </span>
                                            <span className="hidden md:flex w-36">
                                                <Button text="Cadastrar feira" onClick={handleStartCreateFair} />
                                            </span>
                                            <button className="flex w-10 md:hidden h-10 justify-center 
                                                            items-center rounded-full border border-secondary"
                                                onClick={handleStartCreateFair}>
                                                <PlusIcon />
                                            </button>
                                        </span>
                                    </div>
                                    <div className="w-full border rounded-md mt-6">
                                        {fairs?.length != 0 ?
                                            fairs?.map(fair => (
                                                <div key={fair.id} className="flex py-4 items-center border-b last:border-b-0">
                                                    <button onClick={() => handleChangeFairCompany(fair)}
                                                        className={`${company?.fairs?.includes(fair) && 'bg-primary'}
                                                                    min-w-5 min-h-5 rounded-md border mx-6 border-gray-300`} />
                                                    <p className="text-xs md:text-sm">
                                                        {fair.name} - Rua {fair.address?.street} - nº{fair.address?.number}
                                                    </p>
                                                </div>
                                            ))
                                            :
                                            <div className="flex py-4 items-center justify-center">
                                                <p>
                                                    Nenhuma feira encontrada para o filtro.
                                                </p>
                                            </div>
                                        }
                                        {fairs == undefined &&
                                            <div className="flex py-4 items-center justify-center">
                                                <p>
                                                    Buscando feiras...
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                                <span className="w-full md:w-40">
                                    <Button disabled text="Salvar alterações" onClick={() => console.log("Salvar Empresa - Feiras")} />
                                </span>
                            </div>
                        </>
                    }
                    {equalsEnum(screenProcess, EnumCompanyScreen.BANK_ACCOUNT) &&
                        <>
                            <div>
                                <span className="flex flex-col justify-between md:flex-row lg:w-3/5 xl:w-[58%]">
                                    <h2 className="text-dark-color text-lg font-medium">
                                        Informações financeiras
                                    </h2>
                                    {acquirerConfig?.status &&
                                        <span className="flex items-center">
                                            <p className="font-normal text-dark-color">
                                                Status conta: {getAccountStatusDescription(acquirerConfig?.status)}
                                            </p>
                                            {equalsEnum(EnumAcquirerConfigStatus.ACTIVE, acquirerConfig?.status) ?
                                                <div className="w-3 h-3 bg-primary rounded-full ml-1" />
                                                :
                                                <div className="w-3 h-3 bg-yellow-400 rounded-full ml-1" />
                                            }
                                        </span>
                                    }
                                </span>
                                <div className="h-fit flex mt-8 gap-10 w-full">
                                    <div className="flex flex-col gap-6 w-full lg:w-11/12 xl:w-8/12">
                                        <div className="flex flex-col gap-6 md:flex-row w-full">
                                            <span className="w-full md:w-[328px]">
                                                <CustomInput id="bankAccount.holderDocument" disabled
                                                    value={acquirerConfig?.bankAccount?.holderDocument ?? ""}
                                                    inputHeaderText="Documento" onChange={e => handleChange(e, setAcquirerConfig)} />
                                            </span>
                                            <span className="w-full md:w-[70%]">
                                                <DefaultSelectOne handleSelect={defineBank} height="max-h-64"
                                                    inputHeaderText="Banco"
                                                    optionValue={acquirerConfig?.bankAccount?.bank ?? ""}
                                                    options={bankCodes.map(bank => bank.nome)} />
                                            </span>
                                            <span className="w-full flex gap-6 md:flex-row md:w-4/5">
                                                <span className="w-full md:w-44">
                                                    <CustomInput id="bankAccount.branchNumber" type="numeric" maxLength={4} value={acquirerConfig?.bankAccount?.branchNumber ?? ""}
                                                        inputHeaderText="Agência" onChange={e => handleChange(e, setAcquirerConfig)} />
                                                </span>
                                                <span className="w-full">
                                                    <CustomInput id="bankAccount.branchCheckDigit" type="numeric" placeHolder="Dígito verif. Ag. (Opcional)"
                                                        maxLength={1} value={acquirerConfig?.bankAccount?.branchCheckDigit ?? ""}
                                                        inputHeaderText="Dígito verif. Agência" onChange={e => handleChange(e, setAcquirerConfig)} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="w-full flex flex-col gap-6 md:flex-row">
                                            <span className="w-full flex gap-6 md:flex-row">
                                                <span className="w-full lg:w-1/2">
                                                    <CustomInput id="bankAccount.accountNumber" type="numeric" maxLength={12} value={acquirerConfig?.bankAccount?.accountNumber ?? ""}
                                                        inputHeaderText="Núm. conta" onChange={e => handleChange(e, setAcquirerConfig)} />
                                                </span>
                                                <span className="w-full lg:w-1/2">
                                                    <CustomInput id="bankAccount.accountCheckDigit" maxLength={1} value={acquirerConfig?.bankAccount?.accountCheckDigit ?? ""}
                                                        inputHeaderText="Dígito verif. num. conta" onChange={e => handleChange(e, setAcquirerConfig)} />
                                                </span>
                                            </span>
                                            <span className="w-full lg:w-1/2">
                                                <DefaultSelectOne handleSelect={defineAccountType} optionValue={getAccountType(acquirerConfig?.bankAccount?.type)}
                                                    options={["Conta Corrente", "Conta Salário"]} inputHeaderText="Tipo conta" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-fit flex gap-1 items-center mt-10">
                                    <h2 className="text-dark-color text-lg font-medium">
                                        Configuração de transferência
                                    </h2>
                                    <span title="Dados da data em que será realizado o TED para sua conta.">
                                        <InfoIcon fill="#A1A1A1" size={16} />
                                    </span>
                                </div>
                                <div className="h-fit flex mt-8 gap-10">
                                    <div className="flex flex-col gap-6 w-full xl:w-8/12">
                                        <div className="flex flex-col gap-6 md:flex-row lg:w-1/2">
                                            <span className="w-full md:w-1/2">
                                                <DefaultSelectOne handleSelect={defineTransferInterval} optionValue={getTransferIntervalDescription(acquirerConfig?.transferConfig?.transferInterval as EnumTransferIntervalType)}
                                                    options={["Mensal", "Semanal", "Diário"]} inputHeaderText="Intervalo de transferência" />
                                            </span>
                                            {equalsEnum(acquirerConfig?.transferConfig?.transferInterval, EnumTransferIntervalType.WEEKLY) &&
                                                <span className="md:w-1/2">
                                                    <DefaultSelectOne handleSelect={defineWeekDay} optionValue={getWeekDayDescription(acquirerConfig?.transferConfig?.transferDay as EnumWeekDaysType)}
                                                        options={["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"]}
                                                        inputHeaderText="Dia da transferência" />
                                                </span>
                                            }
                                            {equalsEnum(acquirerConfig?.transferConfig?.transferInterval, EnumTransferIntervalType.MONTHLY) &&
                                                <span className="md:w-1/2">
                                                    <CustomInput id="transferConfig.transferDay" type="numeric" placeHolder="Insira o dia do mês"
                                                        invalid={acquirerConfig?.transferConfig?.transferDay ?
                                                            !(isValidPositiveStrNumber(acquirerConfig?.transferConfig?.transferDay.toString())
                                                                && (acquirerConfig?.transferConfig?.transferDay as number) <= 31) : false}
                                                        maxLength={2} value={acquirerConfig?.transferConfig?.transferDay ? String(acquirerConfig?.transferConfig?.transferDay) : ""}
                                                        inputHeaderText="Dia da transferência" onChange={e => handleChange(e, setAcquirerConfig)} />
                                                </span>
                                            }
                                        </div>
                                        <p className="-mb-4 text-xs md:text-sm">
                                            Dia padrão de realização do TED do recebimento é toda segunda-feira, caso não seja feriado. Valor taxa TED é de <span className="font-semibold">R$ 3,50</span>.
                                        </p>
                                        <p className="text-xs md:text-sm">
                                            O valor do TED será o total de vendas do período, descontando as taxas e o valor de antecipação, caso esteja ativo.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-fit flex gap-1 items-center mt-10">
                                    <h2 className="text-dark-color text-lg font-medium">
                                        Configuração de antecipação
                                    </h2>
                                    <span title="Período em que será realizado a antecipação do recebimento das vendas.">
                                        <InfoIcon fill="#A1A1A1" size={16} />
                                    </span>
                                </div>
                                <div className="h-fit flex mt-8 gap-10">
                                    <div className="flex flex-col gap-6 w-full xl:w-8/12">
                                        <div className="flex flex-col gap-6 md:flex-row lg:w-1/2">
                                            <span className="w-full md:w-1/2">
                                                <DefaultSelectOne handleSelect={enableAnticipation}
                                                    optionValue={acquirerConfig?.anticipationConfig?.enabled ? "ATIVADA" : "DESATIVADA"}
                                                    options={["ATIVADA", "DESATIVADA"]} inputHeaderText="Antecipação automática" />
                                            </span>
                                            <span className="w-full md:w-1/2">
                                                {acquirerConfig?.anticipationConfig?.enabled &&
                                                    <CustomInput id="bank" value={"100%"} disabled
                                                        inputHeaderText="Percentual de antecipação" onChange={() => false} />
                                                }
                                            </span>
                                        </div>
                                        {acquirerConfig?.anticipationConfig?.enabled &&
                                            <p className="text-xs md:text-sm">
                                                Caso ativo, o valor da antecipação de recebíveis por parcela é de <b>1.4%</b>.
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                                <span className="w-full md:w-40">
                                    <Button disabled={!isValidBankAccountData()}
                                        text={company?.hasAcquirerConfig ? "Atualizar" : "Cadastrar"}
                                        onClick={() => createAcquirerConfig()} />
                                </span>
                            </div>
                        </>
                    }
                    {equalsEnum(screenProcess, EnumCompanyScreen.POS) &&
                        <div>
                            <div className="bg-white p-6 w-full rounded-2xl shadow-lg">
                                <div className="flex justify-between">
                                    <h2 className="font-semibold text-2xl text-secondary">
                                        Maquininhas
                                    </h2>
                                    <span className="flex gap-4 md:gap-6 w-28">
                                        <Button text="Solicitar" className="border border-tertiary-light bg-white text-tertiary"
                                            onClick={() => console.log("Solicitar maquininha")} />
                                    </span>
                                </div>

                                <div className="w-full border rounded-md mt-6 px-6">
                                    <div className="flex py-4 justify-between items-center border-b last:border-b-0">
                                        <span className="flex gap-4">
                                            <span>
                                                <POSIcon fill="#3FBB97" />
                                            </span>
                                            <p className="text-xs md:text-sm">
                                                <b className="font-semibold mr-1">Serial:</b>9832*****
                                                <b className="font-semibold mr-1 ml-4">Descrição:</b>Maquininha utilizada no dia-a-dia
                                                <b className="font-semibold mr-1 ml-4">Status:</b>Pendente de Ativação
                                            </p>
                                        </span>
                                        <span className="flex gap-4 md:gap-6 w-28">
                                            <Button text="Ativar" onClick={() => console.log("Solicitar maquininha")} />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 w-full rounded-2xl shadow-lg mt-10">
                                <h2 className="font-semibold text-2xl text-secondary">
                                    Histórico de interações
                                </h2>

                                <div className="w-full border rounded-md mt-6 px-6 md:mb-4">
                                    <div className="flex py-4 justify-between items-center border-b last:border-b-0">
                                        <span className="flex gap-4">
                                            <span>
                                                <NewReleaseIcon fill="#3FBB97" />
                                            </span>
                                            <p className="text-xs md:text-sm">
                                                <b className="font-semibold mr-1 ml-4">21/02/2025 08:10:20</b> - Maquininha recebida, pendente de ativação
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex py-4 justify-between items-center border-b last:border-b-0">
                                        <span className="flex gap-4">
                                            <span>
                                                <DeliveryTruckIcon fill="#3FBB97" />
                                            </span>
                                            <p className="text-xs md:text-sm">
                                                <b className="font-semibold mr-1 ml-4">20/02/2025 10:50:11</b> - Despachada para o cliente
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex py-4 justify-between items-center border-b last:border-b-0">
                                        <span className="flex gap-4">
                                            <span>
                                                <GearIcon fill="#3FBB97" />
                                            </span>
                                            <p className="text-xs md:text-sm">
                                                <b className="font-semibold mr-1 ml-4">20/02/2025 10:07:32</b> - Realizada as configurações para a empresa do cliente
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex py-4 justify-between items-center border-b last:border-b-0">
                                        <span className="flex gap-4">
                                            <span>
                                                <ConnectPeopleIcon fill="#3FBB97" />
                                            </span>
                                            <p className="text-xs md:text-sm">
                                                <b className="font-semibold mr-1 ml-4">15/02/2025 08:10:20</b> - Recebida maquininha do parceiro pelo time feira-fácil
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex py-4 justify-between items-center border-b last:border-b-0">
                                        <span className="flex gap-4">
                                            <span>
                                                <ConciergeIcon fill="#3FBB97" />
                                            </span>
                                            <p className="text-xs md:text-sm">
                                                <b className="font-semibold mr-1 ml-4">12/02/2025 14:30:40</b> - Solicitação de maquininha
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <span className="hidden md:flex">
                                    <TablePaginator
                                        currentPage={1}
                                        totalItems={1}
                                        totalPages={1}
                                        handleChangePage={() => console.log("Teste table")} />
                                </span>
                            </div>
                            <span className="flex md:hidden">
                                <TablePaginator
                                    currentPage={1}
                                    totalItems={1}
                                    totalPages={1}
                                    handleChangePage={() => console.log("Teste table")} />
                            </span>
                        </div>
                    }
                </div>
            </DefaultScreenLayout>
        </>
    );
}