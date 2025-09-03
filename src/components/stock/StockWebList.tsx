import Image from "next/image";
import { StockMovement } from "../../model/StockMovement";
import TablePaginator from "../standard/TablePaginator";
import { ArrowRightIcon } from "../svg/SvgIcons";
import { EnumMovementType } from "../../utils/types";
import { formatMoneyWithSign, getProductColor, getProductImage, equalsEnum } from "../../utils/util";

interface StockWebListProps {
  movements: StockMovement[];
  setMovementToEdit: (movement: StockMovement) => void;
  handleChangePage: (page: number) => void;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export default function StockWebList({
  movements,
  setMovementToEdit,
  handleChangePage,
  totalItems,
  totalPages,
  currentPage,
}: StockWebListProps) {
  return (
    <div className="bg-white p-4 md:p-6 w-full rounded-2xl shadow-md">
      <div className="w-full h-full overflow-x-auto">
        <div className="flex justify-between items-center h-10 mb-4">
          <h2 className="font-semibold text-2xl text-gray-700">Movimentos de Estoque</h2>
        </div>

        <table className="w-full hidden md:table table-fixed border-collapse">
          <thead>
            <tr className="text-left text-gray-500 text-xs font-medium">
              <th className="w-24 px-2 py-1 text-center">Produto</th>
              <th className="w-24 px-2 py-1 text-center">Tipo de Movimentação</th>
              <th className="w-32 px-2 py-1 text-center">Tipo Movimento</th>
              <th className="w-24 px-2 py-1 text-center">Quantidade</th>
              <th className="w-24 px-2 py-1 text-center">Saldo</th>
              <th className="w-32 px-2 py-1 text-center">Data</th>
              <th className="w-24 px-2 py-1 text-center">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((item) => (
              <tr key={item.id} className="h-16 odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors">

                <td className="flex justify-center items-center gap-2 px-2 py-1">
                  <Image
                    src={getProductImage(item.product?.id ?? "") ?? "/placeholder-image.png"}
                    alt={item.product?.name ?? "-"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{item.product?.name}</span>
                </td>


                <td className="text-center px-2 py-1">
                  <span
                    className={`p-0.5 px-3 rounded-2xl w-fit text-sm whitespace-nowrap ${
                      equalsEnum(item.movementType, EnumMovementType.IN)
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.movementType}
                  </span>
                </td>


                <td className="text-center px-2 py-1 text-gray-700 text-sm">{item.movementType}</td>

                <td className="text-center px-2 py-1 text-gray-700 text-sm">{item.quantity}</td>

                <td className="text-center px-2 py-1 text-gray-700 text-sm">{item.balance}</td>

                <td className="text-center px-2 py-1 text-gray-700 text-sm">{item.movementDate}</td>

                <td className="text-center px-2 py-1">
                  <button
                    onClick={() => setMovementToEdit(item)}
                    className="hover:text-primary transition-colors"
                    aria-label="Detalhes do movimento"
                  >
                    <ArrowRightIcon fill="#3FBB97" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 hidden md:flex justify-center">
          <TablePaginator
            currentPage={currentPage}
            totalItems={totalItems}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
}
