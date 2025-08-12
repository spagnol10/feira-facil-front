import { useEffect } from "react";
import DashboardCard from "../components/dashboardcard";
import DashboardBestProducts from "../components/dashboardproducts/view";
import DashboardSale from "../components/dashboardsale/view";
import DefaultHeaderTitle from "../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../components/standard/DefaultScreenLayout";
import Header from "../components/standard/Header";
import { useAppContext } from "../context/appContext";
import { EnumScreen } from "../utils/types";
import { decryptStrData } from "../utils/util";
import useMiddleware from "../viewmodel/middleware";

export default function Home() {
    const { isAuth, verifyUserAuth } = useMiddleware();
    const { user } = useAppContext();

    useEffect(() => {
        (async () => verifyUserAuth())();
    }, []);

    return (
        isAuth &&
        <>
            <Header title="FeiraFácil" content="Toda sua feira em um só lugar!" />
            <DefaultScreenLayout screen={EnumScreen.HOME} >
                <DefaultHeaderTitle title={`Olá, ${decryptStrData(user?.name)}`}
                    content="Isso é o que está ocorrendo na sua empresa" />
                <div className="grid grid-flow-col gap-6 mb-8 grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 xl:grid-rows-1 xl:grid-cols-4">
                    <DashboardCard
                        variant
                        percentage={2.98}
                        amount={22543.70}
                        positiveTrending
                        title="Total Vendas - Mês"
                    />
                    <DashboardCard
                        amount={14380.40}
                        percentage={5.34}
                        positiveTrending
                        title="Total Líquido - Mês"
                    />
                    <DashboardCard
                        variant
                        amount={1624.15}
                        percentage={0.89}
                        title="Total Vendas - Dia"
                    />
                    <DashboardCard
                        amount={898.45}
                        percentage={0.89}
                        positiveTrending
                        title="Total Líquido - Dia"
                    />
                </div>
                <DashboardSale />
                <DashboardBestProducts />
            </DefaultScreenLayout>
        </>
    )
}
