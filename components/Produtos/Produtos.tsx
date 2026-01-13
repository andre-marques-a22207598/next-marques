// Componente executa no cliente (usa hooks e localStorage)
"use client"

import useSWR from "swr"
import { useEffect, useState } from "react"
import { Produto } from "@/models/interfaces" // Interface TypeScript que define estrutura de Produto
import Link from "next/link"
import Pesquisa from "./Pesquisa" // Componente de pesquisa/filtro
import Card from "./Card" // Componente que renderiza cada produto

// Constantes com URLs da API
const url_api = "https://deisishop.pythonanywhere.com"
const url_api_produtos = `${url_api}/products/` // URL completa para buscar produtos

// Função fetcher para useSWR - faz fetch e converte para JSON
const fetcher = async (url: string) => fetch(url).then(res => res.json())

export default function Produtos() {
    // useSWR faz o fetch automático dos produtos com cache e revalidação
    // Retorna: data (produtos), error (se houver erro), isLoading (estado de carregamento)
    const { data, error, isLoading } = useSWR<Produto[]>(url_api_produtos, fetcher)

    // Estado para armazenar produtos no carrinho de compras
    const [carrinho, setCarrinho] = useState<Produto[]>([])
    
    // Estado para produtos filtrados pela pesquisa
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])

    // Cria cópia do array de produtos (se data existir, senão array vazio)
    // Spread operator [...data] cria novo array
    const produtos = data ? [...data] : []

    // useEffect que executa UMA VEZ após montar ([] = sem dependências)
    // Carrega dados do localStorage (carrinho e filtros salvos)
    useEffect(() => {
        const carrinhoStored = localStorage.getItem("carrinho")
        if (carrinhoStored) {
            setCarrinho(JSON.parse(carrinhoStored)) // Converte string JSON para array
        }

        const produtosFiltradosStored = localStorage.getItem("produtosFiltrados")
        if (produtosFiltradosStored) {
            setProdutosFiltrados(JSON.parse(produtosFiltradosStored))
        }
    }, [])

    // useEffect que executa sempre que carrinho muda
    // Salva carrinho no localStorage
    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }, [carrinho]) // Dependência: executa quando carrinho muda

    // useEffect que executa sempre que produtosFiltrados muda
    // Salva filtros no localStorage
    useEffect(() => {
        localStorage.setItem("produtosFiltrados", JSON.stringify(produtosFiltrados))
    }, [produtosFiltrados]) // Dependência: executa quando produtosFiltrados muda

    // Renderização condicional - mostra mensagens de erro/loading
    if (error) return <p>Erro ao carregar</p>
    if (isLoading) return <p>Carregando...</p>
    if (!data) return <p>Dados inexistente</p>

    return (
        // Container principal com posição relativa (para posicionar ícone do carrinho)
        <div className="relative">
            {/* Seção do componente de Pesquisa
                - Recebe todos os produtos e função callback para atualizar filtros */}
            <section>
                <Pesquisa 
                    produtos={produtos}           // Passa todos os produtos
                    onFiltrar={setProdutosFiltrados} // Callback que atualiza produtosFiltrados
                />
            </section>

            {/* Ícone do carrinho de compras (posicionado absolutamente)
                - absolute: posição absoluta em relação ao parent (div com relative)
                - top-[-70px]: 70px acima (negativo = para cima) */}
            <section className="absolute top-[-70px]">
                {/* Link para página do carrinho */}
                <Link href="/produtos/carrinho" className="flex flex-col items-center w-fit">
                    {/* Ícone SVG do carrinho (Google Material Icons) */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M221-120q-27 0-48-16.5T144-179L42-549q-5-19 6.5-35T80-600h190l176-262q5-8 14-13t19-5q10 0 19 5t14 13l176 262h192q20 0 31.5 16t6.5 35L816-179q-8 26-29 42.5T739-120H221Zm-1-80h520l88-320H132l88 320Zm260-80q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM367-600h225L479-768 367-600Zm113 240Z"/>
                    </svg>
                    {/* Badge com número de itens no carrinho */}
                    <span className="text-[.9em]">
                        {carrinho.length}
                    </span>
                </Link>
            </section>

            {/* Seção que renderiza a grid de produtos
                - flex-wrap: permite quebra de linha
                - justify-center: centraliza horizontalmente
                - gap-x/gap-y: espaçamentos horizontal e vertical
                - my-[60px]: margin vertical de 60px */}
            <section className="flex justify-center flex-wrap gap-x-[15px] gap-y-[30px] my-[60px]">
                {/* Mapeia produtos filtrados para criar um Card para cada um */}
                {produtosFiltrados.map((produto, index) => (
                    <Card
                        key={`produto-${index}`}        // Key única
                        produto={produto}                // Dados do produto
                        url_api={url_api}               // URL base da API (para imagens)
                        index={index}                    // Índice do produto
                        vaiAdicionar={true}             // Flag que indica se é para mostrar botão de adicionar
                        carrinho={carrinho}             // Estado atual do carrinho
                        onAlterarCarrinho={setCarrinho} // Callback para modificar carrinho
                    />
                ))}
            </section>
        </div>
    )
}