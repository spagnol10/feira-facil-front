import { IDashboardCardProps } from "../../utils/types";
import { formatMoneyWithSign } from "../../utils/util";
import { InfoIcon, TrendingDownIcon, TrendingUpIcon } from "../svg/SvgIcons";

export default function DashboardCard(props: IDashboardCardProps) {
    return (
        <div className="flex items-center p-4 bg-white rounded-xl lg:h-28 shadow-lg relative">
            <div className="absolute right-4 top-14 md:top-4 flex items-center">
                <span title="Percentual em comparação ao período anterior" className="cursor-help hidden md:flex">
                    <InfoIcon size={12} />
                </span>
                <span className="flex mr-2 text-secondary md:hidden">
                    <p className="text-xs">
                    {props.positiveTrending ? "Acima dia anterior" : "Abaixo dia anterior"}
                    </p>
                </span>
                <span className={`p-0.5 px-1.5 md:p-1 rounded-2xl ${props.positiveTrending ? "bg-green-100" : "bg-red-100"}`}>
                    <p className={`text-xs ${props.positiveTrending ? "text-green-600" : "text-red-600"}`}>
                        {props.positiveTrending ? "+" : "-"}{props.percentage}%
                    </p>
                </span>
            </div>
            <div className={`flex justify-center items-center w-10 h-10
                mr-2 rounded-xl ${props.positiveTrending ? "bg-primary" : "bg-tertiary-light"}`}>
                {props.positiveTrending ?
                    <TrendingUpIcon />
                    :
                    <TrendingDownIcon />
                }
            </div>
            <div className="mb-2 mb:mb-0">
                <p className="text-xs text-secondary">
                    {props.title}
                </p>
                <h2 className={`text-2xl font-semibold ${props.variant ? "text-tertiary" : "text-primary"}`}>
                    {formatMoneyWithSign(props.amount)}
                </h2>
            </div>
        </div>
    );
}