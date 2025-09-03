import Image from "next/image";
import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import { ArrowLeftIcon } from "../../components/svg/SvgIcons";
import { Product } from "../../model/Product";
import { StockMovement } from "../../model/StockMovement";
import { EnumMovementType } from "../../utils/types";
import {
  formatMoneyWithSign,
  getProductColor,
  getProductImage,
  handleChangeValue
} from "../../utils/util";

interface StockFormProps {
  movementToEdit: StockMovement;
  isNewMovement: boolean;
  setMovementToEdit: (movement?: StockMovement) => void;
  setFieldValue: (field: keyof StockMovement, value: any) => void;
  saveMovement: () => void;
  updateMovement: () => void;
  validateMovement: (movement: StockMovement) => string | null;
  products: Product[];
}

export default function StockForm({
  movementToEdit,
  isNewMovement,
  setMovementToEdit,
  setFieldValue,
  saveMovement,
  validateMovement,
  updateMovement,
  products,
}: StockFormProps) {
  return (
    <div className="w-full max-w-full bg-white p-6 md:p-10 rounded-2xl shadow-md">
      <button
        onClick={() => setMovementToEdit(undefined)}
        className="flex items-center gap-2 text-gray-600 hover:text-dark-color transition"
      >
        <ArrowLeftIcon />
        <span>Voltar</span>
      </button>

      <h2 className="mt-6 text-2xl font-semibold text-dark-color">
        {isNewMovement ? "Novo lançamento" : "Editar movimento"}
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Preencha os dados abaixo para{" "}
        {isNewMovement ? "Cadastrar" : "Atualizar"} o movimento.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DefaultSelectOne
          handleSelect={(val) =>
            setMovementToEdit(
              new StockMovement({
                ...movementToEdit,
                product: products.find((p) => p.name === val),
              })
            )
          }
          inputHeaderText="Produto"
          optionValue={movementToEdit.product?.name ?? ""}
          options={products.map((p) => p.name)}
        />

        <DefaultSelectOne
          handleSelect={(val) =>
            handleChangeValue(val, "movementType", setMovementToEdit)
          }
          inputHeaderText="Tipo de Movimentação"
          optionValue={movementToEdit.movementType ?? "Selecione"}
          options={[EnumMovementType.IN, EnumMovementType.OUT]}
        />

        <CustomInput
          id="quantity"
          type="numeric"
          value={movementToEdit.quantity?.toString() ?? ""}
          inputHeaderText="Quantidade"
          onChange={(e) =>
            setMovementToEdit(
              new StockMovement({
                ...movementToEdit,
                quantity: Number(e.target.value) || 0,
              })
            )
          }
        />
      </div>

      {movementToEdit.product && (
        <div className="mt-8 p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src={getProductImage(movementToEdit.product?.imageUrl)!}
                alt={movementToEdit.product?.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between gap-1">
              <h4 className="text-lg font-semibold text-gray-800 truncate">
                {movementToEdit.product?.name}
              </h4>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                <span>
                  Custo: {formatMoneyWithSign(movementToEdit.product.costPrice)}
                </span>
                <span>
                  Venda:{" "}
                  {formatMoneyWithSign(movementToEdit.product?.sellingPrice)}
                </span>
                <span>Estoque: {movementToEdit.product?.stock}</span>
              </div>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getProductColor(
                    (movementToEdit.product?.measurementType as any) ??
                      "DEFAULT"
                  )}`}
                >
                  {movementToEdit.product?.measurementType ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button
          disabled={!!validateMovement(movementToEdit)}
          text={isNewMovement ? "Cadastrar lançamento" : "Salvar alterações"}
          onClick={isNewMovement ? saveMovement : updateMovement}
        />
      </div>
    </div>
  );
}
