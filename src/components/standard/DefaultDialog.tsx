import { IDefaultDialogProps } from "../../utils/types";
import { CloseXIcon } from "../svg/SvgIcons";

export default function DefaultDialog({ children, dialogTitle, renderOnlyChild, className, handleClose }: IDefaultDialogProps) {
    return (
        <div className="fixed inset-0 z-20 backdrop-blur-xs backdrop-brightness-75 flex justify-center items-center">
            {renderOnlyChild ?
                children
                :
                <div className={`w-full box-border mx-6 h-min bg-white rounded-2.5xl shadow p-6 md:w-[480px]  ${className}`}>
                    <span className="flex justify-between items-center pb-6">
                        <p className="text-secondary font-semibold">
                            {dialogTitle}
                        </p>
                        <button onClick={() => handleClose ? handleClose() : false}>
                            <CloseXIcon />
                        </button>
                    </span>
                    {children && children}
                </div>
            }
        </div>
    );
}