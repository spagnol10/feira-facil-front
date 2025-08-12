import { ITextAreaProps } from "../../utils/types";
import { isNullOrEmpty } from "../../utils/util";

export default function CustomTextArea({ id, value, placeHolder, rows, onChange }: ITextAreaProps) {
    return (
        <div className="relative">
            <span className="flex flex-col">
                {!isNullOrEmpty(value) &&
                    <p className="absolute bg-white -mt-1.5 ml-3 px-2 text-primary-gray text-xs font-medium animate-fade-up">
                        {placeHolder}
                    </p>
                }
                <textarea id={id} value={value} onChange={onChange} rows={rows}
                    placeholder={placeHolder} className={`w-full pt-4 px-4 border placeholder-dark-color 
                    rounded-md bg-white border-second-light shadow-sm text-sm focus:outline-none
                    focus:ring-1 focus:ring-primary focus:border-transparent appearance-none`}
                />
            </span>
        </div>
    )
}