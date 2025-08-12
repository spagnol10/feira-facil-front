import { ITokenPhoneValidatorProps } from "../../utils/types";
import Button from "../standard/Button";

export default function TokenPhoneValidator(props: ITokenPhoneValidatorProps) {
    return (
        <div className="flex flex-col mt-8">
            <p className="text-primary-gray text-center text-sm">
                Digite o código de 6 dígitos que enviamos para
            </p>
            <p className="font-semibold text-dark-color mt-1 mb-6 text-center">
                {props.phone}
            </p>

            <form>
                <div className="flex justify-center gap-2" onPaste={props.handlePasteTokenCode}>
                    {props.tokenCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el: any) => (props.inputRefs.current[index] = el)}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => props.handleChangeTokenCode(e, index)}
                            onKeyDown={(e) => props.handleKeyDownTokenCode(e, index)}
                            className="w-12 h-14 text-center text-2xl font-bold 
                            text-dark-color border border-gray-300 rounded-md focus:outline-none
                            focus:ring-1 focus:ring-primary focus:border-transparent appearance-none"
                        />
                    ))}
                </div>

                <div className="mt-8">
                    <Button text="Verificar" onClick={props.handleValidateToken}
                        disabled={props.tokenCode.join('').length !== 6} />
                </div>
            </form>

            <button
                onClick={props.handleResendTokenCode}
                disabled={props.countdown > 0}
                className="mt-4 text-sm text-secondary-gray hover:text-dark-color disabled:text-secondary-gray transition-colors disabled:cursor-not-allowed">
                {props.countdown > 0 ? `Reenviar em ${props.countdown}s` : 'Reenviar'}
            </button>
        </div>
    )
}