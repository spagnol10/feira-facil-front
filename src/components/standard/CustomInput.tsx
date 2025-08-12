import { useState } from "react";
import { IInputProps } from "../../utils/types";
import { getAutocompleteInputValue, isNullOrEmpty } from "../../utils/util";
import { ClosedEyeIcon, OpenEyeIcon } from "../svg/SvgIcons";

export default function CustomInput({ id, value, inputHeaderText, placeHolder, onChange, type = "text",
    withEyeIcon, maxLength, disabled, invalid }: IInputProps) {
    const [isOpenEye, setOpenEye] = useState(false);

    return (
        <div className="relative">
            <span className="flex flex-col">
                {!isNullOrEmpty(value) &&
                    <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-primary-gray text-xs font-medium animate-fade-up">
                        {inputHeaderText}
                    </p>
                }
                <input type="text" name="username" autoComplete="username" className="hidden" />
                <input disabled={disabled} maxLength={maxLength} type={isOpenEye ? "text" : type} id={id} value={value} onChange={onChange}
                    placeholder={placeHolder ?? inputHeaderText} autoComplete={getAutocompleteInputValue(type)} className={`w-full
                        h-14 px-4 border placeholder-dark-color rounded-md bg-white shadow-sm text-sm focus:outline-none
                        placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-transparent appearance-none 
                    ${disabled ? 'text-gray-400' : 'text-dark-color'}
                    ${invalid ? 'border-red-300' : 'border-second-light'}`}
                />
                {withEyeIcon &&
                    <button type="button" onClick={() => setOpenEye(!isOpenEye)}
                        className={`flex self-end -mt-10 m-4 animate-fade-in-fast`}>
                        {
                            isOpenEye ?
                                <OpenEyeIcon />
                                :
                                <ClosedEyeIcon />
                        }
                    </button>
                }
            </span>
        </div>
    )
}