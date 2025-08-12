import router from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { handleChangePassword, handlePreRegister, handleSendToken, handleValidateToken } from "../../repositories/user.repository";
import { EnumAuthScreen, EnumUserType, PreRegisterUserType } from "../../utils/types";
import { equalsEnum, equalsStr, isNullOrEmpty, onlyNumbers, validatePhone } from "../../utils/util";

export function useAuthViewModel() {
    const RESEND_SECONDS = 30;
    const { handleAuth } = useAppContext();
    const [authFormFields, setAuthFormFields] = useState({
        phone: "",
        password: "",
        emailForgot: "",
        userName: "",
        userConfirmPassword: "",
        userType: EnumUserType.SELLER,
    });
    const [authScreen, setAuthScreen] = useState(EnumAuthScreen.LOGIN);
    const [isForgotTokenSent, setForgotTokenSent] = useState(false);
    const [showForgotPasswordInputs, setShowForgotPasswordInputs] = useState(false);
    const [loading, setLoading] = useState(false);
    const isSellerType = equalsEnum(authFormFields.userType, EnumUserType.SELLER);
    const [tokenCode, setTokenCode] = useState(new Array(6).fill(''));
    const [countdown, setCountdown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [countdown]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Enter") {
                event.preventDefault();

                equalsEnum(EnumAuthScreen.LOGIN, authScreen) ? handleLogin() : handleCreateAccount();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [enableLogin(), enableCreateAccount()]);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setAuthFormFields(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    }

    function handleChangeUserType() {
        setAuthFormFields(prevState => {
            return {
                ...prevState,
                userType: equalsEnum(authFormFields.userType, EnumUserType.CUSTOMER) ? EnumUserType.SELLER : EnumUserType.CUSTOMER,
            };
        });
    }

    function handleLogin() {

        if (!enableLogin()) {
            return;
        }

        setLoading(true);

        handleAuth(authFormFields.phone, authFormFields.password)
            .then(() => router.push("/"))
            .catch(err => err);

        setLoading(false);
        cleanAllFields();
    }

    function handleSendTokenNotification(resetPasswordFlow?: boolean) {
        handleSendToken(authFormFields.phone, !!resetPasswordFlow)
            .then(() => {
                setTokenCode(new Array(6).fill(''));

                resetPasswordFlow ? setForgotTokenSent(true) : setAuthScreen(EnumAuthScreen.VERIFY_TOKEN);

                inputRefs.current[0]?.focus();
                setCountdown(RESEND_SECONDS);
            })
            .catch(err => err);
    }

    function enableLogin(): boolean {
        return authFormFields.password.length >= 6 && validatePhone(authFormFields.phone);
    }

    function enableCreateAccount(): boolean {
        return validatePhone(authFormFields.phone) &&
            !isNullOrEmpty(authFormFields.userName) &&
            authFormFields.password.length >= 6 &&
            equalsStr(authFormFields.password, authFormFields.userConfirmPassword)
    }

    function enableChangePassword(): boolean {
        return authFormFields.password.length >= 6 &&
            equalsStr(authFormFields.password, authFormFields.userConfirmPassword)
    }

    function handleStartCreateUser() {
        cleanAllFields();

        setAuthScreen(EnumAuthScreen.SEND_VALIDATION_TOKEN);
    }

    function handleCreateAccount() {

        if (!enableCreateAccount()) {
            return;
        }

        setLoading(true);

        const newUser: PreRegisterUserType = {
            name: authFormFields.userName,
            phone: onlyNumbers(authFormFields.phone),
            password: authFormFields.password,
            role: authFormFields.userType,
        };

        handlePreRegister(newUser)
            .then(() => cleanAllFields())
            .catch(err => err)
            .finally(() => setLoading(false));
    }

    function handleChangePass() {

        if (!enableChangePassword()) {
            return;
        }

        setLoading(true);

        const code = tokenCode.join('');

        handleChangePassword(authFormFields.phone, authFormFields.password, code)
            .then(() => cleanAllFields())
            .catch(err => err)
            .finally(() => setLoading(false));
    }

    function cleanAllFields() {
        setAuthFormFields({
            phone: "",
            password: "",
            emailForgot: "",
            userName: "",
            userConfirmPassword: "",
            userType: EnumUserType.SELLER,
        });
        setForgotTokenSent(false);
        setShowForgotPasswordInputs(false);

        setTokenCode(new Array(6).fill(''));

        setAuthScreen(EnumAuthScreen.LOGIN);
    }

    function goBackLogin() {
        cleanAllFields();

        setAuthScreen(EnumAuthScreen.LOGIN);
    }

    function handleChangeTokenCode(e: any, index: number) {
        const value = e.target.value;

        if (!/^[0-9]$/.test(value) && value !== '') {
            return;
        }

        const newCode = [...tokenCode];
        newCode[index] = value;
        setTokenCode(newCode);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    function handleKeyDownTokenCode(event: any, index: number) {
        if (event.key === 'Backspace' && tokenCode[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    function handlePasteTokenCode(event: any) {
        event.preventDefault();

        const pastedData = event.clipboardData.getData('text').slice(0, 6);
        const isValidNumberPaste = /^[0-9]+$/.test(pastedData);

        if (isValidNumberPaste) {
            const newCode = pastedData.split('').concat(new Array(6 - pastedData.length).fill(''));
            setTokenCode(newCode);

            const focusIndex = Math.min(pastedData.length, 5);
            inputRefs.current[focusIndex]?.focus();
        }
    };

    function handleResendTokenCode() {
        if (countdown === 0) {
            handleSendToken(authFormFields.phone, isForgotTokenSent)
                .then(() => {
                    setTokenCode(new Array(6).fill(''));
                    inputRefs.current[0]?.focus();

                    setCountdown(RESEND_SECONDS);
                })
                .catch(console.error);
        }
    };

    function validateToken() {
        const finalCode = tokenCode.join('');

        if (finalCode.length === 6) {
            handleValidateToken(finalCode)
                .then(() => {
                    isForgotTokenSent ?
                        setShowForgotPasswordInputs(true) : setAuthScreen(EnumAuthScreen.CREATE_USER);
                })
                .catch(console.error);
        }
    }

    return {
        loading,
        tokenCode,
        countdown,
        inputRefs,
        authScreen,
        isSellerType,
        authFormFields,
        isForgotTokenSent,
        showForgotPasswordInputs,
        enableLogin,
        handleLogin,
        goBackLogin,
        handleChange,
        setAuthScreen,
        validateToken,
        handleChangePass,
        handleCreateAccount,
        enableCreateAccount,
        enableChangePassword,
        handlePasteTokenCode,
        handleChangeUserType,
        handleStartCreateUser,
        handleChangeTokenCode,
        handleResendTokenCode,
        handleKeyDownTokenCode,
        handleSendTokenNotification,
    };
}