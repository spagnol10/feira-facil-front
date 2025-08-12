import { ILoadingProps } from "../../utils/types";
import { LoadingIcon } from "../svg/SvgIcons";

export default function Loading({ loadingText }: ILoadingProps) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
                <LoadingIcon width={40} size={40} fill="#3FBB97" />
                <p className="mt-3 md:text-lg text-primary text-center">
                    {loadingText ?? "Carregando..."}
                </p>
            </div>
        </div>
    );
}