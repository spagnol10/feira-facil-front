import dynamic from 'next/dynamic';

import Image from "next/image";
import { useEffect, useState } from "react";
import posAnimation from "../../assets/posAnimation.json";
import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import DefaultDialog from "../../components/standard/DefaultDialog";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import Header from "../../components/standard/Header";
import { FindUserIcon, MinusIcon, NewUserIcon, PlusIcon, PriceChangeIcon, SearchIcon, ShoppingCartIcon, UnknownUserIcon } from "../../components/svg/SvgIcons";
import { useAppContext } from "../../context/appContext";
import { handleCreateSale, handleGetSaleData, handleReverseOrder, handleWaiveOrder } from "../../repositories/order.repository";
import { handleFetchStockProducts } from "../../repositories/product.repository";
import { CustomerType, EnumPaymentType, EnumScreen, IncreaseDiscountType, OrderItemType, OrderResponseType, Sale } from "../../utils/types";
import { equalsEnum, equalsStr, findEnumByValue, formatCurrency, formatMoneyWithSign, formatPhoneInput, getEnumKeyByValue, getToken, handleChange, handleCurrencyChange, isNullOrEmpty, isNullOrUndefined, validatePhone } from "../../utils/util";
import useMiddleware from "../../viewmodel/middleware";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
export default function OrderView() {
    const { isAuth, verifyUserAuth } = useMiddleware();
    const { user } = useAppContext();

    const clients = [
        { id: "2ba17651-f2bb-4ba3-8f4e-248779bfe179", name: "Lorena Sara Marli Almeida", document: "282.****.544-**" },
        { id: "fa5d5f6b-0af6-4fcb-b196-3ff52643048c", name: "Carla Fernanda Silvana Baptista", document: "844.****.182-**" },
        { id: "ec146310-e8c5-4f70-ae70-c28e0ad0de4e", name: "Débora Vitória Dias", document: "143.****.249-**" },
        { id: "e00d03cd-8c3f-4dcb-82db-60e173f5a49a", name: "César Vitor Ruan Lopes", document: "604.***.921-**" },
    ];

    const [isClient, setIsClient] = useState(false);//solve render error
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
    const [increaseDiscount, setIncreaseDiscount] = useState<IncreaseDiscountType>({ addition: 0, discount: 0 });
    const defaultUser = { id: "e00d03cd-8c3f-4dcb-82db-60e173f5a49a", name: "Cliente Padrão - Não identificado", document: "000.***.000-**" };
    const [allItems, setAllItems] = useState<OrderItemType[]>([]);
    const [ordertems, setOrderItems] = useState<OrderItemType[]>();
    const [orderResponse, setOrderResponse] = useState<OrderResponseType>();
    const isPaid = orderResponse && equalsEnum(orderResponse.status, "PAGAMENTO REALIZADO");

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

    function handleFetchProducts() {
        const token = getToken();

        if (token) {
            handleFetchStockProducts(token, user?.company?.id!)
                .then(res => {
                    const orderItem: Array<OrderItemType> = res.data.map(item => {
                        return {
                            procuct: item,
                            quantity: 0
                        }
                    });

                    setAllItems(orderItem);
                })
                .catch(console.error);
        }
    }

    function handleCreateOrder() {
        let installmentx = installment?.replace("x", "");

        if (selectedUser && ordertems) {
            const sale: Sale = {
                increase: increaseDiscount.addition,
                discount: increaseDiscount.discount,
                companyId: user?.company?.id!,
                customerId: selectedUser.id,
                salePeriodId: "1",
                items: ordertems?.map(item => {
                    return {
                        productId: item.procuct.id,
                        quantity: item.quantity,
                        salePrice: item.procuct.sellingPrice
                    }
                }),
                payment: {
                    paymentType: getEnumKeyByValue(EnumPaymentType, paymentType?.toString()!),
                    instalments: installmentx ? Number.parseInt(installmentx) : undefined,
                    poiPayment: {
                        deviceSerialNumber: "PB09218377338",
                        displayName: "FEIRA-FACIL"
                    }
                }
            }

            let token = getToken();

            if (token) {
                handleCreateSale(sale, token)
                    .then(orderRes => {
                        setOrderResponse({
                            id: orderRes.id,
                            status: "AGUARDANDO PAGAMENTO"
                        });

                        setShowWaitingPayment(true);
                    })
                    .catch(err => "ERRO AO CRIAR PEDIDO: " + err);
            }

        }
    }

    function handleWaive() {
        let token = getToken();

        if (token && orderResponse) {
            handleWaiveOrder(orderResponse.id, token)
                .then(res => {
                    setOrderResponse({
                        id: orderResponse.id,
                        status: "DESISTÊNCIA PAGAMENTO"
                    })
                })
                .catch(err => err);
        }
    }

    function handleStartNewOrder() {
        setOrderResponse(undefined);
        setOrderItems([]);
        setSelectedUser(undefined);
        setPaymentType(undefined);
        setAllItems(prev => prev.map(item => ({ ...item, quantity: 0 })));
    }

    function handleCancelOrder() {
        let token = getToken();

        if (token && orderResponse) {
            handleReverseOrder(orderResponse.id, token)
                .then(res => {
                    setOrderResponse({
                        id: orderResponse.id,
                        status: "PAGAMENTO ESTORNADO"
                    })
                })
                .catch(err => err);
        }
    }

    function handleVerifyPayment() {
        let token = getToken();

        if (token && orderResponse) {
            handleGetSaleData(orderResponse.id, token)
                .then(res => {
                    if (res && equalsEnum(res.status, "PAID")) {
                        setOrderResponse({
                            id: orderResponse.id,
                            status: "PAGAMENTO REALIZADO"
                        });

                        setShowWaitingPayment(false);
                    }
                })
        }
    }

    function updateProductQuantity(productId: string, newQuantity: number) {
        setAllItems((prevItems) =>
            prevItems.map((item) =>
                item.procuct.id == productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(userSearch.toLowerCase())
        || client.document.toLowerCase().includes(userSearch.toLowerCase())
    );
    const filteredProducts = allItems.filter(item =>
        item.procuct.name.toLowerCase().includes(userSearch.toLowerCase())
    );

    const selectedProducts = allItems.filter(item => item.quantity > 0);
    const containsUpdatedItens = selectedProducts.length > 0;
    const totalOrderValue = ordertems?.reduce((total, item) => {
        return total + item.procuct.sellingPrice * item.quantity;
    }, 0);
    const orderValue = (totalOrderValue ?? 0) + increaseDiscount.addition - increaseDiscount.discount;

    return (
        (isClient && isAuth) &&
        <>
            <Header title="FeiraFácil" content="Realizar pedido!" />
            <DefaultScreenLayout screen={EnumScreen.ORDER} >
                <div className="flex flex-col md:h-full">
                    <DefaultHeaderTitle title="Realize suas vendas💰"
                        content="Tire pedidos já realizados, ou inicie um com o pagamento integrado" />
                    <div className="w-full h-full flex gap-10 flex-col md:flex-row">
                        <div className="w-full md:w-3/5 lg:1/2">
                            <div>
                                <h2 title={orderResponse && orderResponse.id} className="text-dark-color text-lg font-medium">
                                    {orderResponse ? 'Pedido#' + orderResponse.id.substring(0, 6) : 'Cliente'}
                                </h2>
                                <div className="mt-6 flex gap-6 flex-col lg:flex-row">
                                    {selectedUser ?
                                        <div className="flex gap-2 justify-between w-full">
                                            <div className="flex flex-col gap-2">
                                                <span className="flex gap-2">
                                                    <p className="text-secondary text-sm font-semibold">
                                                        Nome:
                                                    </p>
                                                    <p className="text-secondary text-sm">
                                                        {selectedUser.name}
                                                    </p>
                                                </span>
                                                <span className="flex gap-2">
                                                    <p className="text-secondary text-sm font-semibold">
                                                        Documento:
                                                    </p>
                                                    <p className="text-secondary text-sm">
                                                        {selectedUser.document}
                                                    </p>
                                                </span>
                                            </div>
                                            {!orderResponse &&
                                                <button title="Trocar cliente" onClick={() => setSelectedUser(undefined)} >
                                                    <UnknownUserIcon fill="#b94848" />
                                                </button>
                                            }
                                        </div>
                                        :
                                        <>
                                            <span className="flex w-full gap-6">
                                                <span className="flex w-full lg:max-w-40">
                                                    <Button icon={<FindUserIcon fill="#FFF" />} text="Buscar"
                                                        className="border bg-tertiary text-white"
                                                        onClick={() => setShowFindUser(true)} />
                                                </span>
                                                <span className="flex w-full lg:max-w-50">
                                                    <Button icon={<NewUserIcon fill="#FFF" />} text="Cadastrar"
                                                        className="border bg-tertiary text-white"
                                                        onClick={() => setShowRegisterUser(true)} />
                                                </span>
                                            </span>
                                            <span className="flex w-full lg:max-w-52">
                                                <Button icon={<UnknownUserIcon fill="#FFF" />} text="Não identificar"
                                                    onClick={() => setSelectedUser(defaultUser)} />
                                            </span>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-dark-color text-lg font-medium">
                                    Produtos
                                </h2>
                                <div className="w-full p-6 mt-6 flex flex-col gap-6 justify-cente items-center bg-white rounded-2xl shadow-lg">
                                    <span className="w-full flex flex-col justify-center items-center gap-2">
                                        <ShoppingCartIcon />
                                        {ordertems && ordertems.length ?
                                            <div className="flex flex-col gap-2 w-full justify-center mt-2">
                                                <div className="flex w-full">
                                                    <p className="w-full text-sm text-secondary">
                                                        Nome
                                                    </p>
                                                    <p className="w-full text-sm text-center text-secondary">
                                                        Quantidade
                                                    </p>
                                                    <p className="w-full text-sm text-right text-secondary">
                                                        Valor
                                                    </p>
                                                    <p className="w-full text-sm text-right text-secondary">
                                                        Total
                                                    </p>
                                                </div>
                                                {ordertems.map(item => (
                                                    <div key={item.procuct.id} className="flex w-full justify-end">
                                                        <p className="w-full text-sm text-secondary">
                                                            {item.procuct.name}
                                                        </p>
                                                        <p className="w-full text-sm text-center text-secondary">
                                                            {item.quantity}
                                                        </p>
                                                        <p className="w-full text-sm text-right text-secondary">
                                                            {formatMoneyWithSign(item.procuct.sellingPrice)}
                                                        </p>
                                                        <p className="w-full text-sm text-right text-secondary">
                                                            {formatMoneyWithSign(item.quantity * item.procuct.sellingPrice)}
                                                        </p>
                                                    </div>
                                                ))}
                                                <div className="h-0.5 y-4 w-full bg-primary md:block" />
                                                <span className="w-full flex justify-between">
                                                    <p className="whitespace-nowrap text-sm text-right text-secondary">
                                                        Sub-Total
                                                    </p>
                                                    <p className="w-full text-sm text-right text-secondary">
                                                        {formatMoneyWithSign(totalOrderValue ?? 0)}
                                                    </p>
                                                </span>
                                            </div>
                                            :
                                            <>
                                                <p className="text-secondary text-sm">
                                                    Nenhum produto selecionado
                                                </p>
                                                <p className="text-secondary text-xs">
                                                    Adicione um produto ao pedido
                                                </p>
                                            </>
                                        }
                                    </span>
                                    {!orderResponse &&
                                        <span className="w-52">
                                            <Button icon={<PlusIcon fill="#245F40" />} text="Adicionar produto"
                                                className="text-secondary underline"
                                                onClick={() => setShowProducts(true)} />
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden h-3/4 w-0.5 bg-primary md:block" />
                        <div className="h-[65%] md:w-2/5 xl:w-full flex flex-col">
                            <h2 className="text-dark-color text-lg font-medium">
                                Pagamentos
                            </h2>
                            <div className="flex flex-col mt-8">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    {orderResponse ?
                                        <div className="flex flex-col gap-2">
                                            <span className="flex gap-2">
                                                <p className="text-secondary text-sm font-semibold">
                                                    Forma:
                                                </p>
                                                <p className="text-secondary text-sm">
                                                    {paymentType}
                                                </p>
                                            </span>
                                            <span className="flex gap-2">
                                                <p className="text-secondary text-sm font-semibold">
                                                    Parcelamento:
                                                </p>
                                                <p className="text-secondary text-sm">
                                                    {installment}
                                                </p>
                                            </span>
                                        </div>
                                        :
                                        <>
                                            <span className="w-full lg:max-w-64">
                                                <DefaultSelectOne handleSelect={val => setPaymentType(findEnumByValue(EnumPaymentType, val))}
                                                    inputHeaderText="Forma de pagamento" optionValue={paymentType ?? "Selecione"}
                                                    options={[EnumPaymentType.CREDIT_CARD, EnumPaymentType.DEBIT_CARD]} />
                                            </span>
                                            <span className="w-full lg:max-w-32">
                                                <DefaultSelectOne handleSelect={val => setInstallment(val)}
                                                    inputHeaderText="Parcelamento"
                                                    optionValue={!equalsEnum(paymentType, EnumPaymentType.CREDIT_CARD) ? "Selecione" : installment ?? "Selecione"}
                                                    disabled={!equalsEnum(paymentType, EnumPaymentType.CREDIT_CARD)}
                                                    options={["x1", "x2", "x3", "x4"]} />
                                            </span>
                                        </>
                                    }
                                </div>
                                {orderResponse &&
                                    <div className="mt-8 mb-8 md:mb-0">
                                        <h2 className="text-dark-color text-lg font-medium">
                                            Pagamentos
                                        </h2>
                                        <span className="flex gap-2 mt-6 items-center">
                                            <p className="text-secondary text-sm font-semibold">
                                                Status:
                                            </p>
                                            <p className="text-secondary text-sm">
                                                {orderResponse.status}
                                            </p>
                                            <div className={`w-3 h-3 rounded-full ${isPaid ? 'bg-primary' : 'bg-yellow-400'}`} />
                                        </span>
                                    </div>
                                }
                                {!orderResponse &&
                                    <span className="xl:w-[402px] flex justify-end mt-2">
                                        <span className="w-60 -mr-2.5">
                                            <Button icon={<PriceChangeIcon fill="#245F40" />} text="Acréscimos e Descontos"
                                                className="text-secondary underline"
                                                onClick={() => setShowAdditionDiscount(true)} />
                                        </span>
                                    </span>
                                }
                            </div>
                            {orderValue > 0 &&
                                <div className="mt-auto">
                                    <div className="h-0.5 y-4 w-full xl:w-[400px] bg-primary md:block" />
                                    <span className="w-full flex justify-between xl:w-[400px] mt-6">
                                        <p className="whitespace-nowrap text-right text-secondary">
                                            Descontos
                                        </p>
                                        <p className="w-full text-lg text-right text-red-color">
                                            -{formatCurrency(increaseDiscount.discount, true)}
                                        </p>
                                    </span>
                                    <span className="w-full flex justify-between xl:w-[400px] mt-2">
                                        <p className="whitespace-nowrap text-right text-secondary">
                                            Acréscimos
                                        </p>
                                        <p className="w-full text-lg text-right text-secondary">
                                            {formatCurrency(increaseDiscount.addition, true)}
                                        </p>
                                    </span>
                                    <span className="w-full flex justify-between xl:w-[400px] mt-2">
                                        <p className="whitespace-nowrap text-lg text-right text-secondary">
                                            Total
                                        </p>
                                        <p className="w-full text-2xl text-right text-secondary">
                                            {formatMoneyWithSign(orderValue)}
                                        </p>
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="w-full h-10 flex mt-10 md:mt-auto justify-end gap-4">
                        {orderResponse && !isPaid && orderResponse.status == "AGUARDANDO PAGAMENTO" &&
                            <span className="w-full md:w-48">
                                <Button text={"Desistir pagamento"} className="bg-orange-300 text-white" onClick={handleWaive} />
                            </span>
                        }
                        {orderResponse && isPaid &&
                            <span className="w-full md:w-32">
                                <Button text={"Estornar"} className="bg-red-color text-white" onClick={handleCancelOrder} />
                            </span>
                        }
                        {!orderResponse &&
                            <span className="w-full md:w-40">
                                <Button disabled={isNullOrUndefined(selectedUser)
                                    || isNullOrEmpty(selectedProducts) || isNullOrEmpty(paymentType)
                                    || (equalsEnum(paymentType, EnumPaymentType.CREDIT_CARD) && isNullOrUndefined(installment))}
                                    text={"Realizar pedido"}
                                    onClick={handleCreateOrder} />
                            </span>
                        }
                        {orderResponse && (isPaid || orderResponse.status == "PAGAMENTO ESTORNADO" || orderResponse.status == "DESISTÊNCIA PAGAMENTO" ) &&
                            <span className="w-full md:w-48">
                                <Button text={"Novo Pedido"} onClick={handleStartNewOrder} />
                            </span>
                        }
                    </div>
                </div>
                {showFindUser &&
                    <DefaultDialog dialogTitle="Selecionar cliente" className="h-3/5 md:h-fit min-h-[480px]" handleClose={() => setShowFindUser(false)}>
                        <div className="flex h-full flex-col gap-6">
                            <div className="relative">
                                <span className="absolute top-2.5 left-3">
                                    <SearchIcon />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Pesquisar por nome ou CPF"
                                    className="w-full pl-10 pr-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                />
                            </div>

                            <p className="text-center text-sm text-secondary">Clique no cliente para selecioná-lo</p>

                            <div className="h-[70%] md:max-h-64 md:mt-4 overflow-y-auto space-y-4 md:pb-2">
                                {filteredClients.map((client, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedUser(client);

                                            setShowFindUser(false);
                                        }}
                                        className="flex w-full text-left justify-between p-4 bg-gray-50
                                            rounded-2xl shadow-lg hover:bg-gray-100 transition"
                                    >
                                        <span>
                                            <p className="text-secondary">Nome</p>
                                            <p className="text-sm text-secondary mt-2">{client.name}</p>
                                        </span>
                                        <span>
                                            <p className="text-secondary">Documento</p>
                                            <p className="text-sm text-secondary mt-2">{client.document}</p>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </DefaultDialog>
                }
                {showRegisterUser &&
                    <DefaultDialog dialogTitle="Cadastrar novo cliente" className="h-fit" handleClose={() => setShowRegisterUser(false)}>
                        <div className="flex flex-col gap-6">
                            <CustomInput id="name" value={newUser?.name ?? ""}
                                inputHeaderText="Nome" onChange={e => handleChange(e, setNewUser)} />
                            <CustomInput id="email" value={newUser?.email ?? ""}
                                inputHeaderText="E-mail" onChange={e => handleChange(e, setNewUser)} />
                            <CustomInput id="document" value={newUser?.document ?? ""}
                                inputHeaderText="Documento" onChange={e => handleChange(e, setNewUser)} />
                            <CustomInput id="phone" type="tel" maxLength={15}
                                value={formatPhoneInput(newUser?.phone ?? "")}
                                invalid={newUser?.phone ? !validatePhone(newUser?.phone) : false}
                                inputHeaderText="Telefone" onChange={e => handleChange(e, setNewUser)} />
                            <span className="mt-6">
                                <Button onClick={() => {
                                    setSelectedUser(newUser);
                                    setNewUser(undefined);

                                    setShowRegisterUser(false);
                                }} text="Cadastrar" disabled={isNullOrEmpty(newUser?.name) || isNullOrEmpty(newUser?.document)} />
                            </span>
                        </div>
                    </DefaultDialog>
                }
                {showProducts &&
                    <DefaultDialog dialogTitle="Adicionar produto" className="h-fit md:w-[60%] lg:w-[80%] xl:w-[60%]" handleClose={() => setShowProducts(false)}>
                        <div className="flex flex-col gap-6">
                            <div className="relative flex gap-4 justify-between">
                                <span className="w-1/2">
                                    <span className="absolute top-2.5 left-3">
                                        <SearchIcon />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Pesquisar por nome"
                                        className="w-full pl-10 pr-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary"
                                        value={userSearch}
                                        onChange={(e) => setUserSearch(e.target.value)}
                                    />
                                </span>
                                <span className="w-1/4">
                                    <Button onClick={() => {
                                        setOrderItems(selectedProducts);

                                        setShowProducts(false);
                                    }} text="Continuar" disabled={!containsUpdatedItens} />
                                </span>
                            </div>
                            <div className="h-[400px] overflow-y-auto flex flex-row flex-wrap gap-4">
                                {filteredProducts.map((item) => (
                                    <div key={item.procuct.id} className="flex gap-4 w-full h-36 lg:w-[48%] p-6 bg-white rounded-2xl shadow-lg">
                                        <div className="flex w-full justify-between">
                                            <span className="flex flex-col">
                                                <span className="w-20">
                                                    <Image src={item.procuct.imageUrl ?? ""} alt={item.procuct.name}
                                                        width={58} height={40} />
                                                </span>
                                                <p className="text-sm mt-auto text-secondary whitespace-nowrap">
                                                    {item.procuct.name}
                                                </p>
                                            </span>
                                            <span className="w-full flex flex-col gap-4 items-center">
                                                <p className="text-base text-secondary">
                                                    Valor
                                                </p>
                                                <p className="text-sm text-secondary mt-auto">
                                                    {formatMoneyWithSign(item.procuct.sellingPrice)}
                                                </p>
                                            </span>
                                            <span className="w-full flex flex-col gap-4 items-center">
                                                <p className="text-base text-secondary">
                                                    Estoque
                                                </p>
                                                <p className="text-sm text-secondary mt-auto">
                                                    {item.procuct.stock}
                                                </p>
                                            </span>
                                            <span className="w-full flex flex-col gap-4 items-center">
                                                <p className="text-base text-secondary">
                                                    Qtd
                                                </p>
                                                <p className="text-sm text-secondary mt-auto">
                                                    {item.quantity}
                                                </p>
                                            </span>
                                            <div className="flex flex-col gap-2">
                                                <button className="w-full h-12 bg-primary rounded-md"
                                                    onClick={() => (item.quantity + 1) <= item.procuct.stock && updateProductQuantity(item.procuct.id, item.quantity + 1)}>
                                                    <PlusIcon width={48} size={48} />
                                                </button>
                                                <button className="w-full h-12 bg-red-300 rounded-md"
                                                    onClick={() => item.quantity > 0 && updateProductQuantity(item.procuct.id, item.quantity - 1)} >
                                                    <MinusIcon width={48} size={48} />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </DefaultDialog>
                }
                {showAdditionDiscount &&
                    <DefaultDialog dialogTitle="Acréscimos e descontos" className="h-fit" handleClose={() => setShowAdditionDiscount(false)}>
                        <div className="flex flex-col gap-6">
                            <CustomInput id="addition" value={formatCurrency(increaseDiscount.addition, true)}
                                inputHeaderText="Valor acréscimo" onChange={e => handleCurrencyChange(e, setIncreaseDiscount)} />
                            <CustomInput id="discount" value={formatCurrency(increaseDiscount.discount, true)}
                                inputHeaderText="Valor desconto" onChange={e => handleCurrencyChange(e, setIncreaseDiscount)} />
                            <span className="mt-6">
                                <Button onClick={() => setShowAdditionDiscount(false)} text="Adicionar" />
                            </span>
                        </div>
                    </DefaultDialog>
                }
                {showWaitingPayment &&
                    <DefaultDialog dialogTitle="Aguardando pagamento" className="h-fit" handleClose={() => setShowWaitingPayment(false)}>
                        <div className="flex flex-col gap-4">
                            <div className="w-40 self-center">
                                <Lottie animationData={posAnimation} loop={true} />
                            </div>
                            <p className="w-5/6 text-center text-sm text-secondary self-center">
                                Realize o processo de pagamento na maquininha, após isso seu pedido será confirmado automaticamente😄
                            </p>
                            <p className="text-center text-sm text-secondary">
                                Aguardando pagamento
                            </p>
                            <div className="self-center" role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        </div>
                    </DefaultDialog>
                }
            </DefaultScreenLayout>
        </>
    );
}