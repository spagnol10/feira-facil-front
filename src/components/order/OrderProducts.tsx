import Image from "next/image";
import Button from "../../components/standard/Button";
import { PlusIcon, MinusIcon, ShoppingCartIcon } from "../../components/svg/SvgIcons";
import { formatMoneyWithSign } from "../../utils/util";
import { OrderItemType } from "../../utils/types";

type Props = {
  ordertems?: OrderItemType[];
  totalOrderValue?: number;
  selectedProducts: OrderItemType[];
  containsUpdatedItens: boolean;
  setShowProducts: (val: boolean) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
};

export default function OrderProducts({
  ordertems,
  totalOrderValue,
  selectedProducts,
  containsUpdatedItens,
  setShowProducts,
  updateProductQuantity,
}: Props) {
  return (
    <div className="w-full p-6 mt-6 flex flex-col gap-6 justify-center items-center bg-white rounded-2xl shadow-lg">
      <span className="w-full flex flex-col justify-center items-center gap-2">
        <ShoppingCartIcon />
        {ordertems && ordertems.length ? (
          <>
            <div className="flex flex-col gap-2 w-full justify-center mt-2">
              <div className="flex w-full">
                <p className="w-full text-sm text-secondary">Nome</p>
                <p className="w-full text-sm text-center text-secondary">Quantidade</p>
                <p className="w-full text-sm text-right text-secondary">Valor</p>
                <p className="w-full text-sm text-right text-secondary">Total</p>
              </div>
              {ordertems.map((item) => (
                <div key={item.procuct.id} className="flex w-full justify-end">
                  <p className="w-full text-sm text-secondary">{item.procuct.name}</p>
                  <p className="w-full text-sm text-center text-secondary">{item.quantity}</p>
                  <p className="w-full text-sm text-right text-secondary">
                    {formatMoneyWithSign(item.procuct.sellingPrice)}
                  </p>
                  <p className="w-full text-sm text-right text-secondary">
                    {formatMoneyWithSign(item.quantity * item.procuct.sellingPrice)}
                  </p>
                </div>
              ))}
              <div className="h-0.5 y-4 w-full bg-primary md:block" />
              <span className="w-full flex justify-between">
                <p className="whitespace-nowrap text-sm text-right text-secondary">Sub-Total</p>
                <p className="w-full text-sm text-right text-secondary">
                  {formatMoneyWithSign(totalOrderValue ?? 0)}
                </p>
              </span>
            </div>
          </>
        ) : (
          <>
            <p className="text-secondary text-sm">Nenhum produto selecionado</p>
            <p className="text-secondary text-xs">Adicione um produto ao pedido</p>
          </>
        )}
      </span>
      {ordertems && (
        <Button
          icon={<PlusIcon fill="#245F40" />}
          text="Adicionar produto"
          className="text-secondary underline"
          onClick={() => setShowProducts(true)}
        />
      )}
    </div>
  );
}
