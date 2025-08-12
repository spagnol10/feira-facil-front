import router from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Address } from "../../model/Address";
import { User } from "../../model/User";
import { completeRegister, getUserData, updateUserData } from "../../repositories/user.repository";
import { EnumGender, EnumLoadingTextType, EnumScreen, UpdateUserType } from "../../utils/types";
import * as utils from "../../utils/util";
import useMiddleware from "../middleware";

export default function useProfileViewModel() {
    const defaultUserData = new User({ address: new Address({ state: undefined }) });
    const { user, handleUpdateDocument } = useAppContext();
    const { isAuth, verifyUserAuth } = useMiddleware(EnumScreen.PROFILE);
    const [isClient, setIsClient] = useState(false);
    const [currentUserData, setCurrentUserData] = useState<User>(defaultUserData);
    const [userData, setUserData] = useState<User>(defaultUserData);
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const isCompleteRegister = user?.document == undefined;
    const [loadingText, setLoadingText] = useState<EnumLoadingTextType | undefined>(EnumLoadingTextType.DEFAULT_LOADING_TEXT);

    useEffect(() => {
        setIsClient(true);

        (async () => verifyUserAuth())();
    }, []);

    useEffect(() => {
        if (!loadingText) {
            setLoadingText(EnumLoadingTextType.DEFAULT_LOADING_TEXT);
        }

        if (isCompleteRegister) {
            setUserData(setAuthData);
            setCurrentUserData(setAuthData);

            setLoadingText(undefined);
            
            return;
        }

        const token = utils.getToken();

        if (token) {
            getUserData(token)
                .then(res => {
                    var userData = User.fromEncryptedData(res);

                    userData.birthdate = utils.getDateFormated(userData.birthdate ?? "");

                    setUserData(userData);
                    setCurrentUserData(userData);
                })
                .finally(() => setLoadingText(undefined));
        }
    }, [user]);

    function setAuthData(prevState: any) {
        return {
            ...prevState,
            name: utils.decryptStrData(user?.name),
            phone: utils.decryptStrData(user?.phone),
            password: utils.decryptStrData(user?.password)
        }
    }

    function handleUpdateUserData() {

        if (!isValidUpdate()) {
            return;
        }

        const payload = mountUpdateUserPayload();
        const token = utils.getToken();

        if (token) {

            if (isCompleteRegister) {
                completeRegister(payload, token)
                    .then(() => {
                        handleUpdateDocument(userData?.document!);

                        setCurrentUserData({ ...userData! });

                        router.push("/company");
                    })
                    .catch(err => console.error(err));

                return;
            }

            updateUserData(payload, token)
                .then(() => setCurrentUserData({ ...userData! }))
                .catch(err => console.error(err));
        }

    }

    function mountUpdateUserPayload(): UpdateUserType {
        const updateUserData: UpdateUserType = {};

        if (isCompleteRegister) {
            updateUserData.document = utils.onlyNumbers(userData?.document!);
            updateUserData.birthdate = utils.parseDateToISO(userData?.birthdate!);
        }

        if (!utils.equalsStr(userData!.phone!, currentUserData!.phone!)) {
            updateUserData.phone = utils.onlyNumbers(userData?.phone!);
        }

        if (!utils.equalsEnum(userData!.gender!, currentUserData!.gender!)) {
            updateUserData.gender = userData?.gender!;
        }

        if (!utils.equalsStr(userData!.email!, currentUserData!.email!)) {
            updateUserData.email = userData?.email!;
        }

        if (!utils.equalsStr(userData!.name!, currentUserData!.name!)) {
            updateUserData.name = userData?.name!;
        }

        if (isPasswordChanged() && isConfirmationPasswordCorrect()) {
            updateUserData.password = userData?.password;
        }

        updateUserData.address = mountAddresPayload();

        return updateUserData;
    }

    function mountAddresPayload(): Address {
        const address: any = {};

        if (isCompleteRegister ||
            !utils.equalsStr(userData!.address!.zipCode, currentUserData!.address!.zipCode)) {
            address!.zipCode = userData!.address!.zipCode;
        }

        if (!utils.equalsStr(userData!.address!.state!, currentUserData!.address!.state!)) {
            address!.state = userData!.address!.state;
        }

        if (!utils.equalsStr(userData!.address!.city, currentUserData!.address!.city)) {
            address!.city = userData!.address!.city;
        }

        if (!utils.equalsStr(userData!.address!.street, currentUserData!.address!.street)) {
            address!.street = userData!.address!.street;
        }

        if (!utils.equalsStr(userData!.address!.neighborhood, currentUserData!.address!.neighborhood)) {
            address!.neighborhood = userData!.address!.neighborhood;
        }

        if ((!utils.isNullOrEmpty(userData!.address?.number)
            && utils.isNullOrEmpty(currentUserData!.address?.number)) ||
            !utils.equalsStr(userData!.address!.number!, currentUserData!.address!.number!)) {
            address!.number = userData!.address!.number;
        }

        if ((!utils.isNullOrEmpty(userData!.address?.complement)
            && utils.isNullOrEmpty(currentUserData!.address?.complement)) ||
            !utils.equalsStr(userData!.address!.complement!, currentUserData!.address!.complement!)) {
            address!.complement = userData!.address!.complement;
        }

        return address;
    }

    function isValidUpdate(): boolean {
        return utils.isValidObjectRequiredFields(userData, ["id", "password", "role"])
            && userData!.name.length > 2
            && utils.validateEmail(userData?.email ?? "")
            && utils.validateCPF(userData?.document ?? "")
            && utils.validatePhone(userData?.phone ?? "")
            && (!isPasswordChanged() || (isPasswordChanged() && userData!.password!.length > 5 && isConfirmationPasswordCorrect()))
            && userData?.birthdate!.length == 10
            && utils.isValidObjectRequiredFields(userData.address, ["number", "complement"])
            && !utils.deepEqual(userData, currentUserData);
    }

    function handleUpdateGender(selectedGender: string) {
        const genderValue = utils.equalsStr(selectedGender, "Feminino") ? EnumGender.FEMALE : EnumGender.MALE;

        setUserData((prevState: any) => {
            return {
                ...prevState,
                gender: genderValue
            }
        })
    }

    function parseGenderStrToEnum() {
        return utils.equalsEnum(userData?.gender, EnumGender.MALE) ? "Masculino" : "Feminino"
    }

    function isPasswordChanged(): boolean {
        return !utils.equalsStr(currentUserData?.password ?? "", userData?.password ?? "");
    }

    function isConfirmationPasswordCorrect(): boolean {
        return utils.equalsStr(userData?.password ?? "", confirmPassword ?? "");
    }

    return {
        isAuth,
        isClient,
        userData,
        loadingText,
        confirmPassword,
        isCompleteRegister,
        setUserData,
        isValidUpdate,
        isPasswordChanged,
        setConfirmPassword,
        handleUpdateGender,
        parseGenderStrToEnum,
        handleUpdateUserData
    }
}