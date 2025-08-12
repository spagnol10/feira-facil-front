import { useState } from "react";
import { ISelectOneProps } from "../../utils/types";
import { equalsStr, isNullOrEmpty } from "../../utils/util";
import { ChevronDownIcon } from "../svg/SvgIcons";

export default function DefaultSelectOne({ inputHeaderText, placeHolder, handleSelect, optionValue, 
        options, disabled, height }: ISelectOneProps) {
    const [showDropdown, setShowDropdow] = useState(false);

    function select(val: string) {
        setShowDropdow(false);

        handleSelect(val);
    }

    return (
        <div className="relative w-full">
            <span className="w-full flex flex-col">
                {(!isNullOrEmpty(optionValue)) &&
                    <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-primary-gray text-xs font-medium animate-fade-up">
                        {inputHeaderText}
                    </p>
                }
                <button disabled={disabled} onClick={() => setShowDropdow(!showDropdown)} className="h-14 px-4 border 
                    placeholder-dark-color rounded-md bg-white border-second-light shadow-sm focus:outline-none 
                    focus:ring-1 focus:ring-primary focus:border-transparent appearance-none text-dark-color">
                    <p className={`w-[95%] text-left text-sm mr-6 truncate ${(!optionValue || disabled) ? 'text-gray-400' : 'text-dark-color'}`}>
                        {isNullOrEmpty(optionValue) ? placeHolder : optionValue}
                    </p>
                    <div className="absolute right-2 top-4 pointer-events-none">
                        <ChevronDownIcon fill="#a0a0a0" />
                    </div>
                </button>
            </span>
            {showDropdown &&
                <div className={`absolute z-10 flex flex-col w-fit right-0 rounded-md bg-gray-100 overflow-y-auto
                                    gap-1 text-gray-800 shadow-xl animate-fade-down-fast md:top-16 md:w-full ${height}`}>
                    {options.map((val, index) => (
                        <span onClick={() => select(val)} key={val.concat(index.toString())}
                        className="flex whitespace-nowrap hover:bg-primary py-2 px-4 text-sm text-secondary
                        first:rounded-t-md last:rounded-b-md hover:bg-opacity-30 items-center">
                            {val}
                            {equalsStr(optionValue, val) && <div className="h-1 w-1 bg-secondary rounded-full" />}
                        </span>
                    ))}
                </div>
            }
        </div>
    )
}