import { useState } from "react";

export default function useDashboarSaleViewModel() {
    const [selectedPeriod, setSelectedPeriod] = useState("Últ. 8 meses");
    const sales = [
        {
            mes: "Jan",
            total: 25000.00,
            liquido: 20000.00
        },
        {
            mes: "Fev",
            total: 70000.00,
            liquido: 65000.00
        },
        {
            mes: "Mar",
            total: 30000.00,
            liquido: 25000.00
        },
        {
            mes: "Abr",
            total: 65000.00,
            liquido: 60000.00
        },
        {
            mes: "Mai",
            total: 52156.90,
            liquido: 50000.00
        },
        {
            mes: "Jun",
            total: 20000.00,
            liquido: 15000.00
        },
        {
            mes: "Jul",
            total: 35000.00,
            liquido: 30000.00
        },
        {
            mes: "Ago",
            total: 45000.00,
            liquido: 40000.00
        }
    ];

    return {
        sales,
        selectedPeriod,
        setSelectedPeriod
    }
}