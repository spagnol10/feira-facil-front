import { useState } from "react";

export default function useDashboarProductViewModel() {
    const [selectedPeriod, setSelectedPeriod] = useState("Hoje");
    const bestProducts = [
        {
            id: 1,
            nome: "Repolho Roxo",
            qtdVendas: 79,
            valorUnitario: 3.90,
            total: 308.1,
            emEstoque: 37
        },
        {
            id: 2,
            nome: "Alface",
            qtdVendas: 87,
            valorUnitario: 2.5,
            total: 217.5,
            emEstoque: 58
        },
        {
            id: 3,
            nome: "Batata Doce - Kg",
            qtdVendas: 28,
            valorUnitario: 4.10,
            total: 114.8,
            emEstoque: 14
        },
        {
            id: 4,
            nome: "Cenoura",
            qtdVendas: 40,
            valorUnitario: 2.50,
            total: 106.10,
            emEstoque: 6
        },
        {
            id: 5,
            nome: "Couve",
            qtdVendas: 15,
            valorUnitario: 4.99,
            total: 74.85,
            emEstoque: 10
        },
    ];

    return {
        bestProducts,
        selectedPeriod,
        setSelectedPeriod
    }
}