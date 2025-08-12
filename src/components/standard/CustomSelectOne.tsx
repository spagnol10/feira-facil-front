import { useState } from "react";
import { ISelectOneProps } from "../../utils/types";
import { equalsStr, isNullOrEmpty } from "../../utils/util";
import { ChevronDownIcon } from "../svg/SvgIcons";

export default function CustomSelectOne({ handleSelect, optionValue, options, inputHeaderText: placeHolder,
    icon, height = "max-h-80", width = "w-fit" }: ISelectOneProps) {
    const [showDropdown, setShowDropdow] = useState(false);
    const isDefaultValue = equalsStr(optionValue, "Selecione");
    const isOptionsEmpty = options.length == 0;

    function showSelectOne() {
        return (
            <>
                <button onClick={() => setShowDropdow(!showDropdown)}
                    className={`${width} h-10 px-4 border rounded-xl
                    border-secondary shadow-sm focus:outline-none focus:ring-1
                    focus:ring-primary focus:border-transparent appearance-none pr-8`}>
                    <p className={`whitespace-nowrap text-left text-sm ${isDefaultValue ? 'text-gray-400' : 'text-secondary'}`}>
                        {isOptionsEmpty ? "Carregando" : optionValue ?? ""}
                    </p>
                </button>
                <button className="absolute right-2 pointer-events-none">
                    <ChevronDownIcon fill="#245F40" />
                </button>
            </>
        )
    }

    function select(val: string) {
        setShowDropdow(false);

        handleSelect(val);
    }

    return (
        <div className="w-full relative">
            {!isNullOrEmpty(placeHolder) &&
                <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-secondary text-xs font-medium animate-fade-up">
                    {placeHolder}
                </p>
            }
            <div className="cursor-pointer">
                {icon ?
                    <>
                        <div className="flex items-center justify-between bg-white md:hidden">
                            <a className="menu-hover text-base font-medium text-black lg:mx-4"
                                onClick={() => setShowDropdow(!showDropdown)}>
                                {icon}
                            </a>
                        </div>
                        <div className="hidden items-center justify-between bg-white md:flex">
                            {showSelectOne()}
                        </div>
                    </>
                    :
                    <div className="flex items-center justify-between bg-white">
                        {showSelectOne()}
                    </div>
                }
                {showDropdown &&
                    <div className={`absolute ${height} overflow-y-auto z-10 flex flex-col w-fit right-0 rounded-2xl top-8 bg-gray-100 
                        gap-1 text-gray-800 shadow-xl animate-fade-down-fast md:top-12 md:w-fit overflow-x-hidden`}>
                        {options && options.length > 0 ?
                            options.map((val, index) => (
                                <span onClick={() => select(val)} key={val.concat(index.toString())}
                                    className={`flex whitespace-nowrap hover:bg-primary py-2 px-4 text-sm text-secondary
                                    first:rounded-t-2xl last:rounded-b-2xl hover:bg-opacity-30 
                                    ${equalsStr(optionValue, val) && 'bg-primary bg-opacity-70 font-bold'}`}>
                                    {val}
                                    {equalsStr(optionValue, val) && <div className="h-1 w-1 bg-secondary rounded-full" />}
                                </span>
                            ))
                            :
                            <span className="flex whitespace-nowrap hover:bg-primary py-2 px-4 text-sm text-secondary
                                    first:rounded-t-2xl last:rounded-b-2xl hover:bg-opacity-30">
                                Carregando...
                            </span>
                        }
                    </div>
                }
            </div>
        </div>
    );
}