import { ISimpleDialogProps } from "../../utils/types";
import { CloseXIcon } from "../svg/SvgIcons";

export default function SimpleDialog({ dialogTitle, children, firstBtnText, secondBtnText, handleFunction, handleClose, handleFunctionSecondBtn }: ISimpleDialogProps) {
    return (
        <div className="fixed inset-0 z-20 backdrop-blur-xs backdrop-brightness-75 flex justify-center items-center">
            <div className="w-full mx-6 h-min bg-white rounded-2.5xl shadow p-6 md:w-80">
                <span className="flex justify-between items-center pb-6">
                    <p className="font-medium text-dark-color">
                        {dialogTitle}
                    </p>
                    <button onClick={() => handleClose()}>
                        <CloseXIcon  />
                    </button>
                </span>
                {children && children}
                <button onClick={() => handleFunction()} className="w-full py-3 mb-4 rounded-full text-sm
                    bg-red-300 text-gray-900 border border-red-400 text-center font-bold">
                    {firstBtnText}
                </button>
                <button onClick={() => handleFunctionSecondBtn ? handleFunctionSecondBtn() : handleClose()} className="w-full py-3 rounded-full text-sm 
                    text-primary border border-primary text-center font-medium border-primary-color ">
                    {secondBtnText}
                </button>
            </div>
        </div>
    );
}