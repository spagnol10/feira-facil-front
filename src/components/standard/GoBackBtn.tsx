
import { IGoBackBtnProps } from "../../utils/types";
import { ChevronLeftIcon } from "../svg/SvgIcons";

export default function GoBackBtn({ text, onClick, renderText, disabled }: IGoBackBtnProps) {
    return (
        <button className="w-min flex max-h-5 flex-row items-center" onClick={(event) => disabled ? false : onClick(event)}>
            <span className="-ml-2">
                <ChevronLeftIcon fill={disabled ? "#A8A3AD" : "#3FBB97"} />
            </span>
            {renderText &&
                <p className={`text-sm font-bold ${disabled ? 'text-secondary-gray' : 'text-secondary'}`}>
                    {text}
                </p>
            }
        </button>
    )
}
