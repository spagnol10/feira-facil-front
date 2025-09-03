import { toast } from "react-toastify";
import {
  DataPagebleList,
  FilterProduct,
  FilterStockMovement,
  RequestConfig,
} from "../utils/types";
import RestClient from "./client";
import { StockMovement } from "../model/StockMovement";

export function handleFilterFetchStockMovements(
  filter: FilterStockMovement,
  token: string
): Promise<DataPagebleList> {
  const restClient = RestClient();
  const headers = new Map();

  headers.set("companyId", filter.companyId);

  const reqConfig: RequestConfig = {
    reqParams: {
      token,
      headers,
      query: {
        page: filter.page,
      },
    },
    reqInitConfig: { throws: true },
  };

  return restClient.get("/stock/movement/all", reqConfig);
}

export function handleSaveNewStockMovement(
  newMovement: StockMovement,
  companyId: string,
  token: string
): Promise<any> {
  const restClient = RestClient();
  const headers = new Map<string, string>().set("companyId", companyId);

  const reqConfig: RequestConfig = {
    reqParams: {
      token,
      headers,
      json: JSON.stringify(newMovement),
    },
    reqInitConfig: {
      throws: true,
      toastifySuccessMsg: "Movimento registrado com sucesso ✅",
    },
  };

  return restClient.post("/stock/movement", reqConfig);
}

export function handleUpdateStockMovement(
  movement: StockMovement,
  companyId: string,
  token: string
): Promise<any> {
  if (!movement.id)
    throw new Error("ID do movimento é obrigatório para atualização");

  const restClient = RestClient();
  const headers = new Map<string, string>().set("companyId", companyId);

  const dto = {
    productId: movement.product?.id,
    movementType: movement.movementType,
    quantity: movement.quantity,
    balance: movement.balance,
    movementDate: movement.movementDate,
  };

  const reqConfig: RequestConfig = {
    reqParams: {
      token,
      headers,
      json: JSON.stringify(dto),
    },
    reqInitConfig: {
      throws: true,
      toastifySuccessMsg: "Movimento atualizado com sucesso ✅",
    },
  };

  return restClient.patch(`/stock/movement/${movement.id}`, reqConfig);
}
