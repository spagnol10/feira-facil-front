import Image from "next/image";
import TablePaginator from "../standard/TablePaginator";
import { PencilIcon } from "../svg/SvgIcons";
import { ProductProps } from "../../utils/types";
import { equalsEnum, formatMoneyWithSign } from "../../utils/util";

export default function ProductMobileList({
  products,
  setProductToEdit,
  handleChangePage,
  totalItems,
  currentPage,
  totalPages,
}: ProductProps) {
  return (
    <div className="w-full md:hidden">
      {products.map((item) => (
        <div
          className="flex mt-8 flex-col p-6 bg-white rounded-2xl shadow-lg first:mt-4"
          key={item.id}
        >
          <div className="flex w-full justify-between">
            <span className="flex gap-4">
              <span className="w-20">
                <Image
                  src={item.imageUrl?.toString() || "/placeholder-image.png"}
                  alt={item.name}
                  width={80}
                  height={60}
                  className="rounded-md object-cover"
                />
              </span>
              <span className="flex flex-col gap-4 items-center ml-4">
                <p className="text-base text-secondary">Nome</p>
                <p className="text-base text-secondary">
                  {item.name}
                </p>
              </span>
            </span>
            <span className="flex gap-4">
              <span className="flex flex-col gap-4 items-center mr-4">
                <p className="text-base text-secondary">Código</p>
                <p className="text-sm text-secondary">{item.code}</p>
              </span>
              <span className="flex flex-col gap-4 items-center">
                <p className="text-base text-secondary">Estoque</p>
                <p className="text-sm text-secondary">
                  {item.stock ? item.stock : 0}
                </p>
              </span>
            </span>
          </div>
          <div className="flex w-full justify-between mt-6">
            <span className="flex flex-col gap-4 items-center">
              <p className="text-base text-secondary">Vlr custo</p>
              <p className="text-sm text-secondary">
                {formatMoneyWithSign(item.costPrice)}
              </p>
            </span>
            <span className="flex flex-col gap-4 items-center">
              <p className="text-base text-secondary">Vlr venda</p>
              <p className="text-sm text-secondary">
                {formatMoneyWithSign(item.sellingPrice)}
              </p>
            </span>
            <span className="flex flex-col gap-4 items-center whitespace-nowrap">
              <p className="text-base text-secondary">Status</p>
              <div className="w-full flex justify-center">
                <p
                  className={`p-0.5 px-3 rounded-2xl w-fit text-sm whitespace-nowrap
                  ${
                    item.active
                      ? "bg-green-100 text-secondary"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.active ? "ATIVO" : "DESATIVADO"}
                </p>
              </div>
            </span>
            <span className="flex flex-col gap-4 items-center">
              <p className="text-base text-secondary">Editar</p>
              <button
                onClick={() => setProductToEdit(item)}
                className="w-full flex justify-center"
                aria-label="Editar produto"
              >
                <PencilIcon fill="#245F40" />
              </button>
            </span>
          </div>
        </div>
      ))}
      <TablePaginator
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}
