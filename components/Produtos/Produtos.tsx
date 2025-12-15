"use client"

import useSWR from "swr"
import { useEffect, useState } from "react"
import { Produto } from "@/models/interfaces"
import Link from "next/link"
import Pesquisa from "./Pesquisa"
import Card from "./Card"
import Navegar from "@/components/Produtos/Navegar"

const url_api = "https://deisishop.pythonanywhere.com"
const url_api_produtos = `${url_api}/products/`
const fetcher = async (url: string) => fetch(url).then(res => res.json())

export default function Produtos() {
    const { data, error, isLoading } = useSWR<Produto[]>(url_api_produtos, fetcher)

    const [carrinho, setCarrinho] = useState<Produto[]>([])
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])

    const produtos = data ? [...data] : []

    // Carregar do localStorage (apenas no browser)
    useEffect(() => {
        const carrinhoStored = localStorage.getItem("carrinho")
        if (carrinhoStored) {
            setCarrinho(JSON.parse(carrinhoStored))
        }

        const produtosFiltradosStored = localStorage.getItem("produtosFiltrados")
        if (produtosFiltradosStored) {
            setProdutosFiltrados(JSON.parse(produtosFiltradosStored))
        }
    }, [])

    // Persistir alterações
    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }, [carrinho])

    useEffect(() => {
        localStorage.setItem("produtosFiltrados", JSON.stringify(produtosFiltrados))
    }, [produtosFiltrados])

    if (error) return <p>Erro ao carregar</p>
    if (isLoading) return <p>Carregando...</p>
    if (!data) return <p>Dados inexistente</p>

    return (
        <div className="relative">
            <section>
                <Pesquisa produtos={produtos} onFiltrar={setProdutosFiltrados} />
            </section>

            <section className="absolute top-[-70px] right-[10px]">
                <Link href="/produtos/carrinho" className="flex flex-col items-center w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M221-120q-27 0-48-16.5T144-179L42-549q-5-19 6.5-35T80-600h190l176-262q5-8 14-13t19-5q10 0 19 5t14 13l176 262h192q20 0 31.5 16t6.5 35L816-179q-8 26-29 42.5T739-120H221Zm-1-80h520l88-320H132l88 320Zm260-80q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM367-600h225L479-768 367-600Zm113 240Z"/>
                    </svg>
                    <span className="text-[.9em]">
                        {carrinho.length}
                    </span>
                </Link>
            </section>

            <section className="flex justify-center flex-wrap gap-x-[15px] gap-y-[30px] my-[60px]">
                {produtosFiltrados.map((produto, index) => (
                    <Card
                        key={`produto-${index}`}
                        produto={produto}
                        url_api={url_api}
                        index={index}
                        vaiAdicionar={true}
                        carrinho={carrinho}
                        onAlterarCarrinho={setCarrinho}
                    />
                ))}
            </section>

            <section>
                <Navegar produtos={produtos} onFiltrar={setProdutosFiltrados} />
            </section>
        </div>
    )
}
