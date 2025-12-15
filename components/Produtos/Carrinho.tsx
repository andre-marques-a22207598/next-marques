"use client"

import { Produto } from "@/models/interfaces"
import { useEffect, useState } from "react"
import Card from './Card'


const url_api = "https://deisishop.pythonanywhere.com"

export default function Carrinho() {    
    const [carrinho, setCarrinho] = useState<Produto[]>(() => {
            const carrinhoStored = localStorage.getItem('carrinho')
            return carrinhoStored ? JSON.parse(carrinhoStored) : []
    })

    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }, [carrinho])
    
    return (
        <>
            {carrinho.map((produto, index) => (
                <Card key={`carrinho-${index}`} produto={produto} url_api={url_api} index={index} vaiAdicionar={false} carrinho={carrinho} onAlterarCarrinho={setCarrinho}/>
            ))}
        </>
    )
}