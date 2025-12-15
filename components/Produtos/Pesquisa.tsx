"use client"

import { useEffect, useState } from "react"
import { Produto } from "@/models/interfaces"

interface PesquisaProps {
    produtos: Produto[]
    onFiltrar: (produtos: Produto[]) => void
}

export default function Pesquisa({produtos, onFiltrar}: PesquisaProps) {
    const [tipoCategoria, setTipoCategoria] = useState<string>(() => {
        const tipoCategoriaStored = localStorage.getItem('tipoCategoria')
        return tipoCategoriaStored ? JSON.parse(tipoCategoriaStored) : ""
    })
    const [pesquisa, setPesquisa] = useState<string>(() => {
        const pesquisaStored = localStorage.getItem('pesquisa')
        return pesquisaStored ? JSON.parse(pesquisaStored) : ''
    })

    function pesquisar(texto: string) {
        const produtosFiltrados = produtos.filter((produto) =>
            produto.title.toLowerCase().includes(texto.toLowerCase())
        )

        setPesquisa(texto)
        onFiltrar(produtosFiltrados)
    }

    function filtrar(categoria: string) {
        if (categoria === "tudo") {
            onFiltrar(produtos)
            setTipoCategoria(categoria)
            return
        }

        const filtro = produtos.filter((produto) => 
            produto.category === categoria
        );

        setTipoCategoria(categoria)
        onFiltrar(filtro)
    }
    
    useEffect(() => {
        localStorage.setItem('pesquisa', JSON.stringify(pesquisa))
    }, [pesquisa])
    useEffect(() => {
        localStorage.setItem('tipoCategoria', JSON.stringify(tipoCategoria))
    }, [tipoCategoria])

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" className="mr-[5px]"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                <input type="text" value={pesquisa} onChange={(e) => pesquisar(e.target.value)} maxLength={50} placeholder="Pesquise por produtos" className="w-[400px] px-[5px] py-[5px] rounded-[4px] bg-blue-300"/>
            </div>

            <div className="flex flex-col text-center">
                <div className="flex gap-x-[5px] items-center">
                    <span className="italic">Filtrar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
                </div>
                
                <select value={tipoCategoria} onChange={(e) => filtrar(e.target.value)}>
                    <option value="tudo">- - -</option>
                    <option value="T-shirts">Camisas</option>
                    <option value="Meias">Meias</option>
                    <option value="Canecas">Canecas</option>
                </select>
            </div>
        </div>
    )
}