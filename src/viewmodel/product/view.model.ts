import { useEffect, useState } from "react";
import { Product } from "../../model/Product";
import {
  EnumMeasurementType,
  EnumMeasurementUnit,
  EnumProductCategory,
  FilterProduct,
  TableNavigation,
} from "../../utils/types";
import { getToken } from "../../utils/util";
import {
  handleFilterFetchProducts,
  handleUpdateProduct,
  handleSaveNewProduct,
} from "../../repositories/product.repository";
import useMiddleware from "../middleware";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-toastify";

export default function useProductViewModel() {
  const { isAuth, verifyUserAuth } = useMiddleware();
  const { user } = useAppContext();

  const INITIAL_PAGE = 1;

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [tableNavigation, setTableNavigation] = useState<TableNavigation>({
    currentPage: INITIAL_PAGE,
    totalItems: 0,
    totalPages: 0,
  });

  const isNewProduct = productToEdit?.id === undefined;

  useEffect(() => {
    setIsClient(true);

    verifyUserAuth();

    fetchProducts(INITIAL_PAGE);
  }, []);

  function openNewProductForm() {
    setProductToEdit(new Product());
  }

  function closeProductForm() {
    setProductToEdit(undefined);
  }

  function setFieldValue(field: keyof Product, value: any) {
    setProductToEdit((prev) => {
      if (!prev) return prev;

      const updated = { ...prev, [field]: value };

      return Object.assign(Object.create(Object.getPrototypeOf(prev)), updated);
    });
  }

  function fetchProducts(page: number = INITIAL_PAGE) {
    const token = getToken();
    const companyId = user?.company?.id;

    const filter: FilterProduct = { page, companyId };

    if (token) {
      setLoading(true);

      handleFilterFetchProducts(filter, token)
        .then((res) => {
          setProducts(res.data.map((item: any) => new Product(item)));
          setTableNavigation({
            currentPage: res.currentPage,
            totalItems: res.totalItems,
            totalPages: res.totalPages,
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }

  function validateProduct(product: Product): string | null {
    if (!product.name?.trim()) return "Produto não pode ser salvo sem Nome.";
    if (!product.sellingPrice || product.sellingPrice <= 0)
      return "Preço de venda deve ser maior que zero.";
    if (!product.costPrice || product.costPrice <= 0)
      return "Preço de custo deve ser maior que zero.";
    if (!product.measurementType) return "Tipo de medida é obrigatório.";
    if (!product.measurementUnit) return "Unidade de medida é obrigatória.";
    if (!product.category) return "Categoria do produto é obrigatória.";
    return null;
  }

  function saveProduct() {
    if (!productToEdit) {
      toast.warning("Nenhum produto para salvar.");
      return;
    }

    const error = validateProduct(productToEdit);

    if (error) {
      toast.warning(error);
      return;
    }

    const token = getToken();
    const companyId = user?.company?.id;

    if (token && companyId) {
      setLoading(true);

      handleSaveNewProduct(productToEdit, companyId, token)
        .then(() => {
          closeProductForm();
          fetchProducts(INITIAL_PAGE);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }

  function updateProduct() {
    if (!productToEdit) {
      toast.warning("Nenhum produto para salvar.");
      return;
    }

    const error = validateProduct(productToEdit);

    if (error) {
      toast.warning(error);
      return;
    }

    const token = getToken();
    const companyId = user?.company?.id;

    if (token && companyId) {
      setLoading(true);

      handleUpdateProduct(productToEdit, companyId, token)
        .then(() => {
          closeProductForm();
          fetchProducts(INITIAL_PAGE);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }

  function parseMeasurementTypeToLabel(): string {
    if (!productToEdit?.measurementType) return "";
    switch (productToEdit.measurementType) {
      case EnumMeasurementType.UNIT:
        return "Unidade";
      case EnumMeasurementType.BOX:
        return "Caixa";
      case EnumMeasurementType.WEIGHT:
        return "Peso";
      case EnumMeasurementType.VOLUME:
        return "Volume";
      default:
        return "";
    }
  }

  return {
    isClient,
    isAuth,
    products,
    fetchProducts,
    productToEdit,
    setProductToEdit,
    isNewProduct,
    openNewProductForm,
    closeProductForm,
    setFieldValue,
    saveProduct,
    updateProduct,
    validateProduct,
    tableNavigation,
  };
}
