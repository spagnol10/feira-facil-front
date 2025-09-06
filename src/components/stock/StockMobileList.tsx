import Image from "next/image";
import { StockMovement } from "../../model/StockMovement";
import { formatMoneyWithSign, getProductImage, equalsEnum } from "../../utils/util";
import { ArrowRightIcon, PhotoIcon } from "../svg/SvgIcons";

interface StockMobileListProps {
  movements: StockMovement[];
  setMovementToEdit: (movement: StockMovement) => void;
  handleChangePage: (page: number) => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export default function StockMobileList({
  movements,
  setMovementToEdit,
  handleChangePage,
  totalItems,
  currentPage,
  totalPages,
}: StockMobileListProps) {
  return (
    <div className="w-full mt-4 md:hidden">
      {movements.map((item) => (
        <div
          key={item.id}
          className="relative mt-6 flex flex-col p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 first:mt-0"
        >
          <button
            onClick={() => setMovementToEdit(item)}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Detalhes do movimento"
          >
            <ArrowRightIcon fill="#3FBB97" />
          </button>

          <div className="flex items-center gap-4">

            <span className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
              {item.product?.imageUrl ? (
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <PhotoIcon />
                </div>
              )}
            </span>

            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold text-secondary">
                {item.product?.name ?? "-"}
              </p>

              <div className="flex gap-4 justify-between text-sm text-gray-500">
                <span>Movimento: {item.movementType}</span>
                <span>Quantidade: {item.quantity}</span>
              </div>

              <div className="flex gap-4 justify-between text-sm text-gray-500 mt-2">
                <span>Saldo: {item.balance}</span>
                <span>Data: {item.createdAt}</span>
              </div>

              {item.product && (
                <div className="flex gap-4 justify-between text-sm text-gray-500 mt-2">
                  <span>Custo: {formatMoneyWithSign(item.product.costPrice)}</span>
                  <span>Venda: {formatMoneyWithSign(item.product.sellingPrice)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {currentPage < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
}
