import { useState, useEffect } from "react";
import useMiddleware from "../middleware";
import { useAppContext } from "../../context/appContext";
import {
  EnumPaymentType,
  FilterProduct,
  TableNavigation,
} from "../../utils/types";
import { equalsEnum, getEnumKeyByValue, getToken } from "../../utils/util";
import {
  handleFetchStockProducts,
  handleFilterFetchProducts,
} from "../../repositories/product.repository";
import {
  handleCreateSale,
  handleGetSaleData,
  handleReverseOrder,
  handleWaiveOrder,
} from "../../repositories/order.repository";
import { Product } from "../../model/Product";

export type CustomerType = {
  id: string;
  name: string;
  document: string;
};

export type OrderItemType = {
  procuct: any; // pode tipar melhor se tiver ProductType
  quantity: number;
};

export type OrderResponseType = {
  id: string;
  status: string;
};

export type IncreaseDiscountType = {
  addition: number;
  discount: number;
};

export type Sale = {
  increase: number;
  discount: number;
  companyId: string;
  customerId: string;
  salePeriodId: string;
  items: { productId: string; quantity: number; salePrice: number }[];
  payment: {
    paymentType: string;
    instalments?: number;
    poiPayment: {
      deviceSerialNumber: string;
      displayName: string;
    };
  };
};

export function useOrderViewModel() {
  const { isAuth, verifyUserAuth } = useMiddleware();
  const { user } = useAppContext();

  const clients: CustomerType[] = [
    {
      id: "2ba17651-f2bb-4ba3-8f4e-248779bfe179",
      name: "Lorena Sara Marli Almeida",
      document: "282.****.544-**",
    },
    {
      id: "fa5d5f6b-0af6-4fcb-b196-3ff52643048c",
      name: "Carla Fernanda Silvana Baptista",
      document: "844.****.182-**",
    },
    {
      id: "ec146310-e8c5-4f70-ae70-c28e0ad0de4e",
      name: "Débora Vitória Dias",
      document: "143.****.249-**",
    },
    {
      id: "e00d03cd-8c3f-4dcb-82db-60e173f5a49a",
      name: "César Vitor Ruan Lopes",
      document: "604.***.921-**",
    },
  ];

  const defaultUser: CustomerType = {
    id: "e00d03cd-8c3f-4dcb-82db-60e173f5a49a",
    name: "Cliente Padrão - Não identificado",
    document: "000.***.000-**",
  };

  const INITIAL_PAGE = 1;

  const [isClient, setIsClient] = useState(false);
  const [paymentType, setPaymentType] = useState<EnumPaymentType>();
  const [installment, setInstallment] = useState<string>();
  const [showFindUser, setShowFindUser] = useState(false);
  const [showRegisterUser, setShowRegisterUser] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showAdditionDiscount, setShowAdditionDiscount] = useState(false);
  const [showWaitingPayment, setShowWaitingPayment] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<CustomerType>();
  const [newUser, setNewUser] = useState<CustomerType>();
  const [increaseDiscount, setIncreaseDiscount] =
    useState<IncreaseDiscountType>({ addition: 0, discount: 0 });
  const [allItems, setAllItems] = useState<OrderItemType[]>([]);
  const [ordertems, setOrderItems] = useState<OrderItemType[]>([]);
  const [orderResponse, setOrderResponse] = useState<OrderResponseType>();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [tableNavigation, setTableNavigation] = useState<TableNavigation>({
    currentPage: INITIAL_PAGE,
    totalItems: 0,
    totalPages: 0,
  });

  const isPaid = !!(
    orderResponse && equalsEnum(orderResponse.status, "PAGAMENTO REALIZADO")
  );

  // Efeitos
  useEffect(() => {
    setIsClient(true);
    handleFetchProducts();
    (async () => verifyUserAuth())();
  }, []);

  useEffect(() => {
    let isPolling = true;

    const poll = async () => {
      if (!isPolling) return;
      await handleVerifyPayment();
      setTimeout(poll, 5000);
    };

    if (!isPaid && orderResponse?.status === "AGUARDANDO PAGAMENTO") {
      poll();
    }

    return () => {
      isPolling = false;
    };
  }, [orderResponse]);

  // Funções
  const handleFetchProducts = () => {
    const token = getToken();
    if (token) {
      handleFetchStockProducts(token, user?.company?.id!)
        .then((res) => {
          const items: OrderItemType[] = res.data.map((item) => ({
            procuct: item,
            quantity: 0,
          }));
          setAllItems(items);
        })
        .catch(console.error);
    }
  };

  const handleCreateOrder = () => {
    const installmentNumber = installment?.replace("x", "");

    // Checa se tudo necessário está definido
    if (!selectedUser || !ordertems || !paymentType) {
      console.error("Cliente, produtos ou tipo de pagamento não selecionados!");
      return;
    }

    const sale: Sale = {
      increase: increaseDiscount.addition,
      discount: increaseDiscount.discount,
      companyId: user?.company?.id!,
      customerId: selectedUser.id,
      salePeriodId: "1",
      items: ordertems.map((item) => ({
        productId: item.procuct.id,
        quantity: item.quantity,
        salePrice: item.procuct.sellingPrice,
      })),
      payment: {
        paymentType: getEnumKeyByValue(
          EnumPaymentType,
          paymentType.toString()
        )!, // agora seguro
        instalments: installmentNumber
          ? Number.parseInt(installmentNumber)
          : undefined,
        poiPayment: {
          deviceSerialNumber: "PB09218377338",
          displayName: "FEIRA-FACIL",
        },
      },
    };

    const token = getToken();
    if (token) {
      handleCreateSale(sale, token)
        .then((orderRes) => {
          setOrderResponse({
            id: orderRes.id,
            status: "AGUARDANDO PAGAMENTO",
          });
          setShowWaitingPayment(true);
        })
        .catch((err) => console.error("ERRO AO CRIAR PEDIDO:", err));
    }
  };

  const handleWaive = () => {
    const token = getToken();
    if (token && orderResponse) {
      handleWaiveOrder(orderResponse.id, token)
        .then(() =>
          setOrderResponse({
            id: orderResponse.id,
            status: "DESISTÊNCIA PAGAMENTO",
          })
        )
        .catch(console.error);
    }
  };

  const handleCancelOrder = () => {
    const token = getToken();
    if (token && orderResponse) {
      handleReverseOrder(orderResponse.id, token)
        .then(() =>
          setOrderResponse({
            id: orderResponse.id,
            status: "PAGAMENTO ESTORNADO",
          })
        )
        .catch(console.error);
    }
  };

  const handleStartNewOrder = () => {
    setOrderResponse(undefined);
    setOrderItems([]);
    setSelectedUser(undefined);
    setPaymentType(undefined);
    setAllItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
  };

  const handleVerifyPayment = async () => {
    const token = getToken();
    if (token && orderResponse) {
      const res = await handleGetSaleData(orderResponse.id, token);
      if (res && equalsEnum(res.status, "PAID")) {
        setOrderResponse({
          id: orderResponse.id,
          status: "PAGAMENTO REALIZADO",
        });
        setShowWaitingPayment(false);
      }
    }
  };

  const updateProductQuantity = (productId: string, newQuantity: number) => {
    setAllItems((prev) =>
      prev.map((item) =>
        item.procuct.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      client.document.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredProducts = allItems.filter((item) =>
    item.procuct.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const selectedProducts = allItems.filter((item) => item.quantity > 0);
  const containsUpdatedItens = selectedProducts.length > 0;

  const totalOrderValue = ordertems?.reduce(
    (total, item) => total + item.procuct.sellingPrice * item.quantity,
    0
  );
  const orderValue =
    (totalOrderValue ?? 0) +
    increaseDiscount.addition -
    increaseDiscount.discount;


  return {
    states: {
      isClient,
      paymentType,
      installment,
      showFindUser,
      showRegisterUser,
      showProducts,
      showAdditionDiscount,
      showWaitingPayment,
      userSearch,
      selectedUser,
      newUser,
      increaseDiscount,
      allItems,
      ordertems,
      orderResponse,
      filteredClients,
      filteredProducts,
      selectedProducts,
      containsUpdatedItens,
      totalOrderValue,
      orderValue,
      defaultUser,
      isPaid,
    },
    actions: {
      setIsClient,
      setPaymentType,
      setInstallment,
      setShowFindUser,
      setShowRegisterUser,
      setShowProducts,
      setShowAdditionDiscount,
      setShowWaitingPayment,
      setUserSearch,
      setSelectedUser,
      setNewUser,
      setIncreaseDiscount,
      setAllItems,
      setOrderItems,
      setOrderResponse,
      handleFetchProducts,
      handleCreateOrder,
      handleWaive,
      handleCancelOrder,
      handleStartNewOrder,
      handleVerifyPayment,
      updateProductQuantity,
    },
  };
}
