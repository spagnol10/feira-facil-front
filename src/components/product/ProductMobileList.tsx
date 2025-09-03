import Image from "next/image";
import TablePaginator from "../standard/TablePaginator";
import { CheckIcon, XIcon, PencilIcon, PhotoIcon } from "../svg/SvgIcons";
import { ProductProps } from "../../utils/types";
import { formatMoneyWithSign } from "../../utils/util";

export default function ProductMobileList({
  products,
  setProductToEdit,
  handleChangePage,
  totalItems,
  currentPage,
  totalPages,
}: ProductProps) {
  return (
    <div className="w-full mt-4 md:hidden">
      {products.map((item) => (
        <div
          key={item.id}
          className="relative mt-6 flex flex-col p-6 bg-white rounded-2xl shadow-md hover:shadow-lg
           transition-shadow duration-300 first:mt-0"
        >
          <button
            onClick={() => setProductToEdit(item)}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Editar produto"
          >
            <PencilIcon fill="#245F40" />
          </button>

          <div className="flex items-center gap-4">
            {/* Imagem */}
            <span className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
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
                {item.name}
              </p>
              <div className="flex gap-4 justify-between text-sm text-gray-500">
                <span>Código: {item.code}</span>
                <span>Estoque: {item.stock ?? 0}</span>
              </div>
              <div className="flex gap-4 justify-between text-sm text-gray-500 mt-2">
                <span>Custo: {formatMoneyWithSign(item.costPrice)}</span>
                <span>Venda: {formatMoneyWithSign(item.sellingPrice)}</span>
              </div>
            </div>
          </div>

          {/* <div className="mt-3">
            {item.active ? (
              <div className="flex items-center gap-1 bg-green-100 text-green-700
               font-semibold px-3 py-1 rounded-full w-fit transform transition-transform duration-200 hover:scale-105">
                <CheckIcon size={16} /> ATIVO
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-100 text-red-600
               font-semibold px-3 py-1 rounded-full w-fit transform transition-transform duration-200 hover:scale-105">
                <XIcon size={16} /> DESATIVADO
              </div>
            )}
          </div> */}
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <TablePaginator
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}
