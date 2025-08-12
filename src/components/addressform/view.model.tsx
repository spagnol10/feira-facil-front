import { SetStateAction, useEffect, useState } from "react";
import { Address } from "../../model/Address";
import { fecthExternalAddresByZipCode, fecthExternalCitiesByState } from "../../repositories/external.repository";
import { handleChange, isNullOrEmpty } from "../../utils/util";

export function useAddressViewModel(address: Address | undefined, setObject: SetStateAction<any>, isParentSetObject?: boolean) {
    const [citiesByUf, setCitiesByUf] = useState<string[]>([]);

    useEffect(() => {
        if (address?.state) {
            fecthExternalCitiesByState(address.state)
                .then(res => setCitiesByUf(res.map(item => item.nome).sort()))
                .catch(console.error);
        }
    }, [address?.state]);

    useEffect(() => {
        if (address?.zipCode && address?.zipCode.length == 9) {
            fecthExternalAddresByZipCode(address.zipCode.replace("-", ""))
                .then(res => {
                    if (res instanceof Address && res.zipCode) {
                        if (isParentSetObject) {
                            setObject((prev: any) => {
                                return {
                                    ...prev,
                                    address: res
                                }
                            });

                            return;
                        }

                        setObject(res);
                    }
                })
                .catch(console.error);
        }
    }, [address?.zipCode]);

    function handleSelectUF(selectedState: string) {
        const fieldName = isParentSetObject ? "address.state" : "state";

        handleChange({
            target: {
                id: fieldName, value: selectedState, getAttribute: (attr: string) => {
                    if (attr === "type") return "text";
                    return null;
                }
            }
        } as any, setObject)
    }

    function handleSelectCity(selectedCity: string) {
        const fieldName = isParentSetObject ? "address.city" : "city";

        handleChange({
            target: {
                id: fieldName, value: selectedCity, getAttribute: (attr: string) => {
                    if (attr === "type") return "text";
                    return null;
                }
            }
        } as any, setObject)
    }

    return {
        citiesByUf,
        handleSelectUF,
        handleSelectCity
    }
}