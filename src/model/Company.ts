import { PlanDTO } from "../utils/types";
import { capitalizeWordsIgnoreValues, decryptStrData } from "../utils/util";
import { Address } from "./Address";
import { Fair } from "./Fair";
import { Owner } from "./Owner";

export class Company {
    id?: string;
    companyName: string = "";
    tradingName: string = "";
    phone: string = "";
    email: string = "";
    annualRevenue: number = 0;
    document: string = "";
    owner: Owner = new Owner();
    address: Address = new Address();
    fairs?: Array<Fair>;
    fairsId?: Array<String> = [];
    organization: boolean = true;
    hasAcquirerConfig: boolean = false;
    plan?: PlanDTO;

    constructor(init?: Partial<Company>) {

        if (init?.owner) {
            this.owner = new Owner(init.owner);
        }

        if (init?.address) {
            this.address = new Address(init.address);
        }

        Object.assign(this, init);
    }

    static fromEncryptedData(encryptedData: Company): Company {
        return new Company({
            ...encryptedData,
            owner: Owner.fromEncryptedData(encryptedData.owner ?? new Owner()),
            address: Address.fromEncryptedData(encryptedData.address ?? new Address()),
            companyName: decryptStrData(encryptedData.companyName ?? ""),
            tradingName: decryptStrData(encryptedData.tradingName ?? ""),
            document: decryptStrData(encryptedData.document ?? ""),
            email: decryptStrData(encryptedData.email ?? ""),
            phone: decryptStrData(encryptedData.phone ?? "")
        });
    }

    static fromExternalData(externalData: any): Company {
        return new Company(
            {
                email: externalData.email,
                companyName: externalData.razao_social,
                tradingName: externalData.nome_fantasia,
                document: externalData.cnpj,
                phone: externalData.phone,
                annualRevenue: 0,
                organization: true,
                address: {
                    zipCode: externalData.endereco?.cep,
                    state: externalData.endereco?.uf,
                    city: capitalizeWordsIgnoreValues(externalData.endereco?.municipio),
                    neighborhood: externalData.endereco?.bairro,
                    street: externalData.endereco?.logradouro,
                    complement: externalData.endereco?.complemento,
                    number: externalData.endereco?.numero,
                }
            }
        );
    }

}