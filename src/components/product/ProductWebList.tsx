import Image from "next/image";
import { ProductProps } from "../../utils/types";
import { formatMoneyWithSign, getProductColor } from "../../utils/util";
import TablePaginator from "../standard/TablePaginator";
import { ExportDataIcon, FilterIcon, PencilIcon } from "../svg/SvgIcons";

export default function ProductTable({
  products,
  setProductToEdit,
  handleChangePage,
  totalItems,
  totalPages,
  currentPage,
}: ProductProps) {
  return (
    <div className="bg-white p-6 w-full rounded-2xl shadow-lg">
      <div className="w-full h-full">
        <div className="flex justify-between items-center h-8 md:h-10">
          <h2 className="font-semibold text-2xl text-secondary">Produtos</h2>
          <span className="flex gap-4">
            <button onClick={() => console.log("Fluxo de exportar csv")}>
              <ExportDataIcon />
            </button>
            <button onClick={() => console.log("Apresentar filtro")}>
              <FilterIcon />
            </button>
          </span>
        </div>
        <table className="w-full mt-8 hidden md:block">
          <thead className="w-full">
            <th className="w-12" />
            <th className="text-left text-secondary text-xs font-normal">
              Código
            </th>
            <th className="text-secondary text-xs font-normal">Nome</th>
            <th className="text-secondary text-xs font-normal">Valor custo</th>
            <th className="text-secondary text-xs font-normal">Valor venda</th>
            <th className="text-secondary text-xs font-normal">Estoque</th>
            <th className="text-secondary text-xs font-normal">Mensuração</th>
            <th className="text-secondary text-xs font-normal">
              Unidade mensuração
            </th>
            <th className="text-secondary text-xs font-normal">Tipo</th>
            <th className="text-secondary text-xs font-normal">Status</th>
            <th className="text-secondary text-xs font-normal">Editar</th>
            <th className="w-12" />
          </thead>
          <tbody>
            {products.map((item) => (
              <tr className="h-16" key={item.id}>
                <td className="min-w-12 lg:min-w-16 xl:min-w-20">
                  <Image
                    src={item.imageUrl ?? "/placeholder-image.png"}
                    alt={item.name}
                    width={58}
                    height={40}
                  />
                </td>
                <td className="w-[6%] text-secondary text-sm">{item.code}</td>
                <td className="w-[15%] text-secondary text-sm text-center">{item.name}</td>
                <td className="w-[10%] text-center text-secondary text-sm">
                  {formatMoneyWithSign(item.costPrice)}
                </td>
                <td className="w-[10%] text-center text-secondary text-sm">
                  {formatMoneyWithSign(item.sellingPrice)}
                </td>
                <td className="w-[12%] text-center text-secondary text-sm">
                  {item.stock ? item.stock : 0}
                </td>
                <td className="w-[10%] text-center text-secondary text-sm">
                  {item.measurementType}
                </td>
                <td className="w-[10%] lg:w-[15%] text-center text-secondary text-sm">
                  {item.measurementUnit}
                </td>
                <td className="w-[10%] text-sm whitespace-nowrap">
                  <div className="w-full flex justify-center">
                    <span className="bg-primary bg-opacity-20 text-secondary hidden" />
                    <span className="bg-blue-500 bg-opacity-20 text-blue-600 hidden" />
                    <span className="bg-tertiary bg-opacity-20 text-tertiary hidden" />
                    <p
                      className={`${getProductColor(
                        item.category!
                      )} p-0.5 px-3 rounded-2xl w-fit`}
                    >
                      {item.category}
                    </p>
                  </div>
                </td>
                <td className="w-[10%]">
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
                </td>
                <td className="w-[10%]">
                  <button
                    onClick={() => setProductToEdit(item)}
                    className="w-full flex justify-center"
                    aria-label="Editar produto"
                  >
                    <PencilIcon fill="#245F40" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <TablePaginator
            currentPage={currentPage}
            totalItems={totalItems}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        </table>
      </div>
    </div>
  );
}
