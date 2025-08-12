import { IToggleProps } from "../../utils/types";
import { isNullOrEmpty } from "../../utils/util";

export default function CustomToggle({ handleChange, selected, firstText, secondText, idToggle }: IToggleProps) {
    const defaultToogle = isNullOrEmpty(firstText) && isNullOrEmpty(secondText);

    return (
        <div className={`${defaultToogle ? "w-12" : "w-full"}`}>
            <input type="checkbox" name="toggle" id={idToggle} onChange={handleChange}
                className={`bg-white outline-none focus:outline-none duration-200 ease-in 
                            block rounded-full appearance-none cursor-pointer`} />
            {defaultToogle ?
                <label htmlFor={idToggle} className={`h-7 px-1 flex items-center 
                        overflow-hidden rounded-full cursor-pointer border-2 
                        ${!selected ? "justify-start border-primary-gray" : "justify-end bg-secondary"}`}>
                    <span className={`w-3.5 h-3.5 flex justify-center items-center
                                ${!selected && "bg-primary-gray rounded-full"}`} />
                    <span className={`w-3.5 h-3.5 flex justify-center items-center
                                ${selected && "bg-white rounded-full"}`} />
                </label>
                :
                <label htmlFor={idToggle} className={`h-10 flex  overflow-hidden rounded-full w-full cursor-pointer border p-0.5
                            ${selected ? "justify-start" : "justify-end"}`}>
                    <span className={`flex w-1/2 justify-center items-center
                                ${selected && "bg-secondary rounded-full"}`}>
                        <p className={`text-sm text-primary-gray ${selected && "text-white font-bold"}`}>
                            {firstText}
                        </p>
                    </span>
                    <span className={`flex w-1/2 justify-center items-center
                                ${!selected && "bg-secondary rounded-full"}`}>
                        <p className={`text-sm text-primary-gray ${!selected && "text-white font-bold"}`}>
                            {secondText}
                        </p>
                    </span>
                </label>
            }
        </div>
    );
}