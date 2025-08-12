import { AnticipationConfigType, BankAccountType, EnumAccountTypeType, EnumAcquirerConfigStatus, EnumTransferIntervalType, EnumWeekDaysType, TransferConfigType } from "../utils/types";

export class AcquirerConfig {
    acquirerId?: string;
    status?: EnumAcquirerConfigStatus;
    transferConfig?: TransferConfigType;
    anticipationConfig?: AnticipationConfigType;
    bankAccount?: BankAccountType;

    constructor(init?: Partial<AcquirerConfig>) {
        Object.assign(this, init);
    }

    static defaultWithDocumentBank(document: string, bank: string) {
        return new AcquirerConfig({
            bankAccount: { holderDocument: document, bank: bank, type: EnumAccountTypeType.CHECKING } as BankAccountType,
            transferConfig: {
                enabled: true,
                transferInterval: EnumTransferIntervalType.WEEKLY,
                transferDay: EnumWeekDaysType.MONDAY
            },
            anticipationConfig: {
                enabled: false
            }
        });
    }

}