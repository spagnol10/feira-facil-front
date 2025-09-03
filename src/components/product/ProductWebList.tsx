import Image from "next/image";
import { ProductProps } from "../../utils/types";
import { formatMoneyWithSign, getProductColor } from "../../utils/util";
import TablePaginator from "../standard/TablePaginator";
import { PencilIcon } from "../svg/SvgIcons";

export default function ProductTable({
  products,
  setProductToEdit,
  handleChangePage,
  totalItems,
  totalPages,
  currentPage,
}: ProductProps) {
  return (
    <div className="bg-white p-4 md:p-6 w-full rounded-2xl shadow-md">
      <div className="w-full h-full overflow-x-auto">

        <div className="flex justify-between items-center h-10 mb-4">
          <h2 className="font-semibold text-2xl text-gray-700">Produtos</h2>
        </div>

        <table className="w-full hidden md:table table-fixed border-collapse">
          <thead>
            <tr className="text-left text-gray-500 text-xs font-medium">
              <th className="w-24 px-2 py-1 text-center">Imagem</th>
              <th className="w-24 px-2 py-1 text-center">Código</th>
              <th className="w-48 px-2 py-1 text-center">Nome</th>
              <th className="w-32 px-2 py-1 text-center">Valor custo</th>
              <th className="w-32 px-2 py-1 text-center">Valor venda</th>
              <th className="w-24 px-2 py-1 text-center">Estoque</th>
              <th className="w-32 px-2 py-1 text-center">Mensuração</th>
              <th className="w-32 px-2 py-1 text-center">Unidade</th>
              <th className="w-24 px-2 py-1 text-center">Categoria</th>
              <th className="w-24 px-2 py-1 text-center">Status</th>
              <th className="w-24 px-2 py-1 text-center">Editar</th>
              <th className="w-12 px-2 py-1 text-center" />
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="h-16 odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors"
              >
                {/* Imagem */}
                <td className="flex justify-center px-2 py-1">
                  <Image
                    src={item.imageUrl ?? "/placeholder-image.png"}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </td>

                <td className="text-sm text-gray-500 text-center px-2 py-1">{item.code}</td>
                <td className="text-sm font-semibold text-gray-700 text-center px-2 py-1 truncate" title={item.name}>{item.name}</td>
                <td className="text-sm text-gray-500 text-center px-2 py-1">{formatMoneyWithSign(item.costPrice)}</td>
                <td className="text-sm text-gray-500 text-center px-2 py-1">{formatMoneyWithSign(item.sellingPrice)}</td>
                <td className="text-sm text-gray-500 text-center px-2 py-1">{item.stock ?? 0}</td>
                <td className="text-sm text-gray-500 text-center px-2 py-1 truncate" title={item.measurementType}>{item.measurementType}</td>
                <td className="text-sm text-gray-500 text-center px-2 py-1 truncate" title={item.measurementUnit}>{item.measurementUnit}</td>

                <td className="text-center px-2 py-1">
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${getProductColor(item.category!)}`}>
                    {item.category}
                  </span>
                </td>

                <td className="text-center px-2 py-1">
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                    item.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {item.active ? "Ativo" : "Desativado"}
                  </span>
                </td>

                <td className="text-center px-2 py-1">
                  <button
                    onClick={() => setProductToEdit(item)}
                    className="hover:text-primary transition-colors"
                    aria-label="Editar produto"
                  >
                    <PencilIcon fill="#245F40" />
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
