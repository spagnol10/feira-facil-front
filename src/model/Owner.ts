import { EnumGender } from "../utils/types";
import { decryptStrData } from "../utils/util";
import { Address } from "./Address";
import { User } from "./User";

export class Owner {
    name: string = "";
    email: string = "";
    document?: string = "";
    phone?: string = "";
    gender?: EnumGender;
    birthdate?: string = "";
    monthlyIncome: number = 0;
    occupation?: string = "";
    address?: Address = new Address();

    constructor(init?: Partial<Owner>) {
        Object.assign(this, init);
    }

    static fromUser(userData: User): Owner {
        return new Owner({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            document: userData.document,
            birthdate: userData.birthdate,
            gender: userData.gender,
            address: userData.address
        });
    }

    static fromEncryptedData(encryptedData: Owner): Owner {
        return new Owner({
            ...encryptedData,
            address: Address.fromEncryptedData(encryptedData.address ?? new Address()),
            document: decryptStrData(encryptedData.document ?? ""),
            email: decryptStrData(encryptedData.email ?? ""),
            phone: decryptStrData(encryptedData.phone ?? ""),
            name: decryptStrData(encryptedData.name ?? "")
        });
    }

}