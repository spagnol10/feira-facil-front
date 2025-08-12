import Button from "../../components/standard/Button";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import Header from "../../components/standard/Header";
import { PlusIcon } from "../../components/svg/SvgIcons";
import { Product } from "../../model/Product";
import { EnumScreen } from "../../utils/types";
import useProductViewModel from "../../viewmodel/product/view.model";

import ProductForm from "../../components/product/ProductForm";
import ProductMobileList from "../../components/product/ProductMobileList";
import ProductWebList from "../../components/product/ProductWebList";

export default function ProductView() {
  const {
    isClient,
    isAuth,
    products,
    productToEdit,
    setProductToEdit,
    isNewProduct,
    fetchProducts,
    setFieldValue,
    saveProduct,
    updateProduct,
    validateProduct,
    tableNavigation,
  } = useProductViewModel();

  return (
    isClient &&
    isAuth && (
      <>
        <Header title="FeiraFácil" content="Gerenciar produtos!" />
        <DefaultScreenLayout screen={EnumScreen.PRODUCTS}>
          <div className="flex flex-col md:h-full">
            <DefaultHeaderTitle
              title="Gerencie seus produtos🥕"
              content="Aqui você cadastra, edita e inativa seus produtos"
            />

            {productToEdit ? (
              <ProductForm
                productToEdit={productToEdit}
                isNewProduct={isNewProduct}
                setProductToEdit={setProductToEdit}
                setFieldValue={setFieldValue}
                saveProduct={saveProduct}
                validateProduct={validateProduct}
                updateProduct={updateProduct}
              />
            ) : (
              <>
                <div className="flex justify-end mb-6">
                  <span className="flex gap-4 md:gap-6 w-44">
                    <Button
                      icon={<PlusIcon fill="#FFF" />}
                      text="Novo produto"
                      className="border bg-tertiary text-white"
                      onClick={() => setProductToEdit(new Product())}
                    />
                  </span>
                </div>

                <ProductWebList
                  products={products}
                  handleChangePage={fetchProducts}
                  setProductToEdit={setProductToEdit}
                  totalItems={tableNavigation.totalItems}
                  currentPage={tableNavigation.currentPage}
                  totalPages={tableNavigation.totalPages}
                />

                <ProductMobileList
                  products={products}
                  handleChangePage={fetchProducts}
                  setProductToEdit={setProductToEdit}
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
