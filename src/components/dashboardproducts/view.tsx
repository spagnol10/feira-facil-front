import Image from "next/image";
import { useEffect, useState } from "react";
import alface from "../../assets/vegetables/alface.png";
import batatadoce from "../../assets/vegetables/batata_doce.png";
import cenoura from "../../assets/vegetables/cenoura.png";
import couve from "../../assets/vegetables/couve.png";
import repolhoroxo from "../../assets/vegetables/repolho_roxo.png";
import { formatMoneyWithSign } from "../../utils/util";
import CustomSelectOne from "../standard/CustomSelectOne";
import { ArrowRightIcon, CalendarIcon } from "../svg/SvgIcons";
import useDashboarProductViewModel from "./view.model";

export default function DashboardBestProducts() {
    const viewModel = useDashboarProductViewModel();
    //https://nextjs.org/docs/messages/react-hydration-error
    const [isClient, setIsClient] = useState(false);//solve

    useEffect(() => {
        setIsClient(true);
    }, []);

    function getProductImage(productId: number) {
        switch (productId) {
            case 2:
                return alface;
            case 1:
                return repolhoroxo;
            case 3:
                return batatadoce;
            case 4:
                return cenoura;
            case 5:
                return couve;
        }
    }

    return (
        isClient &&
        <>
            <div className="bg-white p-6 w-full rounded-2xl shadow-lg">
                <div className="w-full h-full">
                    <div className="flex justify-between items-center h-8 md:h-10">
                        <h2 className="font-semibold text-2xl text-secondary">
                            Mais vendidos
                        </h2>
                        <div className="mt-4 md:mt-0 md:w-36">
                            <CustomSelectOne
                                icon={<CalendarIcon />}
                                inputHeaderText=""
                                optionValue={viewModel.selectedPeriod}
                                options={["Hoje", "Últ. 7 dias", "Últ. 15 dias", "Últ. mês"]}
                                handleSelect={viewModel.setSelectedPeriod} />
                        </div>
                    </div>
                    <table className="w-full mt-8 hidden md:block">
                        <thead className="w-full">
                            <th className="w-12" />
                            <th className="text-secondary text-xs font-normal">
                                Nome
                            </th>
                            <th className="text-secondary text-xs font-normal">
                                Qtd vendas
                            </th>
                            <th className="text-secondary text-xs font-normal">
                                Valor unitário
                            </th>
                            <th className="text-secondary text-xs font-normal">
                                Total
                            </th>
                            <th className="text-secondary text-xs font-normal">
                                Em estoque
                            </th>
                            <th className="text-center text-secondary text-xs font-normal">
                                Ficha
                            </th>
                        </thead>
                        <tbody>
                            {viewModel.bestProducts.map(item => (
                                <tr className="h-16" key={item.id}>
                                    <td className="w-[10%]">
                                        <Image src={getProductImage(item.id)!} alt="Alface" width={48} height={40} />
                                    </td>
                                    <td className="w-[20%] text-secondary text-sm">
                                        {item.nome}
                                    </td>
                                    <td className="w-[15%] text-center text-secondary text-sm">
                                        {item.qtdVendas}
                                    </td>
                                    <td className="w-[18%] text-center text-secondary text-sm">
                                        {formatMoneyWithSign(item.valorUnitario)}
                                    </td>
                                    <td className="w-[18%] text-center text-secondary text-sm">
                                        {formatMoneyWithSign(item.total)}
                                    </td>
                                    <td className="w-[18%] text-center text-secondary text-sm">
                                        {item.emEstoque}
                                    </td >
                                    <td className="w-[20%] whitespace-nowrap text-center text-primary underline text-sm hidden lg:block lg:mt-5"
                                        onClick={() => console.log("Abrir ficha produto " + item.id)}>
                                        Ver produto
                                    </td>
                                    <td className="w-[15%] lg:hidden" onClick={() => console.log("Abrir ficha produto " + item.id)}>
                                        <span className="w-full flex justify-center">
                                            <ArrowRightIcon fill="#3fbb97" />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full md:hidden">
                {viewModel.bestProducts.map(item => (
                    <div className="flex mt-8 flex-col p-6 bg-white rounded-2xl shadow-lg first:mt-4">
                        <div className="flex w-full justify-between">
                            <span className="flex">
                                <span className="w-20">
                                    <Image src={getProductImage(item.id)!} alt={item.nome} width={58} height={40} />
                                </span>
                                <span className="flex flex-col gap-4">
                                    <p className="text-base text-secondary">
                                        Nome
                                    </p>
                                    <p className="text-sm text-secondary">
                                        {item.nome}
                                    </p>
                                </span>
                            </span>
                            <span className="flex flex-col gap-4 items-center">
                                <p className="text-base text-secondary">
                                    Qtd vendas
                                </p>
                                <p className="text-sm text-secondary">
                                    {item.qtdVendas}
                                </p>
                            </span>
                        </div>
                        <div className="flex w-full justify-between mt-6">
                            <span className="flex flex-col gap-4 items-center">
                                <p className="text-base text-secondary">
                                    Vlr unitário
                                </p>
                                <p className="text-sm text-secondary">
                                    {formatMoneyWithSign(item.valorUnitario)}
                                </p>
                            </span>
                            <span className="flex flex-col gap-4 items-center">
                                <p className="text-base text-secondary">
                                    Total
                                </p>
                                <p className="text-sm text-secondary">
                                    {formatMoneyWithSign(item.total)}
                                </p>
                            </span>
                            <span className="flex flex-col gap-4 items-center">
                                <p className="text-base text-secondary">
                                    Em estoque
                                </p>
                                <p className="text-sm text-secondary">
                                    {item.emEstoque}
                                </p>
                            </span>
                            <span className="flex flex-col gap-4 items-center">
                                <p className="text-base text-secondary">
                                    Ficha
                                </p>
                                <span>
                                    <ArrowRightIcon fill="#3fbb97" />
                                </span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}