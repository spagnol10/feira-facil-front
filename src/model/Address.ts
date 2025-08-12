import { decryptStrData } from "../utils/util";

export class Address {
    id?: string
    street: string = "";
    city: string = "";
    zipCode: string = "";
    neighborhood: string = "";
    number?: string;
    complement?: string;
    state?: string;

    constructor(init?: Partial<Address>) {
        Object.assign(this, init);
    }

    static fromExternalData(externalData: any): Address {
        return new Address({
            street: externalData.address_name,
            city: externalData.city,
            zipCode: externalData.cep,
            neighborhood: externalData.district,
            state: externalData.state
        });
    }

    static fromEncryptedData(encryptedData: Address): Address {
        return new Address({
            id: encryptedData?.id,
            city: decryptStrData(encryptedData?.city ?? ""),
            state: decryptStrData(encryptedData?.state ?? ""),
            zipCode: decryptStrData(encryptedData?.zipCode ?? ""),
            number: decryptStrData(encryptedData?.number ?? ""),
            complement: decryptStrData(encryptedData?.complement ?? ""),
            street: decryptStrData(encryptedData?.street ?? ""),
            neighborhood: decryptStrData(encryptedData?.neighborhood ?? "")
        });
    }
}