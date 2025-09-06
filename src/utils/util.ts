import CryptoJS from "crypto-js";
import router from "next/router";
import { toast, UpdateOptions } from "react-toastify";

import abobrinha from "../assets/vegetables/abobrinha.png";
import alface from "../assets/vegetables/alface.png";
import banana from "../assets/vegetables/banana.png";
import batatadoce from "../assets/vegetables/batata_doce.png";
import beterraba from "../assets/vegetables/beterraba.png";
import cebolinha from "../assets/vegetables/cebolinha.png";
import cenoura from "../assets/vegetables/cenoura.png";
import couve from "../assets/vegetables/couve.png";
import repolhoroxo from "../assets/vegetables/repolho_roxo.png";
import {
  EnumAccountTypeType,
  EnumAcquirerConfigStatus,
  EnumOrderStatus,
  EnumProductCategory,
  EnumScreenStep,
  EnumTransferIntervalType,
  EnumWeekDaysType,
} from "./types";

export function handleLogout(showToast?: boolean) {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  if (showToast) {
    toast.error("Sessão expirada, faça o login novamente.");
  }

  return router.push("/auth");
}

// Utilizar o handleCurrencyChange para lidar com campos de moeda
export function handleChange(
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setState: any
) {
  let rawValue = e.target.value;

  if (e.target.getAttribute("type") == "numeric") {
    rawValue = onlyNumbers(e.target.value);
  }

  if (e.target.id.includes(".")) {
    let param = e.target.id.replace(/^[^.]+\./, "");
    let paramMatch = e.target.id.match(/^[^.]+(?=\.)/);
    let objectParam = paramMatch ? paramMatch[0] : "";

    return setState((prevState: any) => {
      return {
        ...prevState,
        [objectParam]: {
          ...prevState[objectParam],
          [param]: rawValue,
        },
      };
    });
  }

  setState((prevState: any) => {
    return {
      ...prevState,
      [e.target.id]: rawValue,
    };
  });
}

export function handleCurrencyChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: any
) {
  const rawValue = e.target.value;

  const digitsOnly = rawValue.replace(/\D/g, "");
  const numericValue = Number(digitsOnly) / 100;

  const id = e.target.id;

  if (id.includes(".")) {
    const param = id.replace(/^[^.]+\./, "");
    const objectParam = id.match(/^[^.]+(?=\.)/)?.[0] || "";

    setState((prevState: any) => ({
      ...prevState,
      [objectParam]: {
        ...prevState[objectParam],
        [param]: numericValue,
      },
    }));
  } else {
    setState((prevState: any) => ({
      ...prevState,
      [id]: numericValue,
    }));
  }
}

export function handleChangeValue(value: any, field: string, setState: any) {
  setState((prevState: any) => {
    return {
      ...prevState,
      [field]: value,
    };
  });
}

export function verifyAuth() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiration");

  if (!token || !expiration) {
    return false;
  }

  return isValidToken(expiration);
}

export function maskDocument(document: string) {
  document = document.replace(/\D/g, "");
  document = document.replace(/(\d{3})(\d)/, "$1.$2");
  document = document.replace(/(\d{3})(\d)/, "$1.$2");
  document = document.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return document;
}

export function formatCPFInput(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  } else {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(
      6,
      9
    )}-${cleaned.slice(9, 11)}`;
  }
}

export function formatCNPJInput(value: string) {
  value = value.replace(/\D/g, "");

  // 00.000.000/0000-00
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");

  return value;
}

export function maskPhone(phone: string) {
  phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  return phone;
}

export function formatPhoneInput(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 2) {
    return `${cleaned}`;
  } else if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7
    )}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }
}

export function formatMoneyWithSign(amount: number) {
  console.log(amount);

  if (!amount) {
    return "R$0.00";
  }

  return amount
    .toFixed(2)
    .replace("", "R$ ")
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function getNumberFromMoneyStr(value: string): number {
  const numeric = value
    .replace(/\s/g, "")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(numeric);
}

export function formatCurrency(
  value: number,
  withSymbol: boolean = true
): string {
  const formatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return withSymbol ? formatted : formatted.replace(/^R\$\s?/, "");
}

export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  let length = 12;
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (resultado !== parseInt(digits.charAt(0))) return false;

  length = 13;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (resultado !== parseInt(digits.charAt(1))) return false;

  return true;
}

export function capitalizeWordsIgnoreValues(str: string) {
  const toIgnore = [
    "de",
    "da",
    "do",
    "das",
    "dos",
    "e",
    "em",
    "a",
    "o",
    "as",
    "os",
  ];

  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, i) => {
      if (i === 0 || !toIgnore.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(" ");
}

export function isValidObjectRequiredFields(
  obj: any,
  fieldToIgnore: Array<string> = []
) {
  if (!obj) {
    return false;
  }

  return Object.entries(obj).every(([key, value]) => {
    if (fieldToIgnore.includes(key)) {
      return true;
    }

    return (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      (typeof value == "string" ? isValidString(value) : true)
    );
  });
}

export function isValidString(value: string) {
  return value.replace(/\s+/g, "") !== "";
}

export function firstElement<T>(array: T[]): T | undefined {
  return array ? array[0] : undefined;
}

export function isNullOrEmpty(obj: any): boolean {
  if (obj instanceof Array) {
    return obj == null || obj == undefined || obj.length == 0;
  }

  return obj == null || obj == undefined || obj.trim() == "";
}

export function isNullOrUndefined(obj: any): boolean {
  return obj == null || obj == undefined;
}

export function equalsStr(firstStr: string, secondStr: string) {
  return firstStr === secondStr;
}

export function equalsBoolean(firstStr: boolean, secondStr: boolean) {
  return firstStr === secondStr;
}

export function isValidPositiveStrNumber(value?: string) {
  if (!value) {
    return false;
  }

  const valueParse = Number.parseInt(onlyNumbers(value!.toString()!));

  if (valueParse.toString() == "NaN") {
    return false;
  }

  return Number.parseInt(onlyNumbers(value!.toString()!)) > 0;
}

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export function equalsEnum(firstEnum: any, secondEnum: any) {
  return firstEnum == secondEnum;
}

export function validateEmail(email: string): boolean {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return res.test(String(email).toLowerCase());
}

export function validatePhone(phone: string): boolean {
  const phoneWithoutSigns = phone.replace(/\D/g, "");

  const phoneRegex = /^(\d{10}|\d{11})$/;

  return phoneRegex.test(phoneWithoutSigns);
}

export function validateZipCode(zipCode: string): boolean {
  const cleanZipCode = zipCode.trim();
  const regexWithHifen = /^\d{5}-\d{3}$/;
  const regexWithoutHifen = /^\d{8}$/;

  return (
    regexWithHifen.test(cleanZipCode) || regexWithoutHifen.test(cleanZipCode)
  );
}

export function formatZipCode(zipCode: string) {
  let numbers = zipCode.replace(/\D/g, "");

  numbers = numbers.substring(0, 8);

  if (numbers.length > 5) {
    return numbers.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  }

  return numbers;
}

export function onlyNumbers(val: string): string {
  return val.replace(/\D/g, "");
}

export function getToast(toastComponent: JSX.Element, message: string) {
  toastComponent.props = { message };

  return toastComponent;
}

export function validateCPF(cpf?: string): boolean {
  if (!cpf) {
    return false;
  }

  const nCpf = onlyNumbers(cpf).split("");
  const sameValueQuantity = nCpf.every((val, i, array) => val === array[0]);

  if (sameValueQuantity) {
    return false;
  } else {
    const firstRemainderDivision = checkDigit(
      nCpf,
      Number.parseInt(nCpf[9]),
      10
    );
    const secondRemainderDivision = checkDigit(
      nCpf,
      Number.parseInt(nCpf[10]),
      11
    );

    if (firstRemainderDivision && secondRemainderDivision) {
      return true;
    }

    return false;
  }
}

function checkDigit(array: Array<string>, digit: number, dec: number) {
  let acc = 0;
  const counter = dec - 1;

  for (let i = 0; i < counter; i++) {
    acc += Number.parseInt(array[i]) * dec;

    dec--;
  }
  let restoDivisao = (acc * 10) % 11;

  restoDivisao = restoDivisao == 10 ? 0 : restoDivisao;

  return restoDivisao == digit;
}

export function isValidToken(expiration: string) {
  return Number.parseInt(expiration) > new Date().getTime();
}

export function decryptStrData(encodedStr: string | undefined): string {
  if (!encodedStr) {
    return "";
  }

  const plainText = CryptoJS.AES.decrypt(encodedStr, getUtfKy(), {
    keySize: 16,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return plainText.toString(CryptoJS.enc.Utf8);
}

export function encodeQueryString(params: any) {
  const keys = Object.keys(params);

  return keys.length
    ? "?" +
        keys
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          )
          .join("&")
    : "";
}

export function findEnumByValue<T extends Record<string, string>>(
  enumeration: T,
  value: string
): T[keyof T] | undefined {
  return (Object.values(enumeration) as string[]).includes(value)
    ? (value as T[keyof T])
    : undefined;
}

export function getEnumKeyByValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined {
  return (Object.keys(enumObj) as Array<keyof T>).find(
    (key) => enumObj[key] === value
  );
}

export function getFormatedMonthDate(strDate: string) {
  const date = new Date(strDate);
  const formatedDay =
    date.getDate() > 9 ? date.getDate() : "0".concat(date.getDate().toString());

  return formatedDay
    .toString()
    .concat(" ")
    .concat(getMonthNameByMonth(date.getMonth())!);
}

export function parseDateToISO(dateStr: string): string {
  const [day, month, year] = dateStr.split("/");

  if (!day || !month || !year) {
    throw new Error("Data inválida");
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function getDateFormated(strDate: string) {
  const [year, month, day] = strDate.split("-");

  return `${day}/${month}/${year}`;
}

export function formatHHmmInput(value: string): string {
  if (!value) {
    return value;
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length <= 2) {
    return digits;
  }

  const hours = digits.slice(0, 2);
  const minutes = digits.slice(2, 4);

  return `${hours}${minutes ? ":" + minutes : ""}`;
}

export function isValidHour(value: string) {
  if (!value) {
    return false;
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length <= 3) {
    return false;
  }

  const hours = Number.parseInt(digits.slice(0, 2));
  const minutes = Number.parseInt(digits.slice(2, 4));

  return hours > -1 && hours < 24 && minutes > -1 && minutes < 60;
}

export function formatDateDDMMYYYYInput(value: string): string {
  if (value.includes("-")) {
    return getDateFormated(value);
  }

  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 4) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  } else {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4,
      8
    )}`;
  }
}

export function getFullDateFormated(strDate: string) {
  return getDateFormated(strDate).concat(" ").concat(strDate.substring(11, 20));
}

export function getDifDaysFromDates(firstDate: Date, secondDate: Date) {
  const DAY = 24 * 60 * 60 * 1000;

  var dif = secondDate.getTime() - firstDate.getTime();

  return Number.parseInt((dif / DAY).toFixed(0));
}

export function isValidateBirtday(date: string) {
  if (date.length != 10) {
    return false;
  }

  const birthdate = new Date(parseDateToISO(date));

  return birthdate < new Date();
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getMonthNameByMonth(monthNumber: number) {
  switch (monthNumber) {
    case 0:
      return "JAN";
    case 1:
      return "FEV";
    case 2:
      return "MAR";
    case 3:
      return "ABR";
    case 4:
      return "MAIO";
    case 5:
      return "JUN";
    case 6:
      return "JUL";
    case 7:
      return "AGO";
    case 8:
      return "SET";
    case 9:
      return "OUT";
    case 10:
      return "NOV";
    case 11:
      return "DEZ";
  }
}

export function getOrderStatusDescription(status: EnumOrderStatus) {
  switch (status) {
    case EnumOrderStatus.PAGO:
      return "PAGO";
    case EnumOrderStatus.AGUARD_PGTO:
      return "AGUARD. PGTO";
    case EnumOrderStatus.CANCELADO:
      return "CANCELADO";
  }
}

export function getOrderStatusColor(status: EnumOrderStatus) {
  switch (status) {
    case EnumOrderStatus.PAGO:
      return "bg-primary bg-opacity-20 text-secondary";
    case EnumOrderStatus.AGUARD_PGTO:
      return "bg-blue-500 bg-opacity-20 text-blue-600";
    case EnumOrderStatus.CANCELADO:
      return "bg-tertiary bg-opacity-20 text-tertiary";
  }
}

export function getProductColor(status: EnumProductCategory) {
  switch (status) {
    case EnumProductCategory.VERDURA:
      return "bg-primary bg-opacity-20 text-secondary";
    case EnumProductCategory.LEGUME:
      return "bg-blue-500 bg-opacity-20 text-blue-600";
    case EnumProductCategory.FRUTA:
      return "bg-tertiary bg-opacity-20 text-tertiary";
  }
}

function getUtfKy() {
  return CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_DECRYPT_KEY);
}

export function isFirstStep(step: EnumScreenStep) {
  return equalsEnum(step, EnumScreenStep.FIRST_STEP);
}

export function getToken() {
  const isValidToken = verifyAuth();

  if (isValidToken) {
    const token = localStorage.getItem("token");

    return token;
  }

  handleLogout(true);
}

export function getToastError(msg: string): UpdateOptions {
  return {
    render: msg,
    type: "error",
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
  };
}

export function getToastWarn(msg: string): UpdateOptions {
  return {
    render: msg,
    type: "warning",
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
  };
}

export function getToastSuccess(msg: string): UpdateOptions {
  return {
    render: msg,
    type: "success",
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
  };
}

export const siglasUF = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const weekDayMap = new Map<string, string>([
  ["Segunda-feira", "MONDAY"],
  ["Terça-feira", "TUESDAY"],
  ["Quarta-feira", "WEDNESDAY"],
  ["Quinta-feira", "THURSDAY"],
  ["Sexta-feira", "FRIDAY"],
  ["Sábado", "SATURDAY"],
  ["Domingo", "SUNDAY"],
]);

export function getAutocompleteInputValue(
  type: "numeric" | "email" | "password" | "text" | "tel"
) {
  switch (type) {
    case "password":
      return "current-password";
    case "email":
      return "email";
    case "tel":
      return "tel";
    default:
      return "off";
  }
}

export function getProductImage(productId: string) {
  switch (productId) {
    case "db365a91-8280-4e76-b8cd-4e83cbae9d41":
      return alface;
    case "997f7c8b-aa24-41a6-bb87-1f5cfe4ad151":
      return repolhoroxo;
    case "c56c1b1d-632d-469d-b732-095a10dc0b3c":
      return batatadoce;
    case "a3640697-a768-4b08-944e-d1fadc8b0c7a":
      return beterraba;
    case "c9ddf49d-84ea-453a-bb58-35aec318ae23":
      return banana;
    case "fb591df5-70cb-446e-a5e7-4a32cdca0436":
      return cebolinha;
    case "de3293a9-6509-4436-a8fe-28dcb3e0ff81":
      return abobrinha;
    case "de3293a9-6509-4436-a8fe-28dcb3e0ff81":
      return cenoura;
    default:
      return couve;
  }
}

export function getWeekDayByString(
  weekDay: string
): EnumWeekDaysType | undefined {
  let enumKey: EnumWeekDaysType | undefined;

  switch (weekDay) {
    case "Segunda-feira":
      enumKey = EnumWeekDaysType.MONDAY;
      break;
    case "Terça-feira":
      enumKey = EnumWeekDaysType.TUESDAY;
      break;
    case "Quarta-feira":
      enumKey = EnumWeekDaysType.WEDNESDAY;
      break;
    case "Quinta-feira":
      enumKey = EnumWeekDaysType.THURSDAY;
      break;
    case "Sexta-feira":
      enumKey = EnumWeekDaysType.FRIDAY;
      break;
    default:
      enumKey = EnumWeekDaysType.MONDAY;
      break;
  }

  return enumKey;
}

export function getTransferIntervalByString(
  weekDay: string
): EnumTransferIntervalType | undefined {
  let enumKey: EnumTransferIntervalType | undefined;

  switch (weekDay) {
    case "Diário":
      enumKey = EnumTransferIntervalType.DAILY;
      break;
    case "Semanal":
      enumKey = EnumTransferIntervalType.WEEKLY;
      break;
    case "Mensal":
      enumKey = EnumTransferIntervalType.MONTHLY;
      break;
  }

  return enumKey;
}

export function getAccountStatusDescription(
  status?: EnumAcquirerConfigStatus
): string {
  return statusMap[status ?? EnumAcquirerConfigStatus.REGISTRATION];
}

export function getAccountType(status?: EnumAccountTypeType): string {
  return accountType[status ?? EnumAccountTypeType.CHECKING];
}

export function getWeekDayDescription(weekDay?: EnumWeekDaysType): string {
  return weekDays[weekDay ?? EnumWeekDaysType.MONDAY];
}

export function getTransferIntervalDescription(
  interval?: EnumTransferIntervalType
): string {
  return transferIntervals[interval ?? EnumTransferIntervalType.DAILY];
}

const statusMap: Record<EnumAcquirerConfigStatus, string> = {
  [EnumAcquirerConfigStatus.ACTIVE]: "Ativa",
  [EnumAcquirerConfigStatus.REGISTRATION]: "Aguardando Registro",
  [EnumAcquirerConfigStatus.AFFILIATION]: "Em Afiliação",
  [EnumAcquirerConfigStatus.REFUSED]: "Recusada",
  [EnumAcquirerConfigStatus.SUSPENDED]: "Suspensa",
  [EnumAcquirerConfigStatus.BLOCKED]: "Bloqueada",
  [EnumAcquirerConfigStatus.INACTIVE]: "Inativa",
};

const accountType: Record<EnumAccountTypeType, string> = {
  [EnumAccountTypeType.CHECKING]: "Conta Corrente",
  [EnumAccountTypeType.SAVINGS]: "Conta Salário",
};

const weekDays: Record<EnumWeekDaysType, string> = {
  [EnumWeekDaysType.MONDAY]: "Segunda-feira",
  [EnumWeekDaysType.TUESDAY]: "Terça-feira",
  [EnumWeekDaysType.WEDNESDAY]: "Quarta-feira",
  [EnumWeekDaysType.THURSDAY]: "Quinta-feira",
  [EnumWeekDaysType.FRIDAY]: "Sexta-feira",
};

const transferIntervals: Record<EnumTransferIntervalType, string> = {
  [EnumTransferIntervalType.DAILY]: "Diário",
  [EnumTransferIntervalType.WEEKLY]: "Semanal",
  [EnumTransferIntervalType.MONTHLY]: "Mensal",
};
