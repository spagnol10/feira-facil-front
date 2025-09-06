import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/appContext";
import { Product } from "../../model/Product";
import { StockMovement } from "../../model/StockMovement";
import { handleFilterFetchProducts } from "../../repositories/product.repository";
import {
  handleFilterFetchStockMovements,
  handleSaveNewStockMovement,
} from "../../repositories/stock.repository";
import {
  FilterProduct,
  FilterStockMovement,
  TableNavigation,
} from "../../utils/types";
import { getToken } from "../../utils/util";
import useMiddleware from "../middleware";

export default function useStockViewModel() {
  const { isAuth, verifyUserAuth } = useMiddleware();
  const { user } = useAppContext();

  const INITIAL_PAGE = 1;

  const [selectedMovement, setSelectedMovement] = useState<
    StockMovement | undefined
  >();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [movementToEdit, setMovementToEdit] = useState<StockMovement>();
  const [tableNavigation, setTableNavigation] = useState<TableNavigation>({
    currentPage: INITIAL_PAGE,
    totalItems: 0,
    totalPages: 0,
  });

  const isNewMovement = !movementToEdit?.id;

  useEffect(() => {
    fetchProducts();

    setIsClient(true);

    verifyUserAuth();

    fetchMovements(INITIAL_PAGE);
  }, []);

  function openNewMovementForm() {
    setMovementToEdit(new StockMovement());
  }

  function closeMovementForm() {
    setMovementToEdit(undefined);
  }

  function setFieldValue(field: keyof StockMovement, value: any) {
    setMovementToEdit((prev) => {
      if (!prev) return prev;

      const updated = { ...prev, [field]: value };
      return Object.assign(Object.create(Object.getPrototypeOf(prev)), updated);
    });
  }

  function fetchMovements(page: number = INITIAL_PAGE) {
    const token = getToken();
    const companyId = user?.company?.id;

    const filter: FilterStockMovement = { page, companyId };

    if (token) {
      setLoading(true);

      handleFilterFetchStockMovements(filter, token)
        .then((res) => {
          setMovements(res.data.map((item: any) => new StockMovement(item)));
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

  function validateMovement(movement: StockMovement): string | null {
    if (!movement.product) return "Selecione um produto.";

    if (!movement.quantity || movement.quantity <= 0)
      return "Quantidade deve ser maior que zero.";

    if (!movement.movementType) return "Tipo de entrada/saída é obrigatório.";
    return null;
  }

  function saveMovement() {
    if (!movementToEdit) {
      toast.warning("Nenhum movimento para salvar.");
      return;
    }

    const error = validateMovement(movementToEdit);

    if (error) {
      toast.warning(error);
      return;
    }

    const token = getToken();
    const companyId = user?.company?.id;

    if (token && companyId) {
      setLoading(true);

      const productId =  movementToEdit.productId;         

      if(!productId){
        toast.warning(error);
        return ;
      }

      handleSaveNewStockMovement(movementToEdit, productId, companyId, token)
        .then(() => {
          closeMovementForm();
          fetchMovements(INITIAL_PAGE);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }

  function updateMovement() {
    if (!movementToEdit) {
      toast.warning("Nenhum movimento para salvar.");
      return;
    }

    const error = validateMovement(movementToEdit);
    if (error) {
      toast.warning(error);
      return;
    }

    const token = getToken();
    const companyId = user?.company?.id;

    if (token && companyId) {
      setLoading(true);

      toast.warning("Nenhum movimento para salvar.");

      // handleSaveNewStockMovement(movementToEdit, companyId, token)
      //   .then(() => {
      //     closeMovementForm();
      //     fetchMovements(INITIAL_PAGE);
      //   })
      //   .catch(console.error)
      //   .finally(() => setLoading(false));
    }
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

  return {
    isClient,
    isAuth,
    loading,
    movements,
    movementToEdit,
    setMovementToEdit,
    selectedMovement,
    setSelectedMovement,
    isNewMovement,
    openNewMovementForm,
    closeMovementForm,
    setFieldValue,
    fetchMovements,
    saveMovement,
    updateMovement,
    tableNavigation,
    validateMovement,
    products,
  };
}
