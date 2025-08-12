import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { Id } from "react-toastify";
import { Address } from "../model/Address";
import { Product } from "../model/Product";

//Interfaces
export interface IAppContext {
  user: AuthUserDataType | undefined;
  showFullNavbar: boolean;
  handleFetchUserData: () => void;
  handleChangeShowFullNavbar: () => void;
  handleUpdateDocument: (document: string) => void;
  handleUpdateCompany: (company: SimpleCompanyData) => void;
  handleAuth: (email: string, password: string) => Promise<void>;
}

export interface IButtonProps {
  text: string;
  onClick: Function;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface IGoBackBtnProps {
  text: string;
  onClick: (event: any) => void;
  renderText: boolean;
  disabled?: boolean;
}

export interface IToggleProps {
  handleChange: Dispatch<SetStateAction<any>>;
  selected: boolean;
  idToggle: string;
  firstText?: string;
  secondText?: string;
}

export interface ILoadingProps {
  loadingText?: string;
}

export interface ISelectOneProps {
  handleSelect: (str: string) => void;
  optionValue: string;
  options: Array<string>;
  inputHeaderText: string;
  placeHolder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  height?: string;
  width?: string;
}

export interface IInputProps {
  id: string;
  value: string;
  inputHeaderText: string;
  placeHolder?: string;
  onChange: (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  withEyeIcon?: boolean;
  disabled?: boolean;
  maxLength?: number;
  type?: "text" | "email" | "password" | "numeric" | "tel";
  invalid?: boolean;
}

export interface ITextAreaProps {
  id: string;
  value: string;
  placeHolder: string;
  onChange: (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  rows: number;
}

export interface ISvgProps {
  size?: number;
  width?: number;
  fill?: string;
}

export interface IHeaderProps {
  title: string;
  content: string;
}

export interface ISimpleDialogProps {
  dialogTitle: string;
  children?: JSX.Element;
  firstBtnText: string;
  secondBtnText: string;
  handleFunction: Function;
  handleClose: Function;
  handleFunctionSecondBtn?: Function;
}

export interface IDefaultDialogProps {
  children?: JSX.Element;
  className?: string;
  renderOnlyChild?: boolean;
  dialogTitle?: string;
  handleClose?: Function;
}

export interface IDashboardCardProps {
  title: string;
  amount: number;
  percentage: number;
  positiveTrending?: boolean;
  variant?: boolean;
}

export interface INavBar {
  screen: EnumScreen;
}

export interface ITablePaginatorProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  handleChangePage: (val: number) => void;
}

export interface IAddressFormProps {
  address?: Address;
  showMessage?: boolean;
  isParentSetObject?: boolean;
  setObject: SetStateAction<any>;
}

export interface ITokenPhoneValidatorProps {
  phone: string;
  tokenCode: Array<string>;
  inputRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  countdown: number;
  handlePasteTokenCode: (event: any) => void;
  handleChangeTokenCode: (event: any, index: number) => void;
  handleKeyDownTokenCode: (event: any, index: number) => void;
  handleValidateToken: () => void;
  handleResendTokenCode: () => void;
}

//Types
export type UpdateUserType = {
  name?: string;
  email?: string;
  phone?: string;
  gender?: EnumGender;
  password?: string;
  document?: string;
  birthdate?: string;
  address?: Address;
};

export type SimpleCompanyData = {
  id: string;
  name: string;
  document: string;
};

export type StockMovementType = {
  id: number;
  produto: Product;
  tipoES: EnumEntryOut;
  tipoMovimento: string;
  quantidade: number;
  saldo: number;
  dataMovimento: string;
};

export type OrderItemType = {
  procuct: Product;
  quantity: number;
};

export type AuthUserDataType = {
  id: string;
  name: string;
  phone: string;
  active: boolean;
  role: EnumUserType;
  password?: string;
  document?: string;
  company?: SimpleCompanyData;
};

export type AppContextType = {
  user: AuthUserDataType | undefined;
  showFullNavbar: boolean;
  handleFetchUserData: () => void;
  handleChangeShowFullNavbar: () => void;
  handleUpdateDocument: (document: string) => void;
  handleUpdateCompany: (company: SimpleCompanyData) => void;
  handleAuth: (phone: string, password: string) => Promise<void>;
};

export type RequestConfig = {
  reqParams: RequestParamsType;
  reqInitConfig?: RequestInteractionConfigType;
};

export type RequestParamsType = {
  token?: string;
  json?: string | FormData;
  headers?: Map<string, string>;
  query?: Object;
};

export type RequestInteractionConfigType = {
  toastError?: boolean;
  throws?: boolean;
  toastify?: Id;
  toastifySuccessMsg?: string;
};

export type AuthUserResponseData = {
  expiresIn: number;
  token: string;
};

export type IbgeCitiesResponse = {
  id: number;
  nome: string;
};

///Revisar tipagens

export type CustomerType = {
  id: string;
  name: string;
  document: string;
  email?: string;
  phone?: string;
};

export type IncreaseDiscountType = {
  addition: number;
  discount: number;
};

export type SaleItem = {
  quantity: number;
  salePrice: number;
  productId: string;
};

export type PoiPayment = {
  deviceSerialNumber: string;
  displayName: string;
};

export type Payment = {
  paymentType: string | undefined;
  poiPayment?: PoiPayment;
  instalments?: number;
};

export type Sale = {
  customerId: string;
  discount: number;
  increase: number;
  items: SaleItem[];
  salePeriodId: string;
  companyId: string;
  payment: Payment;
};

export type OrderResponseType = {
  id: string;
  status: string;
};

export type PreRegisterUserType = {
  name: string;
  phone: string;
  password: string;
  role: string;
};

export type ProductPagebleList = {
  data: Array<Product>;
  totalItens: number;
  totalPages: number;
  currentPage: number;
};

export type TransferConfigType = {
  enabled: boolean;
  transferInterval?: EnumTransferIntervalType;
  transferDay?: number | EnumWeekDaysType;
};

export type AnticipationConfigType = {
  enabled: boolean;
  volumePercentage?: number;
  days?: Array<number>;
};

export type BankAccountType = {
  id?: number;
  holderDocument: string;
  bank: string;
  branchNumber: string;
  accountNumber: string;
  accountCheckDigit: string;
  branchCheckDigit: string;
  type: EnumAccountTypeType;
};

//Enum's
export enum EnumAuthScreen {
  LOGIN,
  FORGOT_PASSWORD,
  CREATE_USER,
  SEND_VALIDATION_TOKEN,
  VERIFY_TOKEN,
}

export enum EnumUserType {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

export enum EnumCardType {
  DEBIT,
  CREDIT,
}

export enum EnumOrderStatus {
  PAGO,
  AGUARD_PGTO,
  CANCELADO,
}

export enum EnumPaymentType {
  CREDIT_CARD = "Cartão de crédito",
  DEBIT_CARD = "Cartão de débito",
  PIX = "PIX",
}

export enum EnumSocialNetwork {
  INSTAGRAM = "INSTAGRAM",
  FACEBOOK = "FACEBOOK",
  LINKEDIN = "LINKEDIN",
  YOUTUBE = "YOUTUBE",
}

export enum EnumScreenStep {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
}

export enum EnumScreen {
  HOME,
  SALES,
  COMPANY,
  PRODUCTS,
  STOCK,
  ORDER,
  PROFILE,
}

export enum EnumCompanyScreen {
  FIRST_REGISTER,
  COMPANY,
  FAIRS,
  BANK_ACCOUNT,
  POS,
}

export enum EnumRegisterCompanyStep {
  REGISTER_COMPANY,
  REGISTER_OWNER,
  FAIRS,
  SELECT_PLAN,
  BANK_ACCOUNT,
  POS_RESQUEST,
}

export enum EnumProductType {
  VERDURA = "VERDURA",
  LEGUME = "LEGUME",
  FRUTA = "FRUTA",
  FRUITS = "FRUITS",
  VEGETABLES = "VEGETABLES",
  LEGUMES = "LEGUMES",
  ANIMAL_ORIGIN = "ANIMAL_ORIGIN",
  HERBS_SPICES = "HERBS_SPICES",
  HOMEMADE_PRODUCTION = "HOMEMADE_PRODUCTION",
  CEREALS_GRAINS = "CEREALS_GRAINS",
  SNACKS = "SNACKS",
  CRAFTS = "CRAFTS",
  FLOWERS = "FLOWERS",
  HOUSEHOLD_UTENSILS = "HOUSEHOLD_UTENSILS",
}

export enum EnumEntryOut {
  ENTRY = "ENTRADA",
  OUT = "SAÍDA",
}

export enum EnumGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum EnumAcquirerConfigStatus {
  ACTIVE = "ACTIVE",
  REGISTRATION = "REGISTRATION",
  AFFILIATION = "AFFILIATION",
  REFUSED = "REFUSED",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
  INACTIVE = "INACTIVE",
}

export enum EnumPlanType {
  POS_PLAN = "POS_PLAN",
  MONTHLY_PLAN = "MONTHLY_PLAN",
  FREE_TEST_PLAN = "FREE_TEST_PLAN",
}

export enum EnumTransferIntervalType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum EnumWeekDaysType {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
}

export enum EnumMeasurementType {
  UNIT = "UNIT",
  BOX = "BOX",
  WEIGHT = "WEIGHT",
  VOLUME = "VOLUME",
}

export enum EnumMeasurementUnit {
  KG = "KG",
  G = "Grama",
  L = "Litro",
  ML = "Mililitro",
  QTD = "Quantidade",
}

export enum EnumAccountTypeType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
}

export enum EnumLoadingTextType {
  DEFAULT_LOADING_TEXT = "Carregando...",
  FETCHING_ACQUIRER_CONFIG_ACCOUNT = "Buscando dados da conta...",
  FETCHING_ACQUIRER_ERROR = "Erro ao buscar configuração da conta bancária! Tente novamente. Se o erro persistir, entre em contato com o suporte.",
}

export type FilterProduct = {
  companyId?: string;
  name?: string;
  category?: string;
  inStock?: boolean;
  page?: number;
};

export type ProductDTO = {
  name: string;
  code: string;
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  measurementType?: EnumMeasurementType;
  measurementUnit?: EnumMeasurementUnit;
  category?: EnumProductType;
  active?: boolean;
  stock: number;
  description: string;
};

export type ProductProps = {
  products: Product[];
  setProductToEdit: (product: Product) => void;
  handleChangePage: (page: number) => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type ProductFormProps = {
  productToEdit: Product;
  isNewProduct: boolean;
  setProductToEdit: (product?: Product) => void;
  setFieldValue: (field: keyof Product, value: any) => void;
  saveProduct: () => void;
  updateProduct: () => void;
  validateProduct: (product: Product) => string | null;
};

export type TableNavigation = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
