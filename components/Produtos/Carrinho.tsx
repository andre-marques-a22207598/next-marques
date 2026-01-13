"use client"

import { Produto } from "@/models/interfaces"
import { useEffect, useState } from "react"
import Card from "./Card"

const url_api = "https://deisishop.pythonanywhere.com"

export default function Carrinho() {
    const [carrinho, setCarrinho] = useState<Produto[]>([])
    const [carregado, setCarregado] = useState(false) // Estado para controlar quando terminou de carregar

    // Carrega carrinho do localStorage quando componente monta
    useEffect(() => {
        const carrinhoStored = localStorage.getItem("carrinho")
        if (carrinhoStored) {
            try {
                const parsed = JSON.parse(carrinhoStored)
                setCarrinho(parsed)
            } catch (error) {
                console.error("Erro ao carregar carrinho:", error)
            }
        }
        setCarregado(true) // Marca como carregado mesmo se estiver vazio
    }, [])

    // Salva carrinho no localStorage quando muda
    useEffect(() => {
        if (carregado) {
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
        }
    }, [carrinho, carregado])

    // Mostra loading enquanto não carregou
    if (!carregado) {
        return <p className="text-center">A carregar carrinho...</p>
    }

    // Só mostra "vazio" DEPOIS de ter carregado
    if (carrinho.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-gray-600">O carrinho está vazio</p>
                <p className="text-gray-500 mt-2">Adicione produtos para vê-los aqui</p>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-center flex-wrap gap-x-[15px] gap-y-[30px] my-[30px]">
                {carrinho.map((produto, index) => (
                    <Card
                        key={`carrinho-${index}`}
                        produto={produto}
                        url_api={url_api}
                        index={index}
                        vaiAdicionar={false}
                        carrinho={carrinho}
                        onAlterarCarrinho={setCarrinho}
                    />
                ))}
            </div>

            <div className="mt-[40px] p-5 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Resumo do Carrinho</h3>
                <p className="text-lg">Total de produtos: <strong>{carrinho.length}</strong></p>
                <p className="text-lg">
                    Preço total: <strong>
                        {carrinho.reduce((total, produto) => total + Number(produto.price), 0).toFixed(2)} €
                    </strong>
                </p>
            </div>
        </>
    )
}