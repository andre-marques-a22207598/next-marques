// Componente executa no cliente (usa hooks e localStorage)
"use client"

import { useEffect, useState } from "react"
import { Produto } from "@/models/interfaces" // Interface que define estrutura de Produto

// Interface TypeScript que define as props que este componente recebe
interface PesquisaProps {
    produtos: Produto[]                        // Array de todos os produtos disponíveis
    onFiltrar: (produtos: Produto[]) => void  // Callback para retornar produtos filtrados ao componente pai
}

// Componente recebe produtos e função callback como props (destructuring)
export default function Pesquisa({produtos, onFiltrar}: PesquisaProps) {
    // Estado para categoria selecionada no select
    // Usa "lazy initialization" - função arrow que executa APENAS na primeira renderização
    // Tenta carregar valor salvo do localStorage, senão inicia com string vazia
    const [tipoCategoria, setTipoCategoria] = useState<string>(() => {
        const tipoCategoriaStored = localStorage.getItem('tipoCategoria')
        return tipoCategoriaStored ? JSON.parse(tipoCategoriaStored) : ""
    })
    
    // Estado para texto de pesquisa no input
    // Também usa lazy initialization para carregar do localStorage
    const [pesquisa, setPesquisa] = useState<string>(() => {
        const pesquisaStored = localStorage.getItem('pesquisa')
        return pesquisaStored ? JSON.parse(pesquisaStored) : ''
    })

    // Função que filtra produtos por texto (pesquisa por nome)
    function pesquisar(texto: string) {
        // Filter cria novo array com produtos cujo título contém o texto
        // toLowerCase() faz pesquisa case-insensitive (ignora maiúsculas/minúsculas)
        // includes() verifica se o texto está contido no título
        const produtosFiltrados = produtos.filter((produto) =>
            produto.title.toLowerCase().includes(texto.toLowerCase())
        )

        setPesquisa(texto) // Atualiza estado local
        onFiltrar(produtosFiltrados) // Envia resultado filtrado para componente pai
    }

    // Função que filtra produtos por categoria
    function filtrar(categoria: string) {
        // Se selecionou "tudo", retorna todos os produtos sem filtro
        if (categoria === "tudo") {
            onFiltrar(produtos)
            setTipoCategoria(categoria)
            return // Sai da função aqui
        }

        // Filter cria array apenas com produtos da categoria selecionada
        const filtro = produtos.filter((produto) => 
            produto.category === categoria
        );

        setTipoCategoria(categoria) // Atualiza estado
        onFiltrar(filtro) // Envia produtos filtrados para pai
    }
    
    // useEffect que salva pesquisa no localStorage sempre que muda
    useEffect(() => {
        localStorage.setItem('pesquisa', JSON.stringify(pesquisa))
    }, [pesquisa]) // Dependência: executa quando pesquisa muda
    
    // useEffect que salva categoria no localStorage sempre que muda
    useEffect(() => {
        localStorage.setItem('tipoCategoria', JSON.stringify(tipoCategoria))
    }, [tipoCategoria]) // Dependência: executa quando tipoCategoria muda

    return (
        // Container flexbox que organiza barra de pesquisa e filtro
        // justify-between: espaça elementos nas extremidades
        // items-center: alinha verticalmente ao centro
        <div className="flex justify-between items-center">
            {/* Seção da barra de pesquisa (esquerda) */}
            <div className="flex items-center">
                {/* Ícone SVG de lupa (Google Material Icons) */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" className="mr-[5px]">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
                
                {/* Input de texto para pesquisa
                    - value={pesquisa}: valor controlado pelo estado
                    - onChange: chama pesquisar() sempre que texto muda
                    - maxLength: limite de 50 caracteres */}
                <input 
                    type="text" 
                    value={pesquisa} 
                    onChange={(e) => pesquisar(e.target.value)} 
                    maxLength={50} 
                    placeholder="Clique para pesquisar" 
                    className="w-[400px] px-[5px] py-[5px] rounded-[4px] bg-pink-300"
                />
            </div>

            {/* Seção do filtro por categoria (direita) */}
            <div className="flex flex-col text-center">
                {/* Label "Filtrar" com ícone */}
                <div className="flex gap-x-[5px] items-center">
                    <span className="italic">Filtrar</span>
                    {/* Ícone SVG de filtro (três linhas horizontais) */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000">
                        <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/>
                    </svg>
                </div>
                
                {/* Select dropdown para escolher categoria
                    - value={tipoCategoria}: valor controlado pelo estado
                    - onChange: chama filtrar() quando muda seleção */}
                <select value={tipoCategoria} onChange={(e) => filtrar(e.target.value)}>
                    <option value="tudo">- - -</option>        {/* Opção padrão = sem filtro */}
                    <option value="T-shirts">Camisas</option>
                    <option value="Meias">Meias</option>
                    <option value="Canecas">Canecas</option>
                </select>
            </div>
        </div>
    )
}