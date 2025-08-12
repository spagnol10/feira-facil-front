import { useEffect, useState } from "react";
import CustomSelectOne from "../../components/standard/CustomSelectOne";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import Header from "../../components/standard/Header";
import TablePaginator from "../../components/standard/TablePaginator";
import {
  ArrowRightIcon,
  CalendarIcon,
  ExportDataIcon,
  FilterIcon,
} from "../../components/svg/SvgIcons";
import { EnumOrderStatus, EnumScreen } from "../../utils/types";
import {
  formatMoneyWithSign,
  getOrderStatusColor,
  getOrderStatusDescription,
} from "../../utils/util";
import useMiddleware from "../../viewmodel/middleware";

export default function SaleView() {
  const { isAuth, verifyUserAuth } = useMiddleware();
  const [isClient, setIsClient] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Hoje");

  useEffect(() => {
    setIsClient(true);

    (async () => verifyUserAuth())();
  }, []);

  const sales = [
    {
      id: "2343",
      cliente: "José da silva",
      itens: "Alface, Cebola, Laranja, Limão",
      qtd_itens: 4,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "17/01/25 14:40",
      total: 209.7,
      status: EnumOrderStatus.PAGO,
    },
    {
      id: "2342",
      cliente: "Roberto Candido",
      itens: "Laranja, Limão",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "17/01/25 14:40",
      total: 120.4,
      status: EnumOrderStatus.PAGO,
    },
    {
      id: "2342",
      cliente: "Roberto Candido",
      itens: "Laranja, Limão",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "17/01/25 14:40",
      total: 120.4,
      status: EnumOrderStatus.CANCELADO,
    },
    {
      id: "2341",
      cliente: "Cliente padrão - Não identificado",
      itens: "Uva, Pêssego",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "-",
      total: 177.35,
      status: EnumOrderStatus.AGUARD_PGTO,
    },
    {
      id: "2342",
      cliente: "Roberto Candido",
      itens: "Laranja, Limão",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "17/01/25 14:40",
      total: 120.4,
      status: EnumOrderStatus.CANCELADO,
    },
    {
      id: "2341",
      cliente: "Cliente padrão - Não identificado",
      itens: "Uva, Pêssego",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "-",
      total: 177.35,
      status: EnumOrderStatus.AGUARD_PGTO,
    },
    {
      id: "2342",
      cliente: "Roberto Candido",
      itens: "Laranja, Limão",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "17/01/25 14:40",
      total: 120.4,
      status: EnumOrderStatus.CANCELADO,
    },
    {
      id: "2341",
      cliente: "Cliente padrão - Não identificado",
      itens: "Uva, Pêssego",
      qtd_itens: 2,
      dh_pedido: "17/01/25 14:40",
      dh_pagamento: "-",
      total: 177.35,
      status: EnumOrderStatus.AGUARD_PGTO,
    },
  ];

  return (
    isClient &&
    isAuth && (
      <>
        <Header title="FeiraFácil" content="Pedidos!" />
        <DefaultScreenLayout screen={EnumScreen.SALES}>
          <DefaultHeaderTitle
            title="Visualize aqui seus pedidos💰"
            content="Aqui você pode visualizar todos os seus pedidos realizados, filtrando por cliente ou status"
          />

          <div
            className="w-full h-22 md:w-fit justify-center flex gap-4 bg-white py-4 px-6 rounded-2xl 
                    shadow-lg mb-8 md:gap-6"
          >
            <span>
              <p className="text-secondary text-sm">Pagos</p>
              <h1 className="text-secondary text-2xl font-semibold pt-1">
                439
              </h1>
            </span>
            <div className="h-full w-0.5 bg-primary" />
            <span>
              <p className="text-secondary text-sm hidden md:flex">
                Aguardando Pgto
              </p>
              <p className="text-secondary text-sm md:hidden">Aguard. Pgto</p>
              <h1 className="text-sky-600 text-2xl font-semibold pt-1">4</h1>
            </span>
            <div className="h-full w-0.5 bg-primary" />
            <span>
              <p className="text-secondary text-sm">Cancelados</p>
              <h1 className="text-tertiary text-2xl font-semibold pt-1">12</h1>
            </span>
          </div>

          <div className="bg-white p-6 w-full rounded-2xl shadow-lg">
            <div className="w-full h-full">
              <div className="flex justify-between items-center h-8 md:h-10">
                <h2 className="font-semibold text-2xl text-secondary">
                  Vendas
                </h2>
                <span className="flex gap-4">
                  <button onClick={() => console.log("Fluxo de exportar csv")}>
                    <ExportDataIcon />
                  </button>
                  <button onClick={() => console.log("Apresentar filtro")}>
                    <FilterIcon />
                  </button>
                  <div className="mt-4 md:mt-0 md:w-36">
                    <CustomSelectOne
                      icon={<CalendarIcon />}
                      inputHeaderText=""
                      optionValue={selectedPeriod}
                      options={[
                        "Hoje",
                        "Últ. 7 dias",
                        "Últ. 15 dias",
                        "Últ. mês",
                      ]}
                      handleSelect={setSelectedPeriod}
                    />
                  </div>
                </span>
              </div>
              <table className="w-full mt-8 hidden md:block">
                <thead className="w-full">
                  <th className="text-left text-secondary text-xs font-normal">
                    Id
                  </th>
                  <th className="text-secondary text-xs font-normal">
                    Cliente
                  </th>
                  <th className="text-secondary text-xs font-normal">Itens</th>
                  <th className="text-secondary text-xs font-normal">
                    Qtd itens
                  </th>
                  <th className="text-secondary text-xs font-normal">
                    Data pedido
                  </th>
                  <th className="text-secondary text-xs font-normal">
                    Data pagamento
                  </th>
                  <th className="text-secondary text-xs font-normal">Total</th>
                  <th className="text-secondary text-xs font-normal">Status</th>
                  <th className="text-center text-secondary text-xs font-normal">
                    Detalhes
                  </th>
                </thead>
                <tbody>
                  {sales.map((item) => (
                    <tr className="h-16" key={item.id}>
                      <td className="w-[5%] text-secondary text-sm">
                        {item.id}
                      </td>
                      <td className="w-[20%] text-secondary text-sm">
                        {item.cliente}
                      </td>
                      <td className="w-[20%] text-center text-secondary text-sm">
                        {item.itens}
                      </td>
                      <td className="w-[7%] text-center text-secondary text-sm">
                        {item.qtd_itens}
                      </td>
                      <td className="w-[12%] text-center text-secondary text-sm">
                        {item.dh_pedido}
                      </td>
                      <td className="w-[12%] text-center text-secondary text-sm">
                        {item.dh_pagamento}
                      </td>
                      <td className="w-[12%] text-center text-secondary text-sm">
                        {formatMoneyWithSign(item.total)}
                      </td>
                      <td className="w-[15%] text-sm whitespace-nowrap">
                        <div className="w-full flex justify-center">
                          <span className="bg-primary bg-opacity-20 text-secondary" />
                          <span className="bg-blue-500 bg-opacity-20 text-blue-600" />
                          <span className="bg-tertiary bg-opacity-20 text-tertiary" />
                          <p
                            className={`${getOrderStatusColor(
                              item.status
                            )} p-0.5 px-3 rounded-2xl w-fit`}
                          >
                            {getOrderStatusDescription(item.status)}
                          </p>
                        </div>
                      </td>
                      <td
                        className="w-[10%]"
                        onClick={() =>
                          console.log("Abrir ficha produto " + item.id)
                        }
                      >
                        <span className="w-full flex justify-center">
                          <ArrowRightIcon fill="#3fbb97" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <TablePaginator
                  currentPage={1}
                  totalItems={1}
                  totalPages={1}
                  handleChangePage={() => console.log("Teste table")}
                />
              </table>
            </div>
          </div>
          <div className="w-full md:hidden">
            {sales.map((item) => (
              <div className="flex mt-8 flex-col p-6 bg-white rounded-2xl shadow-lg first:mt-4">
                <div className="flex w-full justify-between">
                  <span className="flex flex-col gap-4">
                    <p className="text-base text-secondary">Id</p>
                    <p className="text-sm text-secondary">{item.id}</p>
                  </span>
                  <span className="flex flex-col gap-4">
                    <p className="text-base text-secondary">Cliente</p>
                    <p className="text-sm text-secondary">{item.cliente}</p>
                  </span>
                  <span className="flex flex-col gap-4 items-center">
                    <p className="text-base text-secondary">Itens</p>
                    <p className="text-sm text-secondary">{item.itens}</p>
                  </span>
                </div>
                <div className="flex w-full justify-between mt-6">
                  <span className="flex flex-col gap-4">
                    <p className="text-base text-secondary">Qtd itens</p>
                    <p className="text-sm text-secondary">{item.qtd_itens}</p>
                  </span>
                  <span className="flex flex-col gap-4">
                    <p className="text-base text-secondary">Data pedido</p>
                    <p className="text-sm text-secondary">{item.dh_pedido}</p>
                  </span>
                  <span className="flex flex-col gap-4 items-center">
                    <p className="text-base text-secondary">Data pgto</p>
                    <p className="text-sm text-secondary">
                      {item.dh_pagamento}
                    </p>
                  </span>
                </div>
                <div className="flex w-full justify-between mt-6">
                  <span className="flex flex-col gap-4 items-center">
                    <p className="text-base text-secondary">Total</p>
                    <p className="text-sm text-secondary">
                      {formatMoneyWithSign(item.total)}
                    </p>
                  </span>
                  <span className="flex flex-col gap-4 items-center">
                    <p className="text-base text-secondary">Status</p>
                    <div className="w-full flex justify-center">
                      <span className="bg-opacity-20" />
                      <p
                        className={`${getOrderStatusColor(
                          item.status
                        )} p-0.5 px-3 rounded-2xl w-fit`}
                      >
                        {getOrderStatusDescription(item.status)}
                      </p>
                    </div>
                  </span>
                  <span className="flex flex-col gap-4 items-center">
                    <p className="text-base text-secondary">Detalhes</p>
                    <span>
                      <ArrowRightIcon fill="#3fbb97" />
                    </span>
                  </span>
                </div>
              </div>
            ))}
            <TablePaginator
              currentPage={1}
              totalItems={1}
              totalPages={1}
              handleChangePage={() => console.log("Teste table")}
            />
          </div>
        </DefaultScreenLayout>
      </>
    )
  );
}
