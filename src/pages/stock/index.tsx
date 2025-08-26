import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import Header from "../../components/standard/Header";
import TablePaginator from "../../components/standard/TablePaginator";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExportDataIcon,
  FilterIcon,
  PlusIcon,
} from "../../components/svg/SvgIcons";
import {
  EnumProductCategory,
  EnumEntryOut,
  EnumScreen,
  StockMovementType,
} from "../../utils/types";
import {
  equalsEnum,
  formatMoneyWithSign,
  getProductColor,
  getProductImage,
  handleChange,
  handleChangeValue,
} from "../../utils/util";
import useMiddleware from "../../viewmodel/middleware";

export default function StockView() {
  const { isAuth, verifyUserAuth } = useMiddleware();
  const [isClient, setIsClient] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<any>();
  const isNewMovement = selectedMovement?.id == 0;
  const stock = [
    {
      id: 340,
      produto: {
        id: "db365a91-8280-4e76-b8cd-4e83cbae9d41",
        nome: "Alface",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.VERDURA,
        status: "ACTIVE",
        estoque: 58,
        descricao: `A alface (Lactuca sativa) é uma hortaliça folhosa amplamente consumida em todo o mundo, conhecida por sua textura crocante e sabor suave. Versátil e nutritiva, é um ingrediente essencial em saladas, sanduíches e acompanhamentos.

Benefícios Nutricionais
    Rica em fibras, vitaminas A, C e K.
    Poucas calorias, ideal para dietas saudáveis.
    Contém antioxidantes e minerais como potássio e cálcio.`,
      },
      tipoES: EnumEntryOut.ENTRY,
      tipoMovimento: "Produção própria",
      quantidade: 200,
      saldo: 310,
      dataMovimento: "21/01/25 14:40",
    },
    {
      id: 339,
      produto: {
        id: "db365a91-8280-4e76-b8cd-4e83cbae9d41",
        nome: "Alface",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.VERDURA,
        status: "ACTIVE",
        estoque: 58,
        descricao: `A alface (Lactuca sativa) é uma hortaliça folhosa amplamente consumida em todo o mundo, conhecida por sua textura crocante e sabor suave. Versátil e nutritiva, é um ingrediente essencial em saladas, sanduíches e acompanhamentos.

Benefícios Nutricionais
    Rica em fibras, vitaminas A, C e K.
    Poucas calorias, ideal para dietas saudáveis.
    Contém antioxidantes e minerais como potássio e cálcio.`,
      },
      tipoES: EnumEntryOut.OUT,
      tipoMovimento: "Venda em feira",
      quantidade: 4,
      saldo: 110,
      dataMovimento: "17/01/25 14:40",
    },
    {
      id: 338,
      produto: {
        id: "db365a91-8280-4e76-b8cd-4e83cbae9d41",
        nome: "Alface",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.VERDURA,
        status: "ACTIVE",
        estoque: 58,
        descricao: `A alface (Lactuca sativa) é uma hortaliça folhosa amplamente consumida em todo o mundo, conhecida por sua textura crocante e sabor suave. Versátil e nutritiva, é um ingrediente essencial em saladas, sanduíches e acompanhamentos.

Benefícios Nutricionais
    Rica em fibras, vitaminas A, C e K.
    Poucas calorias, ideal para dietas saudáveis.
    Contém antioxidantes e minerais como potássio e cálcio.`,
      },
      tipoES: EnumEntryOut.OUT,
      tipoMovimento: "Venda em feira",
      quantidade: 2,
      saldo: 114,
      dataMovimento: "15/01/25 14:40",
    },
    {
      id: 337,
      produto: {
        id: "c9ddf49d-84ea-453a-bb58-35aec318ae23",
        nome: "Banana",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.LEGUME,
        status: "ACTIVE",
        estoque: 34,
      },
      tipoES: EnumEntryOut.OUT,
      tipoMovimento: "Doação para o CEASA",
      quantidade: 40,
      saldo: 40,
      dataMovimento: "15/01/25 14:40",
    },
    {
      id: 336,
      produto: {
        id: "db365a91-8280-4e76-b8cd-4e83cbae9d41",
        nome: "Alface",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.VERDURA,
        status: "ACTIVE",
        estoque: 58,
        descricao: `A alface (Lactuca sativa) é uma hortaliça folhosa amplamente consumida em todo o mundo, conhecida por sua textura crocante e sabor suave. Versátil e nutritiva, é um ingrediente essencial em saladas, sanduíches e acompanhamentos.

        Benefícios Nutricionais
            Rica em fibras, vitaminas A, C e K.
            Poucas calorias, ideal para dietas saudáveis.
            Contém antioxidantes e minerais como potássio e cálcio.`,
      },
      tipoES: EnumEntryOut.ENTRY,
      tipoMovimento: "Produção própria",
      quantidade: 62,
      saldo: 116,
      dataMovimento: "15/01/25 14:40",
    },
    {
      id: 335,
      produto: {
        id: "a3640697-a768-4b08-944e-d1fadc8b0c7a",
        nome: "Beterraba",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.LEGUME,
        status: "ACTIVE",
        estoque: 19,
      },
      tipoES: EnumEntryOut.ENTRY,
      tipoMovimento: "Produção própria",
      quantidade: 40,
      saldo: 50,
      dataMovimento: "15/01/25 14:40",
    },
    {
      id: 334,
      produto: {
        id: "cf30d70d-5000-448f-a5a0-226ff42ab661",
        nome: "Cenoura",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.VERDURA,
        status: "INACTIVE",
        estoque: 0,
      },
      tipoES: EnumEntryOut.OUT,
      tipoMovimento: "Venda em feira",
      quantidade: 2,
      saldo: 18,
      dataMovimento: "15/01/25 14:40",
    },
    {
      id: 337,
      produto: {
        id: "c9ddf49d-84ea-453a-bb58-35aec318ae23",
        nome: "Banana",
        valorCusto: 1.2,
        valorVenda: 2.5,
        mensuracao: "Unidade",
        unidadeMensuracao: "QTD",
        tipo: EnumProductCategory.FRUTA,
        status: "ACTIVE",
        estoque: 34,
      },
      tipoES: EnumEntryOut.ENTRY,
      tipoMovimento: "Compra de terceiros",
      quantidade: 40,
      saldo: 80,
      dataMovimento: "15/01/25 14:40",
    },
  ];

  useEffect(() => {
    setIsClient(true);

    (async () => verifyUserAuth())();
  }, []);

  return (
    isClient &&
    isAuth && (
      <>
        <Header title="FeiraFácil" content="Gerenciar estoque!" />
        <DefaultScreenLayout screen={EnumScreen.STOCK}>
          <div className="flex flex-col md:h-full">
            <DefaultHeaderTitle
              title="Gerencie seu estoque📦"
              content="Visualize e realize lançamentos em seu estoque"
            />
            {selectedMovement || isNewMovement ? (
              <>
                <div>
                  <button
                    onClick={() => setSelectedMovement(undefined)}
                    className="flex gap-4"
                  >
                    <ArrowLeftIcon />
                    <p className="text-secondary">Voltar</p>
                  </button>
                  {isNewMovement ? (
                    <div className="mt-8">
                      <h2 className="text-dark-color text-lg font-medium">
                        Dados do lançamento
                      </h2>
                      <div className="flex flex-col gap-6 mt-6 md:flex-row lg:w-9/12">
                        <DefaultSelectOne
                          handleSelect={(e) =>
                            handleChangeValue(
                              e,
                              "produto.nome",
                              setSelectedMovement
                            )
                          }
                          inputHeaderText="Produto"
                          optionValue={"Alface"}
                          options={["Alface", "Banana", "Beterraba", "Couve"]}
                        />
                        <DefaultSelectOne
                          handleSelect={(val) =>
                            handleChangeValue(
                              val,
                              "tipoES",
                              setSelectedMovement
                            )
                          }
                          inputHeaderText="Tipo entrada/saída"
                          optionValue={selectedMovement.tipoES ?? "Selecione"}
                          options={[EnumEntryOut.ENTRY, EnumEntryOut.OUT]}
                        />
                        <DefaultSelectOne
                          handleSelect={(val) =>
                            handleChangeValue(
                              val,
                              "tipoMovimento",
                              setSelectedMovement
                            )
                          }
                          inputHeaderText="Tipo movimento"
                          optionValue={
                            selectedMovement.tipoMovimento ?? "Selecione"
                          }
                          options={[
                            "Venda em feira",
                            "Compra terceiros",
                            "Produção própria",
                            "Doação para o CEASA",
                          ]}
                        />
                        <span className="w-full">
                          <CustomInput
                            id="quantidade"
                            type="numeric"
                            value={
                              selectedMovement.quantidade?.toString() ?? ""
                            }
                            inputHeaderText="Quantidade"
                            onChange={(e) =>
                              handleChange(e, setSelectedMovement)
                            }
                          />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <h2 className="text-dark-color text-lg font-medium">
                        Informações do movimento
                      </h2>
                      <div className="flex flex-col w-full mt-6 md:flex-row lg:w-9/12">
                        <div className="flex flex-col w-full p-6 lg:gap-[4%] bg-white rounded-2xl shadow-lg lg:flex-row">
                          <span className="flex w-full justify-between">
                            <span className="flex flex-col gap-4">
                              <p className="text-xs text-secondary">Id</p>
                              <p className="text-sm text-secondary">
                                {stock[0].id}
                              </p>
                            </span>
                            <span className="flex flex-col gap-4">
                              <p className="text-xs text-secondary">Tipo E/S</p>
                              <div className="w-full flex justify-center">
                                <p
                                  className={`p-0.5 px-3 rounded-2xl w-fit text-sm whitespace-nowrap 
                                                                    ${
                                                                      equalsEnum(
                                                                        stock[0]
                                                                          .tipoES,
                                                                        EnumEntryOut.ENTRY
                                                                      )
                                                                        ? "bg-green-100 text-secondary"
                                                                        : "bg-red-100 text-secondary"
                                                                    }`}
                                >
                                  {stock[0].tipoES}
                                </p>
                              </div>
                            </span>
                            <span className="flex flex-col items-center gap-4">
                              <p className="text-xs text-secondary">
                                Tipo movimento
                              </p>
                              <p className="text-sm text-secondary">
                                {stock[0].tipoMovimento}
                              </p>
                            </span>
                            <span className="flex flex-col items-center gap-4">
                              <p className="text-xs text-secondary">
                                Quantidade
                              </p>
                              <p className="text-sm text-secondary">
                                {stock[0].quantidade}
                              </p>
                            </span>
                          </span>
                          <span className="flex w-full justify-between mt-6 lg:mt-0">
                            <span className="flex flex-col items-center gap-4">
                              <p className="text-xs text-secondary">
                                Saldo anterior
                              </p>
                              <p className="text-sm text-secondary">
                                {stock[0].saldo - stock[0].quantidade}
                              </p>
                            </span>
                            <span className="flex flex-col items-center gap-4">
                              <p className="text-xs text-secondary">
                                Saldo atual
                              </p>
                              <p className="text-sm text-secondary">
                                {stock[0].saldo}
                              </p>
                            </span>
                            <span className="flex flex-col items-center gap-4">
                              <p className="text-xs text-secondary">
                                Data movimento
                              </p>
                              <p className="text-sm text-secondary">
                                {stock[0].dataMovimento}
                              </p>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-8">
                    <h2 className="text-dark-color text-lg font-medium">
                      {isNewMovement
                        ? "Dados atuais do produto selecionado"
                        : "Produto do movimento"}
                    </h2>
                    <div className="flex flex-col w-full mt-6 md:flex-row lg:w-9/12">
                      <div className="flex flex-col w-full p-6 lg:gap-[4%] bg-white rounded-2xl shadow-lg lg:flex-row">
                        <span className="flex w-full justify-between">
                          <span className="flex">
                            <span className="w-20">
                              <Image
                                src={getProductImage(stock[0].produto.id)!}
                                alt={stock[0].produto.nome}
                                width={58}
                                height={40}
                              />
                            </span>
                            <span className="hidden flex-col gap-4 md:flex">
                              <p className="text-xs text-secondary">Id</p>
                              <p className="text-sm text-secondary">
                                {stock[0].id}
                              </p>
                            </span>
                          </span>
                          <span className="flex flex-col gap-4">
                            <p className="text-xs text-secondary">Nome</p>
                            <p className="text-sm text-secondary">
                              {stock[0].produto.nome}
                            </p>
                          </span>
                          <span className="flex flex-col items-center gap-4">
                            <p className="text-xs text-secondary">
                              Valor custo
                            </p>
                            <p className="text-sm text-secondary">
                              {formatMoneyWithSign(stock[0].produto.valorCusto)}
                            </p>
                          </span>
                          <span className="flex flex-col items-center gap-4">
                            <p className="text-xs text-secondary">
                              Valor venda
                            </p>
                            <p className="text-sm text-secondary">
                              {formatMoneyWithSign(stock[0].produto.valorVenda)}
                            </p>
                          </span>
                          <span className="flex flex-col items-center gap-4">
                            <p className="text-xs text-secondary">Estoque</p>
                            <p className="text-sm text-secondary">
                              {stock[0].produto.estoque}
                            </p>
                          </span>
                        </span>
                        <span className="flex w-full justify-between mt-6 lg:mt-0">
                          <span className="flex flex-col items-center gap-4">
                            <p className="text-xs text-secondary">Mensuração</p>
                            <p className="text-sm text-secondary">
                              {stock[0].produto.mensuracao}
                            </p>
                          </span>
                          <span className="hidden flex-col items-center gap-4 md:flex">
                            <p className="text-xs text-secondary">
                              Unidade de mensuração
                            </p>
                            <p className="text-sm text-secondary">
                              {stock[0].produto.unidadeMensuracao}
                            </p>
                          </span>
                          <span className="flex flex-col items-center gap-4">
                            <p className="text-xs text-secondary">Tipo</p>
                            <div className="w-full flex justify-center">
                              <span className="bg-primary bg-opacity-20 text-secondary" />
                              <span className="bg-blue-500 bg-opacity-20 text-blue-600" />
                              <span className="bg-tertiary bg-opacity-20 text-tertiary" />
                              <p
                                className={`${getProductColor(
                                  stock[0].produto.tipo
                                )} p-0.5 px-3 rounded-2xl w-fit`}
                              >
                                {stock[0].produto.tipo}
                              </p>
                            </div>
                          </span>
                          <span className="flex flex-col items-center gap-4">
                            <p className="text-xs text-secondary">Status</p>
                            <div className="w-full flex justify-center">
                              <p
                                className={`p-0.5 px-3 rounded-2xl w-fit text-sm whitespace-nowrap 
                                                                ${
                                                                  equalsEnum(
                                                                    stock[0]
                                                                      .produto
                                                                      .status,
                                                                    "ACTIVE"
                                                                  )
                                                                    ? "bg-green-100 text-secondary"
                                                                    : "bg-red-100 text-red-600"
                                                                }`}
                              >
                                {stock[0].produto.status}
                              </p>
                            </div>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {isNewMovement && (
                  <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                    <span className="w-full md:w-52">
                      <Button
                        disabled
                        text={"Realizar lançamento"}
                        onClick={() => console.log("Realizar lançamento")}
                      />
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-end mb-6">
                  <span className="flex gap-4 w-52">
                    <Button
                      icon={<PlusIcon fill="#FFF" />}
                      text="Novo lanaçamento"
                      className="border bg-tertiary text-white"
                      onClick={() =>
                        setSelectedMovement({ id: 0 } as StockMovementType)
                      }
                    />
                  </span>
                </div>
                <div className="bg-white p-6 w-full rounded-2xl shadow-lg">
                  <div className="w-full h-full">
                    <div className="flex justify-between items-center h-8 md:h-10">
                      <h2 className="font-semibold text-2xl text-secondary">
                        Estoque
                      </h2>
                      <span className="flex gap-4">
                        <button
                          onClick={() => console.log("Fluxo de exportar csv")}
                        >
                          <ExportDataIcon />
                        </button>
                        <button
                          onClick={() => console.log("Apresentar filtro")}
                        >
                          <FilterIcon />
                        </button>
                      </span>
                    </div>
                    <table className="w-full mt-8 hidden md:block">
                      <thead className="w-full">
                        <th className="w-12" />
                        <th className="text-left text-secondary text-xs font-normal">
                          Id
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Produto
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Tipo E/S
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Tipo movimento
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Quantidade
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Saldo
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Data movimento
                        </th>
                        <th className="text-secondary text-xs font-normal">
                          Detalhes
                        </th>
                      </thead>
                      <tbody>
                        {stock.map((item) => (
                          <tr className="h-16" key={item.id}>
                            <td className="min-w-12 lg:min-w-16 xl:min-w-20">
                              <Image
                                src={getProductImage(item.produto.id)!}
                                alt={item.produto.nome}
                                width={48}
                              />
                            </td>
                            <td className="w-[6%] text-secondary text-sm">
                              {item.id}
                            </td>
                            <td className="w-[20%] text-secondary text-sm">
                              {item.produto.nome}
                            </td>
                            <td className="w-[10%]">
                              <div className="w-full flex justify-center">
                                <p
                                  className={`p-0.5 px-3 rounded-2xl w-fit text-sm whitespace-nowrap 
                                                                    ${
                                                                      equalsEnum(
                                                                        item.tipoES,
                                                                        EnumEntryOut.ENTRY
                                                                      )
                                                                        ? "bg-green-100 text-secondary"
                                                                        : "bg-red-100 text-secondary"
                                                                    }`}
                                >
                                  {item.tipoES}
                                </p>
                              </div>
                            </td>
                            <td className="w-[22%] xl:w-[20%] text-center text-secondary text-sm">
                              {item.tipoMovimento}
                            </td>
                            <td className="w-[12%] xl:w-[15%] text-center text-secondary text-sm">
                              {item.quantidade}
                            </td>
                            <td className="w-[6%] xl:w-[15%] text-center text-secondary text-sm">
                              {item.saldo}
                            </td>
                            <td className="w-[14%] text-center text-secondary text-sm">
                              {item.dataMovimento}
                            </td>
                            <td className="w-[6%]">
                              <button
                                onClick={() => setSelectedMovement(item)}
                                className="w-full flex justify-center"
                              >
                                <ArrowRightIcon fill="#3FBB97" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <TablePaginator
                        currentPage={1}
                        totalItems={1}
                        totalPages={1}
                        handleChangePage={() => console.log("Teste table")}
                      />
                    </table>
                  </div>
                </div>
                <div className="w-full md:hidden">
                  {stock.map((item) => (
                    <div className="flex mt-8 flex-col p-6 bg-white rounded-2xl shadow-lg first:mt-4">
                      <div className="flex w-full justify-between">
                        <span className="flex">
                          <span className="w-20">
                            <Image
                              src={getProductImage(item.produto.id)!}
                              alt={item.produto.nome}
                              width={58}
                              height={40}
                            />
                          </span>
                          <span className="flex flex-col gap-4">
                            <p className="text-base text-secondary">Nome</p>
                            <p className="text-sm text-secondary">
                              {item.produto.nome}
                            </p>
                          </span>
                        </span>
                        <span className="flex gap-4">
                          <span className="flex flex-col gap-4">
                            <p className="text-base text-secondary">Id</p>
                            <p className="text-sm text-secondary">{item.id}</p>
                          </span>
                          <span className="flex flex-col gap-4 items-center whitespace-nowrap">
                            <p className="text-base text-secondary">Tipo E/S</p>
                            <div className="w-full flex justify-center">
                              <p
                                className={`p-0.5 px-3 rounded-2xl w-fit text-sm ${
                                  equalsEnum(item.tipoES, EnumEntryOut.ENTRY)
                                    ? "bg-green-100 text-secondary"
                                    : "bg-red-100 text-secondary"
                                }`}
                              >
                                {item.tipoES}
                              </p>
                            </div>
                          </span>
                        </span>
                      </div>
                      <div className="flex w-full justify-between mt-6">
                        <span className="flex flex-col gap-4 items-center">
                          <p className="text-base text-secondary">
                            Tipo movimento
                          </p>
                          <p className="text-sm text-secondary">
                            {item.tipoMovimento}
                          </p>
                        </span>
                        <span className="flex flex-col gap-4 items-center">
                          <p className="text-base text-secondary">Qtd</p>
                          <p className="text-sm text-secondary">
                            {item.quantidade}
                          </p>
                        </span>
                        <span className="flex flex-col gap-4 items-center">
                          <p className="text-base text-secondary">Saldo</p>
                          <p className="text-sm text-secondary">{item.saldo}</p>
                        </span>
                        <span className="flex flex-col gap-4 items-center">
                          <p className="text-base text-secondary">Detalhes</p>
                          <button
                            onClick={() => setSelectedMovement(item)}
                            className="w-full flex justify-center"
                          >
                            <ArrowRightIcon fill="#3FBB97" />
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                  <TablePaginator
                    currentPage={1}
                    totalItems={1}
                    totalPages={1}
                    handleChangePage={() => console.log("Teste table")}
                  />
                </div>
              </>
            )}
          </div>
        </DefaultScreenLayout>
      </>
    )
  );
}
