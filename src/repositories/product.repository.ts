import { Product } from "../model/Product";
import {
  FilterProduct,
  ProductDTO,
  ProductPagebleList,
  RequestConfig,
} from "../utils/types";
import RestClient from "./client";

export function handleFetchStockProducts(
  token: string,
  companyId: string
): Promise<ProductPagebleList> {
  const restClient = RestClient();
  const headers = new Map().set("companyId", companyId);

  const reqConfig: RequestConfig = {
    reqParams: {
      token,
      headers,
    },
    reqInitConfig: {
      throws: true,
    },
  };

  return restClient.get("/product", reqConfig);
}

export function handleFilterFetchProducts(
  filter: FilterProduct,
  token: string
): Promise<ProductPagebleList> {
  const restClient = RestClient();
  const headers = new Map();

  headers.set("companyId", filter.companyId);

  const reqConfig: RequestConfig = {
    reqParams: {
      token,
      headers,
      query: {
        page: filter.page,
        inStock: filter.inStock,
      },
    },
    reqInitConfig: {
      throws: true,
    },
  };

  return restClient.get("/product", reqConfig);
}

export function handleSaveNewProduct(
  newProduct: Product,
  companyId: string,
  token: string
): Promise<any> {
  const restClient = RestClient();
  const headers = new Map().set("companyId", companyId);

  const reqConfig: RequestConfig = {
    reqParams: {
      headers,
      token,
      json: JSON.stringify(newProduct),
    },
    reqInitConfig: {
      throws: true,
      toastifySuccessMsg: "Produto salvo com sucesso!",
    },
  };

  return restClient.post("/product", reqConfig);
}

export function handleUpdateProduct(
  newProduct: Product,
  companyId: string,
  token: string
): Promise<any> {
  const restClient = RestClient();
  const headers = new Map().set("companyId", companyId);

  const dto: ProductDTO = {
    name: newProduct.name,
    code: newProduct.code,
    imageUrl: newProduct.imageUrl,
    costPrice: newProduct.costPrice,
    sellingPrice: newProduct.sellingPrice,
    measurementType: newProduct.measurementType,
    measurementUnit: newProduct.measurementUnit,
    category: newProduct.category,
    active: newProduct.active,
    stock: newProduct.stock,
    description: newProduct.description,
  };

  const reqConfig: RequestConfig = {
    reqParams: {
      headers,
      token,
      json: JSON.stringify(dto),
    },
    reqInitConfig: {
      throws: true,
      toastifySuccessMsg: "Produto atualizado com sucesso!",
    },
  };

  return restClient.patch(`/product/${newProduct.id}`, reqConfig);
}
