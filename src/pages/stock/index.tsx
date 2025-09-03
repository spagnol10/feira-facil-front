import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import Header from "../../components/standard/Header";
import { PlusIcon } from "../../components/svg/SvgIcons";
import { StockMovement } from "../../model/StockMovement";
import { EnumScreen } from "../../utils/types";
import useStockViewModel from "../../viewmodel/stock/view.model";

import Button from "../../components/standard/Button";
import StockForm from "../../components/stock/StockForm";
import StockMobileList from "../../components/stock/StockMobileList";
import StockWebList from "../../components/stock/StockWebList";

export default function StockView() {
  const {
    isClient,
    isAuth,
    movements,
    movementToEdit,
    setMovementToEdit,
    isNewMovement,
    fetchMovements,
    setFieldValue,
    saveMovement,
    updateMovement,
    validateMovement,
    tableNavigation,
    products,
  } = useStockViewModel();

  return (
    isClient &&
    isAuth && (
      <>
        <Header title="FeiraFácil" content="Gerenciar estoque!" />
        <DefaultScreenLayout screen={EnumScreen.STOCK}>
          <div className="flex flex-col md:h-full">
            <DefaultHeaderTitle
              title="Gerencie seu estoque"
              content="Visualize e realize lançamentos em seu estoque"
            />

            {movementToEdit ? (
              <StockForm
                movementToEdit={movementToEdit}
                isNewMovement={isNewMovement}
                setMovementToEdit={setMovementToEdit}
                setFieldValue={setFieldValue}
                saveMovement={saveMovement}
                validateMovement={validateMovement}
                updateMovement={updateMovement}
                products={products}
              />
            ) : (
              <>
                <div className="flex justify-end mb-6">
                  <span className="flex gap-4 md:gap-6 w-44">
                    <Button
                      icon={<PlusIcon fill="#FFF" />}
                      text="Novo lançamento"
                      className="border bg-tertiary text-white"
                      onClick={() => setMovementToEdit(new StockMovement())}
                    />
                  </span>
                </div>

                <StockWebList
                  movements={movements}
                  handleChangePage={fetchMovements}
                  setMovementToEdit={setMovementToEdit}
                  totalItems={tableNavigation.totalItems}
                  currentPage={tableNavigation.currentPage}
                  totalPages={tableNavigation.totalPages}
                />

                <StockMobileList
                  movements={movements}
                  handleChangePage={fetchMovements}
                  setMovementToEdit={setMovementToEdit}
                  totalItems={tableNavigation.totalItems}
                  currentPage={tableNavigation.currentPage}
                  totalPages={tableNavigation.totalPages}
                />
              </>
            )}
          </div>
        </DefaultScreenLayout>
      </>
    )
  );
}
