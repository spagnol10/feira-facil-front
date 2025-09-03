import { ArrowRightIcon } from "../svg/SvgIcons";
import { formatMoneyWithSign, getOrderStatusColor, getOrderStatusDescription } from "../../utils/util";
import TablePaginator from "../standard/TablePaginator";
import { EnumOrderStatus } from "../../utils/types";

interface SaleMobileListProps {
  sales: any[]; // você pode tipar melhor com sua interface de Sale
  handleOpenDetails: (id: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handleChangePage: (page: number) => void;
}

export default function SaleMobileList({
  sales,
  handleOpenDetails,
  currentPage,
  totalPages,
  totalItems,
  handleChangePage,
}: SaleMobileListProps) {
  return (
    <div className="w-full md:hidden">
      {sales.map((item) => (
        <div
          key={item.id + item.status}
          className="flex flex-col p-4 bg-white rounded-2xl shadow-md mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="flex flex-col">
              <p className="text-xs text-gray-400">ID</p>
              <p className="text-sm font-medium text-gray-700">{item.id}</p>
            </span>
            <span className="flex flex-col">
              <p className="text-xs text-gray-400">Cliente</p>
              <p className="text-sm font-medium text-gray-700">{item.cliente}</p>
            </span>
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-400">Itens</p>
            <p className="text-sm text-gray-700 truncate">{item.itens}</p>
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Qtd: {item.qtd_itens}</span>
            <span>Pedido: {item.dh_pedido}</span>
            <span>Pgto: {item.dh_pagamento}</span>
          </div>

          <div className="flex justify-between mt-2 items-center">
            <span className="text-sm font-medium text-gray-700">
              Total: {formatMoneyWithSign(item.total)}
            </span>
            <span
              className={`${getOrderStatusColor(item.status)} text-xs font-medium px-2 py-1 rounded-full`}
            >
              {getOrderStatusDescription(item.status)}
            </span>
            <button
              onClick={() => handleOpenDetails(item.id)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <ArrowRightIcon fill="#3fbb97" />
            </button>
          </div>
        </div>
      ))}

      <TablePaginator
        currentPage={currentPage}
        totalItems={totalItems}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}
