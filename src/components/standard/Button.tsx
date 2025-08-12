import { IButtonProps } from "../../utils/types";

export default function Button({ text, onClick, className, disabled, icon }: IButtonProps) {
    return (
        <button onClick={() => !disabled ? onClick() : false} className={`w-full flex gap-2
            rounded-2.5xl h-10 text-sm font-bold justify-center items-center
            ${className ?? 'bg-secondary text-white'} 
            ${disabled && 'bg-secondary-gray text-white'}`} type="button" >
            {icon && <span>{icon}</span>}
            {text}
        </button>
    )
}