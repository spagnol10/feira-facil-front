import { IAddressFormProps } from "../../utils/types";
import { formatZipCode, handleChange, isValidString, siglasUF, validateZipCode } from "../../utils/util";
import CustomInput from "../standard/CustomInput";
import DefaultSelectOne from "../standard/DefaultSelectOne";
import { useAddressViewModel } from "./view.model";

export default function AddressForm({ address, setObject, showMessage, isParentSetObject }: IAddressFormProps) {
    const viewModel = useAddressViewModel(address, setObject, isParentSetObject);

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-6 md:flex-row">
                <div className="flex w-full gap-6">
                    <span className="w-full">
                        <CustomInput id="address.zipCode" value={formatZipCode(address?.zipCode ?? "")}
                            placeHolder="Insira seu CEP" maxLength={9} inputHeaderText="CEP"
                            onChange={e => handleChange(e, setObject)}
                            invalid={address?.zipCode ? !validateZipCode(address.zipCode) : false} />
                    </span>
                    <span className="w-full md:w-60">
                        <DefaultSelectOne handleSelect={viewModel.handleSelectUF} height="max-h-64"
                            inputHeaderText="UF" placeHolder="Selecione"
                            options={siglasUF} optionValue={address?.state ?? ""} />
                    </span>
                </div>
                <span className="w-full md:w-1/2">
                    <DefaultSelectOne handleSelect={viewModel.handleSelectCity} height="max-h-64"
                        inputHeaderText="Cidade" placeHolder={viewModel.citiesByUf.length ? "Selecione" : "Selecione UF"}
                        options={viewModel.citiesByUf} optionValue={address?.city ?? ""} />
                </span>
                <span className="w-full">
                    <CustomInput id="address.neighborhood"
                        value={address?.neighborhood ?? ""} placeHolder="Insira seu bairro"
                        invalid={address?.neighborhood ? !isValidString(address?.neighborhood) : false}
                        inputHeaderText="Bairro" onChange={e => handleChange(e, setObject)} />
                </span>
            </div>
            <div className="w-full flex gap-6 flex-col md:flex-row">
                <span className="w-full">
                    <CustomInput id="address.street" value={address?.street ?? ""} placeHolder="Insira sua rua"
                        invalid={address?.street ? !isValidString(address?.street) : false}
                        inputHeaderText="Rua" onChange={e => handleChange(e, setObject)} />
                </span>
                <div className="w-full flex gap-6">
                    <span className="w-full">
                        <CustomInput id="address.number" value={address?.number ?? ""}
                            invalid={address?.number ? !isValidString(address?.number) : false}
                            inputHeaderText="Número" placeHolder="Número(Opcional)" onChange={e => handleChange(e, setObject)} />
                    </span>
                    <span className="w-full">
                        <CustomInput id="address.complement" value={address?.complement ?? ""}
                            invalid={address?.complement ? !isValidString(address?.complement) : false}
                            inputHeaderText="Complemento" placeHolder="Complemento(Opcional)" onChange={e => handleChange(e, setObject)} />
                    </span>
                </div>
            </div>
            {showMessage &&
                <p className="text-sm">
                    Apenas <span className="font-semibold">número</span> e
                    <span className="font-semibold"> complemento</span> são opcionais.
                </p>
            }
        </div>
    );
}