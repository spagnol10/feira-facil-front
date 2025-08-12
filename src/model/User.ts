import { EnumGender, EnumUserType } from "../utils/types";
import { decryptStrData } from "../utils/util";
import { Address } from "./Address";

export class User {
    id: string = "";
    name: string = "";
    email: string = "";
    active: boolean = true;
    document?: string = "";
    phone?: string = "";
    gender?: EnumGender;
    role?: EnumUserType;
    birthdate?: string = "";
    password?: string = "";
    address?: Address = new Address();

    constructor(init?: Partial<User>) {
        if (init?.address) {
            this.address = new Address(init.address);
        }

        Object.assign(this, init);
    }

    static fromEncryptedData(encryptedData: User): User {
        return new User({
            ...encryptedData,
            address: Address.fromEncryptedData(encryptedData.address ?? new Address()),
            document: decryptStrData(encryptedData.document ?? ""),
            email: decryptStrData(encryptedData.email ?? ""),
            phone: decryptStrData(encryptedData.phone ?? ""),
            name: decryptStrData(encryptedData.name ?? ""),
            password: decryptStrData(encryptedData.password ?? ""),
        });
    }
}