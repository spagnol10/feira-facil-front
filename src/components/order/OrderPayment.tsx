import { EnumPaymentType } from "../../utils/types";
import { IncreaseDiscountType } from "../../viewmodel/order/view.model";

type Props = {
  paymentType?: EnumPaymentType;
  setPaymentType: (type: EnumPaymentType) => void;
  installment?: string;
  setInstallment: (value: string) => void;
  orderResponse?: any;
  increaseDiscount: IncreaseDiscountType;
  orderValue?: number;
  isPaid: boolean;
  setShowAdditionDiscount: (show: boolean) => void;
};

export default function OrderPayment({
  paymentType,
  setPaymentType,
  installment,
  setInstallment,
  orderResponse,
  increaseDiscount,
  orderValue,
  isPaid,
  setShowAdditionDiscount,
}: Props) {
  return (
    <div className="w-full md:w-2/5 lg:1/2 p-2 border rounded">
      <h2 className="text-lg font-bold">Pagamento</h2>

      <select
        value={paymentType || ""}
        onChange={(e) => setPaymentType(e.target.value as EnumPaymentType)}
        className="w-full border rounded p-1 my-2"
      >
        <option value="">Selecione o tipo de pagamento</option>
        <option value="CASH">Dinheiro</option>
        <option value="CREDIT_CARD">Cartão de crédito</option>
        <option value="DEBIT_CARD">Cartão de débito</option>
      </select>

      {paymentType === EnumPaymentType.CREDIT_CARD && (
        <input
          type="text"
          placeholder="Parcelas"
          value={installment}
          onChange={(e) => setInstallment(e.target.value)}
          className="w-full border rounded p-1 my-2"
        />
      )}

      <button
        className="btn btn-secondary mt-2"
        onClick={() => setShowAdditionDiscount(true)}
      >
        Adicionar desconto / acréscimo
      </button>

      {orderValue !== undefined && (
        <p className="mt-2 font-bold">Total do pedido: R$ {orderValue.toFixed(2)}</p>
      )}

      {isPaid && <p className="text-green-600 font-bold mt-2">Pagamento realizado!</p>}
      {orderResponse && !isPaid && (
        <p className="text-yellow-600 font-bold mt-2">{orderResponse.status}</p>
      )}
    </div>
  );
}
