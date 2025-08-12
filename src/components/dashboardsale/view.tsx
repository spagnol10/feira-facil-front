import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomSelectOne from "../standard/CustomSelectOne";
import { CalendarIcon } from "../svg/SvgIcons";
import useDashboarSaleViewModel from "./view.model";

export default function DashboardSale() {
    const viewModel = useDashboarSaleViewModel();

    return (
        <div className="bg-white p-6 w-full h-2/5 rounded-2xl shadow-lg mb-8 ">
            <div className="w-full h-full">
                <div className="flex justify-between items-center h-8 md:h-10">
                    <h2 className="font-semibold text-2xl text-secondary">
                        Vendas
                    </h2>
                    <div className="flex gap-4 md:gap-12">
                        <span className="flex gap-2 items-center text-sm md:gap-4 md:text-base">
                            <div className="h-3 w-3 bg-secondary rounded-full" />
                            <legend>
                                Total
                            </legend>
                        </span>
                        <span className="flex gap-2 items-center text-sm md:gap-4 md:text-base">
                            <div className="h-3 w-3 bg-primary rounded-full" />
                            <legend>
                                Líquido
                            </legend>
                        </span>
                        <div className="mt-4 md:mt-0 md:w-36">
                            <CustomSelectOne
                                icon={<CalendarIcon />}
                                inputHeaderText=""
                                optionValue={viewModel.selectedPeriod}
                                options={["Últ. 8 meses", "Últ. ano"]}
                                handleSelect={viewModel.setSelectedPeriod} />
                        </div>
                    </div>
                </div>
                <ResponsiveContainer height="100%" className="py-6 text-xs">
                    <BarChart
                        data={viewModel.sales}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        barGap={8}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip cursor={false} />
                        <Bar barSize={14} radius={[14, 14, 0, 0]} dataKey="total" fill="#245F40" activeBar={
                            <Rectangle fill="#f7784d83" stroke="#832607" />
                        } />
                        <Bar barSize={14} radius={[14, 14, 0, 0]} dataKey="liquido" fill="#3FBB97" activeBar={
                            <Rectangle fill="#26995f67" stroke="#055f32" />
                        } />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}