import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { AcquirerConfig } from "../../model/AcquirerConfig";
import { Company } from "../../model/Company";
import { Fair } from "../../model/Fair";
import { Owner } from "../../model/Owner";
import useMiddleware from "../middleware";
import { EnumAccountTypeType, EnumCompanyScreen, EnumExpirationTime, EnumLoadingTextType, EnumPlanStatus, EnumPlanType, EnumRegisterCompanyStep, EnumScreen, EnumTransferIntervalType, PlanDTO } from "../../utils/types";
import { equalsEnum, equalsStr, formatCNPJInput, formatCPFInput, generateUUID, getToken, getTransferIntervalByString, getWeekDayByString, handleChangeValue, isValidHour, isValidObjectRequiredFields, isValidPositiveStrNumber, onlyNumbers, validateCNPJ, validateCPF, validateEmail, validatePhone, validateZipCode } from "../../utils/util";
import { handleCreateAcquirer, handleCreateCompany, handleFetchAcquirerCompanyData, handleFetchCompanyData } from "../../repositories/company.repository";
import { Address } from "../../model/Address";
import { User } from "../../model/User";
import { handleFetchExternalCnpjData, fecthExternalCitiesByState } from "../../repositories/external.repository";
import { fecthFairsBy, createFair } from "../../repositories/fair.repository";
import { getUserData } from "../../repositories/user.repository";
import { handleErrorToast, handleWarnToast } from "../../utils/toast";
import bankCodes from "../../assets/bankcodes.json";

export default function useCompanyViewModel() {
    const { user, handleUpdateCompany } = useAppContext();
    const { isAuth, verifyUserAuth } = useMiddleware(EnumScreen.COMPANY);
    const [screenProcess, setScreenProcess] = useState<EnumCompanyScreen>();
    const [isClient, setIsClient] = useState(false);
    const [company, setCompany] = useState<Company>();
    const [companyDocument, setCompanyDocument] = useState<string>("");
    const [owner, setOwner] = useState<Owner>();
    const [acquirerConfig, setAcquirerConfig] = useState<AcquirerConfig>();
    const [basicInfoFormScreen, setBasicInfoFormScreen] = useState(false);
    const [ownerInfoFormScreen, setOwnerInfoFormScreen] = useState(false);
    const [useUserInfo, setUseUserInfo] = useState(true);
    const [registerStep, setRegisterStep] = useState(EnumRegisterCompanyStep.REGISTER_COMPANY);
    const [stepsTaken, setStepsTaken] = useState<Array<EnumRegisterCompanyStep>>([EnumRegisterCompanyStep.REGISTER_COMPANY]);
    const [selectedPlan, setSelectedPlan] = useState<EnumPlanType>();
    const [fairs, setFairs] = useState<Array<Fair>>();
    const [fairsFilter, setFairsFilter] = useState({ state: "", city: "", citiesByState: [""] });
    const [showAllTaxes, setShowAllTaxes] = useState(false);
    const [registerFair, setRegisterFair] = useState<Fair>()
    const [loadingText, setLoadingText] = useState<EnumLoadingTextType | undefined>(EnumLoadingTextType.DEFAULT_LOADING_TEXT);
    const [companyDataView, setCompanyDataView] = useState(true);
    const [plan, setPlan] = useState<PlanDTO>();


    useEffect(() => {
        setIsClient(true);

        (async () => verifyUserAuth())();

        if (!loadingText) {
            setLoadingText(EnumLoadingTextType.DEFAULT_LOADING_TEXT);
        }

        if (user?.company && user?.company.id) {
            const token = getToken();

            if (token) {
                handleFetchCompanyData(user.company.id, token)
                    .then(res => {
                        setCompany(Company.fromEncryptedData(res));

                        setCompanyDataView(res.organization);
                    })
                    .catch(() => handleErrorToast("Erro ao buscar empresa!"))
                    .finally(() => {
                        setScreenProcess(EnumCompanyScreen.COMPANY);

                        setLoadingText(undefined);
                    });
            }

            return;
        }

        setLoadingText(undefined)
        setScreenProcess(EnumCompanyScreen.FIRST_REGISTER);
    }, [user]);

    useEffect(() => {
        if (equalsEnum(screenProcess, EnumCompanyScreen.BANK_ACCOUNT)) {

            if (!company?.hasAcquirerConfig) {
                let document = isIndividualCompany() ? formatCPFInput(owner?.document!) : formatCNPJInput(company?.document!);

                setAcquirerConfig(AcquirerConfig.defaultWithDocumentBank(document!, bankCodes[0].nome));

                return;
            }

            if (company?.id
                && acquirerConfig === undefined) {
                let token = getToken();

                setLoadingText(EnumLoadingTextType.FETCHING_ACQUIRER_CONFIG_ACCOUNT);

                if (token) {
                    handleFetchAcquirerCompanyData(company?.id, token)
                        .then(res => {
                            setAcquirerConfig(res);

                            setLoadingText(undefined);
                        })
                        .catch(err => {
                            console.error(err);

                            setLoadingText(EnumLoadingTextType.FETCHING_ACQUIRER_ERROR);
                        })
                }
            }
        }
    }, [screenProcess]);

    function isSelectedScreen(screen: EnumCompanyScreen) {
        return equalsEnum(screenProcess, screen)
    }

    function handleAutonomousFlow() {
        setCompany(new Company({
            organization: false, address: undefined, phone: undefined, companyName: undefined,
            annualRevenue: undefined, document: undefined, email: undefined
        }));

        setCompanyDocument("");

        handleUpdateView(EnumRegisterCompanyStep.REGISTER_OWNER);
    }

    function handleCompanyGoBack() {
        setCompany(undefined);

        setBasicInfoFormScreen(false);
    }

    function handleOwnerGoBack() {
        setOwner(undefined);

        setOwnerInfoFormScreen(false);
    }

    function handleConsultCompanyData() {

        if (validateCNPJ(companyDocument)) {
            handleFetchExternalCnpjData(onlyNumbers(companyDocument))
                .then(setCompany)
                .then(() => {
                    if (owner && owner.document) {
                        setOwner(undefined);
                    }

                    setBasicInfoFormScreen(true);
                })
                .catch(console.error);

            return;
        }

        handleWarnToast("Necessário informar um CNPJ valido.")
    }

    function handleSelectInfoOwnerFlow() {

        if (isIndividualCompany()) {
            handleChangeValue("", "tradingName", setCompany);
        }

        if (useUserInfo) {
            const token = getToken();

            if (token) {
                getUserData(token)
                    .then(res => {
                        var userData = User.fromEncryptedData(res);

                        if (userData.address?.id) {
                            userData.address.id = undefined;
                        }

                        setOwner(Owner.fromUser(userData));
                    })
                    .catch(console.error);
            }

        } else {
            setOwner(new Owner({ address: new Address({ state: undefined }) }));
        }

        setOwnerInfoFormScreen(true);
    }

    function handleListFairs(city?: string, state?: string) {
        const token = getToken();

        if (token) {
            fecthFairsBy(state ?? fairsFilter.state, city ?? fairsFilter.city, token)
                .then(setFairs)
                .catch(() => handleErrorToast("Erro ao buscar feiras, tente novamente."));
        }

    }

    function handleSelectUF(state: string, defaultCity?: string) {
        setFairsFilter({
            state,
            city: defaultCity ?? "",
            citiesByState: []
        })

        fecthExternalCitiesByState(state)
            .then(res => {
                setFairsFilter(prev => {
                    return {
                        ...prev,
                        city: defaultCity ?? "Selecione",
                        citiesByState: res.map(item => item.nome).sort()
                    }
                })
            })
            .catch(console.error);
    }

    function handleSelectCityFetchFairs(city: string, state?: string) {
        handleChangeValue(city, "city", setFairsFilter);

        handleListFairs(city, state);
    }

    function handleChangeFairCompany(fair: Fair) {

        let newFairs = Array.from(company?.fairs ?? []);

        if (company?.fairs?.includes(fair)) {
            newFairs = newFairs.filter(item => item !== fair);
        } else {
            newFairs.push(fair);
        }

        handleChangeValue(newFairs, "fairs", setCompany);
    }

    function handleChangeFairWeekDay(weekDay: string) {

        let daysOfWeek = Array.from(registerFair?.daysOfWeek ?? []);

        if (registerFair?.daysOfWeek?.includes(weekDay)) {
            daysOfWeek = daysOfWeek.filter(item => item !== weekDay);
        } else {
            daysOfWeek.push(weekDay);
        }

        handleChangeValue(daysOfWeek, "daysOfWeek", setRegisterFair);
    }

    function handleStartCreateFair() {
        setRegisterFair(new Fair({ address: new Address({ state: fairsFilter?.state, city: fairsFilter?.city }) }));
    }

    function handleCreateFair() {
        const payload = new Fair(registerFair);

        payload.parseDays();

        const token = getToken();

        if (token) {
            createFair(payload, token)
                .then(() => {
                    const updatedFairs = Array.from(fairs ?? []);

                    //Para feiras temp
                    payload.id = generateUUID();

                    updatedFairs.push(payload);

                    setFairs(updatedFairs);
                })
                .catch(console.error)
                .finally(() => setRegisterFair(undefined))
        }
    }

    function handleUpdateView(step: EnumRegisterCompanyStep) {
        const newArray = [EnumRegisterCompanyStep.REGISTER_COMPANY];

        switch (step) {
            case EnumRegisterCompanyStep.REGISTER_COMPANY:
                setStepsTaken(newArray);
                setRegisterStep(step);
                break;
            case EnumRegisterCompanyStep.REGISTER_OWNER:
                newArray.push(step);
                setStepsTaken(newArray);
                setRegisterStep(step);
                break;
            case EnumRegisterCompanyStep.FAIRS:
                newArray.push(EnumRegisterCompanyStep.REGISTER_OWNER, step);
                setStepsTaken(newArray);
                setRegisterStep(step);
                break;
            case EnumRegisterCompanyStep.SELECT_PLAN:
                newArray.push(EnumRegisterCompanyStep.REGISTER_OWNER,
                    EnumRegisterCompanyStep.FAIRS, step);
                setStepsTaken(newArray);
                setRegisterStep(step);
                break;
            default:
                break;
        }
    }

    function addStepTaken(step: EnumRegisterCompanyStep) {
        if (!stepsTaken.includes(step)) {
            const newSteps = Array.from(stepsTaken);

            newSteps.push(step);

            setStepsTaken(newSteps);
        }
    }

    function handleNextRegisterStep() {

        if (registerFair) {
            return handleCreateFair();
        }

        switch (registerStep) {
            case EnumRegisterCompanyStep.REGISTER_COMPANY:
                setRegisterStep(EnumRegisterCompanyStep.REGISTER_OWNER);
                addStepTaken(EnumRegisterCompanyStep.REGISTER_OWNER);
                break;
            case EnumRegisterCompanyStep.REGISTER_OWNER:
                if (isIndividualCompany()) {
                    handleSelectUF(owner?.address?.state!, owner?.address?.city!);
                    handleSelectCityFetchFairs(owner?.address?.city!, company?.address?.state!);
                } else {
                    handleSelectUF(company?.address?.state!, company?.address?.city!);
                    handleSelectCityFetchFairs(company?.address?.city!, company?.address?.state!);
                }

                setRegisterStep(EnumRegisterCompanyStep.FAIRS);
                addStepTaken(EnumRegisterCompanyStep.FAIRS);
                break;
            case EnumRegisterCompanyStep.FAIRS:
                setRegisterStep(EnumRegisterCompanyStep.SELECT_PLAN);
                addStepTaken(EnumRegisterCompanyStep.SELECT_PLAN);
                break;
            default:
                break;
        }
    }

    function validateDisable(step?: EnumRegisterCompanyStep) {
        switch (step ?? registerStep) {
            case EnumRegisterCompanyStep.REGISTER_COMPANY:
                return !isValidCompanyData() && !!registerFair;
            case EnumRegisterCompanyStep.REGISTER_OWNER:
                return !isValidOwnerData();
            case EnumRegisterCompanyStep.FAIRS:
                return registerFair ? !isValidFairData() : !(company?.fairs && company?.fairs?.length! > 0);
            case EnumRegisterCompanyStep.SELECT_PLAN:
                return !selectedPlan;
            default:
                break;
        }
    }

    function isValidCompanyData() {
        return (isValidObjectRequiredFields(company, ["imageUrl", "fairs"])
            && isValidObjectRequiredFields(company?.address, ["number", "complement"])
            && validateZipCode(company?.address?.zipCode ?? "")
            && validateEmail(company?.email ?? "")
            && validateCNPJ(company?.document ?? "")
            && validatePhone(company?.phone ?? "")
            && isValidPositiveStrNumber(company?.annualRevenue?.toString())
            || isIndividualCompany());
    }

    function isValidOwnerData() {
        return isValidObjectRequiredFields(owner)
            && isValidObjectRequiredFields(owner?.address, ["number", "complement", "id"])
            && validateZipCode(owner?.address?.zipCode ?? "")
            && validateEmail(owner?.email ?? "")
            && validateCPF(owner?.document ?? "")
            && validatePhone(owner?.phone ?? "")
            && isValidPositiveStrNumber(owner?.monthlyIncome?.toString())
            && owner?.birthdate?.length == 10;
    }

    function isValidFairData() {
        return isValidObjectRequiredFields(registerFair, ["id"])
            && isValidObjectRequiredFields(registerFair?.address, ["number", "complement"])
            && validateZipCode(registerFair?.address?.zipCode ?? "")
            && isValidHour(registerFair?.startAt!)
            && isValidHour(registerFair?.endAt!)
            && registerFair!.daysOfWeek.length > 0;
    }

    function isIndividualCompany() {
        return !company?.organization;
    }

    function renderBotomButton() {
        return (![EnumRegisterCompanyStep.REGISTER_COMPANY, EnumRegisterCompanyStep.REGISTER_OWNER].includes(registerStep)
            || (equalsEnum(registerStep, EnumRegisterCompanyStep.REGISTER_COMPANY) && basicInfoFormScreen)
            || (equalsEnum(registerStep, EnumRegisterCompanyStep.REGISTER_OWNER) && ownerInfoFormScreen));
    }

    function validFairHour(hour: string) {
        const isValid = isValidHour(hour);

        if (registerFair?.startAt
            && registerFair?.endAt
            && isValidHour(registerFair.startAt)
            && isValidHour(registerFair.endAt)) {
            return parseInt(onlyNumbers(registerFair.endAt)) > parseInt(onlyNumbers(registerFair?.startAt));
        }

        return isValid
    }

    function createCompany() {
        const token = getToken();

        if (token && company && owner && fairs) {
            const fairsId = fairs
                .map(item => item.id)
                .filter((id): id is string => id !== null && id !== undefined);

            company.owner = owner!;
            company.fairsId = fairsId;

            company.plan = {
                id: 3,
                name: "Teste grátis",
                description: "Plano gratuito por 7 dias",
                type: EnumPlanType.TRIAL,
                status: EnumPlanStatus.ACTIVE,
                expirationTime: EnumExpirationTime.ONE_WEEK,
            };

            console.log(company);


            handleCreateCompany(company, token)
                .then(res => {
                    handleUpdateCompany(res)

                    setScreenProcess(EnumCompanyScreen.COMPANY);
                })
                .catch(console.error);
        }
    }

    function createAcquirerConfig() {
        const token = getToken();

        if (token && acquirerConfig) {
            let payload = {
                ...acquirerConfig,
                bankAccount: {
                    ...acquirerConfig.bankAccount,
                    holderDocument: onlyNumbers(acquirerConfig.bankAccount!.holderDocument!),
                    bank: bankCodes.find(bank => bank.nome === acquirerConfig.bankAccount!.bank)?.codigo
                }
            } as AcquirerConfig;

            handleCreateAcquirer(payload, company?.id!, token)
                .then(res => {
                    handleChangeValue(res.status, "status", setAcquirerConfig);

                    handleChangeValue(true, "company.hasAcquirerConfig", setCompany);
                })
                .catch(console.error);
        }
    }

    function defineBank(bankName: string) {
        const bank = bankCodes.find(bank => bank.nome === bankName);

        if (bank) {
            setAcquirerConfig((prevState: any) => {
                return {
                    ...prevState,
                    ["bankAccount"]: {
                        ...prevState["bankAccount"],
                        bank: bankName
                    },
                };
            });
        }
    }

    function defineAccountType(val: string) {
        let accType = equalsStr(val, "Conta Corrente") ? EnumAccountTypeType.CHECKING : EnumAccountTypeType.SAVINGS;

        setAcquirerConfig((prevState: any) => {
            return {
                ...prevState,
                ["bankAccount"]: {
                    ...prevState["bankAccount"],
                    type: accType
                },
            };
        });
    }

    function defineWeekDay(val: string) {
        setAcquirerConfig((prevState: any) => {
            return {
                ...prevState,
                ["transferConfig"]: {
                    ...prevState["transferConfig"],
                    transferDay: getWeekDayByString(val)
                },
            };
        });
    }

    function defineTransferInterval(val: string) {
        let enumTransferInterval = getTransferIntervalByString(val);

        setAcquirerConfig((prevState: any) => {
            return {
                ...prevState,
                ["transferConfig"]: {
                    ...prevState["transferConfig"],
                    transferInterval: enumTransferInterval,
                    transferDay: equalsEnum(enumTransferInterval, EnumTransferIntervalType.WEEKLY) ? getWeekDayByString(val) : undefined
                },
            };
        });
    }

    function enableAnticipation(val: string) {
        let status = equalsStr(val, "ATIVADA");

        setAcquirerConfig((prevState: any) => {
            return {
                ...prevState,
                ["anticipationConfig"]: {
                    ...prevState["anticipationConfig"],
                    enabled: status
                },
            };
        });
    }

    function isValidBankAccountData() {
        return acquirerConfig?.bankAccount?.branchNumber
            && acquirerConfig?.bankAccount?.accountNumber
            && acquirerConfig?.bankAccount?.accountCheckDigit
            && acquirerConfig?.bankAccount?.bank
            && acquirerConfig?.bankAccount?.holderDocument
            && ((acquirerConfig?.transferConfig?.enabled
                && (equalsEnum(acquirerConfig?.transferConfig?.transferInterval, EnumTransferIntervalType.DAILY)
                    || (acquirerConfig?.transferConfig?.transferDay && acquirerConfig?.transferConfig?.transferInterval)))
                || !acquirerConfig.transferConfig?.enabled)
    }

    return {
        setScreenProcess, 
        isSelectedScreen, 
        // Estados
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
    }
}