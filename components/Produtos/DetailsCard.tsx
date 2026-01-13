"use client"

import { useParams } from "next/navigation"  // Hook para acessar parâmetros da URL (route params)
import useSWR from "swr"                      // Hook para data fetching com cache
import Image from "next/image"                 // Componente otimizado de imagem do Next.js
import Link from "next/link"                   // Componente de link do Next.js
import { Produto } from "@/models/interfaces"  // Interface TypeScript de Produto
import { useEffect, useState } from "react"    // Hooks do React

// Função fetcher para useSWR - faz fetch e converte para JSON
const fetcher = async (url: string) => fetch(url).then(res => res.json())

export default function DetailsCard() {
    // useParams() acessa parâmetros dinâmicos da rota
    // Ex: Se rota é /produtos/[produto], e URL é /produtos/5, params.produto = "5"
    const params = useParams()
    
    // Converte parâmetro de string para número e adiciona 1
    // (Provavelmente porque índice do array começa em 0, mas API usa IDs começando em 1)
    const index = Number(params.produto) + 1
    
    // URLs da API
    const url = 'https://deisishop.pythonanywhere.com'
    const url_produto = `${url}/products/${index}` // URL específica do produto

    // useSWR faz fetch do produto específico
    // <Produto> indica que esperamos receber um único objeto Produto (não array)
    const {data, error, isLoading} = useSWR<Produto>(url_produto, fetcher)

    // Estado para gerenciar o carrinho de compras
    const [carrinho, setCarrinho] = useState<Produto[]>([])
    
    // Estado para controlar se produto foi adicionado (feedback visual)
    const [adicionado, setAdicionado] = useState<boolean>(false)

    // useEffect que carrega carrinho do localStorage quando componente monta
    useEffect(() => {
        const carrinhoStored = localStorage.getItem("carrinho")
        if (carrinhoStored) {
            setCarrinho(JSON.parse(carrinhoStored))
        }
    }, [])

    // useEffect que salva carrinho no localStorage sempre que muda
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
        }
    }, [carrinho])

    // Função que adiciona produto ao carrinho
    function adicionarAoCarrinho() {
        if (!data) return // Não faz nada se não há dados do produto

        // Adiciona produto ao array do carrinho (spread operator mantém produtos anteriores)
        setCarrinho([...carrinho, data])
        
        // Ativa feedback visual
        setAdicionado(true)
        
        // Remove feedback após 2 segundos
        setTimeout(() => {
            setAdicionado(false)
        }, 2000)
    }

    // Renderização condicional - estados de erro/loading/sem dados
    if (error) return <p>Erro ao carregar</p>;
    if (isLoading) 
        return (
            <>
                <p>
                    Carregando...
                </p>
            </>
        );
    if (!data) return <p>Dados inexistente</p>;

    return (
        <div>
            {/* Link para voltar à página de produtos
                - block: display block para ocupar linha inteira
                - hover:bg-blue-500: muda cor ao passar rato */}
            <Link href='/produtos' className="block py-[13px] mb-[30px] rounded-[10px] bg-blue-600 text-center hover:bg-blue-500">
                Voltar a ver os produtos
            </Link>

            {/* Título do produto - centralizado, negrito, tamanho 2em */}
            <h2 className="font-bold text-[2em] text-center">
                { data.title }
            </h2>

            {/* Categoria do produto - centralizado */}
            <p className="text-center">
                { data.category }
            </p>

            {/* Container da imagem
                - relative: necessário para Image com fill
                - fill: imagem preenche container mantendo aspect ratio
                - objectFit: 'contain': imagem inteira visível sem crop */}
            <figure className="relative flex items-center w-full h-[250px] my-[30px]">
                <Image 
                    src={`${data.image}`}                           // URL da imagem
                    alt={`Imagem do produto '${data.title}'`}      // Texto alternativo (acessibilidade)
                    fill                                            // Preenche o container pai
                    style={{objectFit: 'contain'}}                 // Mantém proporções
                />
            </figure>

            {/* Descrição do produto
                - indent-[20px]: primeira linha indentada 20px */}
            <p className="my-[30px] indent-[20px]">
                { data.description }
            </p>

            {/* Container flexbox com 2 seções: avaliação (esquerda) e preço (direita)
                - gap-x-[20px]: espaço horizontal entre as duas divs */}
            <div className="flex gap-x-[20px] w-full">
                {/* Seção de Avaliação/Rating (50% da largura) */}
                <div className="flex flex-col gap-y-[15px] w-[50%] p-[10px] rounded-[7px] bg-gray-100">
                    <span>
                        Nota do público:
                    </span> 
                    
                    {/* Container que mostra rating numérico + ícone estrela */}
                    <span className="flex justify-center items-center">
                        {/* Nota em tamanho grande */}
                        <span className="text-[2em]">
                            { data.rating.rate }
                        </span>
                        {/* Ícone SVG de estrela (Google Material Icons) */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
                            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                        </svg>
                    </span>
                    
                    {/* Texto mostrando número de avaliações */}
                    <p>
                        Mais de { data.rating.count } avaliaram esse produto.
                    </p>
                </div>
                
                {/* Seção de Preço e Botão (50% da largura)
                    - justify-between: espaça conteúdo verticalmente (preço no topo, botão no fundo) */}
                <div className="flex flex-col justify-between w-[50%] p-[10px] rounded-[7px] bg-gray-100">     
                    {/* Container do preço */}
                    <div className="flex flex-col">
                        <span>
                            Preço
                        </span>
                        {/* Preço em tamanho grande
                            - Number(data.price).toFixed(2): garante 2 casas decimais
                            - Adiciona símbolo € */}
                        <span className="text-[2em]">
                            { Number(data.price).toFixed(2) } €
                        </span>
                    </div>

                    {/* Botão para adicionar ao carrinho
                        - onClick chama função adicionarAoCarrinho
                        - Muda cor e texto quando produto é adicionado (feedback visual)
                        - transition: anima mudanças de cor suavemente */}
                    <button 
                        onClick={adicionarAoCarrinho}
                        className={`py-[7px] rounded-[4px] transition ${
                            adicionado 
                                ? 'bg-green-500 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {adicionado ? '✓ Adicionado!' : 'Adicionar ao Cesto'}
                    </button>
                </div>
            </div>
        </div>
    )
}