import FindUserDialog from "../../components/order/FindUserDialog";
import RegisterUserDialog from "../../components/order/RegisterUserDialog";
import ProductsDialog from "../../components/order/ProductsDialog";
import AdditionDiscountDialog from "../../components/order/AdditionDiscountDialog";
import WaitingPaymentDialog from "../../components/order/WaitingPaymentDialog";

import dynamic from "next/dynamic";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import Header from "../../components/standard/Header";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import { EnumPaymentType, EnumScreen } from "../../utils/types";
import { useOrderViewModel } from "../../viewmodel/order/view.model";
import OrderCustomer from "../../components/order/OrderCustomer";
import OrderProducts from "../../components/order/OrderProducts";
import OrderPayment from "../../components/order/OrderPayment";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function OrderView() {
  const { states, actions } = useOrderViewModel();
  const {
    isClient,
    paymentType,
    installment,
    showFindUser,
    showRegisterUser,
    showProducts,
    showAdditionDiscount,
    showWaitingPayment,
    selectedUser,
    increaseDiscount,
    ordertems,
    orderResponse,
    selectedProducts,
    containsUpdatedItens,
    totalOrderValue,
    orderValue,
    isPaid,
    defaultUser,
    products,
  } = states;

  const {
    setPaymentType,
    setInstallment,
    setShowFindUser,
    setShowRegisterUser,
    setShowProducts,
    setShowAdditionDiscount,
    setShowWaitingPayment,
    setSelectedUser,
    handleCreateOrder,
    handleWaive,
    handleCancelOrder,
    handleStartNewOrder,
    updateProductQuantity,
  } = actions;

  if (!isClient) return null;

  return (
    <>
      <Header title="FeiraFácil" content="Realizar pedido!" />
      <DefaultScreenLayout screen={EnumScreen.ORDER}>
        <div className="flex flex-col md:h-full gap-6 md:gap-10">
          <DefaultHeaderTitle
            title="Realize suas vendas💰"
            content="Tire pedidos já realizados, ou inicie um com o pagamento integrado"
          />

          <div className="flex flex-col md:flex-row w-full h-full gap-4 md:gap-10 overflow-auto">
            {/* Customer + Products */}
            <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col gap-6">
              <OrderCustomer
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                showFindUser={showFindUser}
                setShowFindUser={setShowFindUser}
                showRegisterUser={showRegisterUser}
                setShowRegisterUser={setShowRegisterUser}
                defaultUser={defaultUser}
              />

              <OrderProducts
                ordertems={ordertems}
                selectedProducts={selectedProducts}
                containsUpdatedItens={containsUpdatedItens}
                setShowProducts={setShowProducts}
                updateProductQuantity={updateProductQuantity}
                totalOrderValue={totalOrderValue}
              />
            </div>

            <div className="hidden md:block h-3/4 w-0.5 bg-primary" />

            <div className="w-full md:w-2/5 lg:w-1/2 flex-shrink-0">
              <OrderPayment
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                installment={installment}
                setInstallment={setInstallment}
                orderResponse={orderResponse}
                increaseDiscount={increaseDiscount}
                orderValue={orderValue}
                isPaid={isPaid ?? false} // garante boolean
                setShowAdditionDiscount={setShowAdditionDiscount}
              />
            </div>
          </div>

          <div className="w-full flex mt-4 md:mt-auto justify-end gap-4">
            {!orderResponse && (
              <button
                disabled={
                  !selectedUser ||
                  ordertems.length === 0 ||
                  !paymentType ||
                  (paymentType === EnumPaymentType.CREDIT_CARD && !installment)
                }
                onClick={handleCreateOrder}
                className="btn btn-primary"
              >
                Realizar pedido
              </button>
            )}
          </div>
        </div>

        {/* Dialogs */}
        {showFindUser && <FindUserDialog />}
        {showRegisterUser && <RegisterUserDialog />}
        {showProducts && <ProductsDialog />}
        {showAdditionDiscount && <AdditionDiscountDialog />}
        {showWaitingPayment && <WaitingPaymentDialog />}
      </DefaultScreenLayout>
    </>
  );
}
