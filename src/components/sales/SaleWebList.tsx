import { ArrowRightIcon } from "../svg/SvgIcons";
import { formatMoneyWithSign, getOrderStatusColor, getOrderStatusDescription } from "../../utils/util";

interface SaleWebListProps {
  sales: any[];
  handleOpenDetails: (id: string) => void;
}

export default function SaleWebList({ sales, handleOpenDetails }: SaleWebListProps) {
  return (
    <table className="w-full hidden md:block">
      <thead>
        <tr>
          <th className="text-left text-secondary text-xs font-normal">Id</th>
          <th className="text-secondary text-xs font-normal">Cliente</th>
          <th className="text-secondary text-xs font-normal">Itens</th>
          <th className="text-secondary text-xs font-normal">Qtd itens</th>
          <th className="text-secondary text-xs font-normal">Data pedido</th>
          <th className="text-secondary text-xs font-normal">Data pagamento</th>
          <th className="text-secondary text-xs font-normal">Total</th>
          <th className="text-secondary text-xs font-normal">Status</th>
          <th className="text-center text-secondary text-xs font-normal">Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((item) => (
          <tr key={item.id + item.status} className="h-16">
            <td className="text-secondary text-sm">{item.id}</td>
            <td className="text-secondary text-sm">{item.cliente}</td>
            <td className="text-secondary text-sm">{item.itens}</td>
            <td className="text-center text-secondary text-sm">{item.qtd_itens}</td>
            <td className="text-center text-secondary text-sm">{item.dh_pedido}</td>
            <td className="text-center text-secondary text-sm">{item.dh_pagamento}</td>
            <td className="text-center text-secondary text-sm">{formatMoneyWithSign(item.total)}</td>
            <td className="text-center text-sm">
              <span
                className={`${getOrderStatusColor(item.status)} p-0.5 px-3 rounded-2xl w-fit`}
              >
                {getOrderStatusDescription(item.status)}
              </span>
            </td>
            <td className="text-center">
              <button onClick={() => handleOpenDetails(item.id)}>
                <ArrowRightIcon fill="#3fbb97" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
