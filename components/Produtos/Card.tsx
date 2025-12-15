"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Produto } from '@/models/interfaces'
//import './style.css'
import { useEffect, useState } from 'react'

interface CardProps {
    produto: Produto,
    url_api: string,
    index: number,
    vaiAdicionar: boolean,
    carrinho: Produto[],
    onAlterarCarrinho: (produto: Produto[]) => void
}


export default function Card({produto, url_api, index, vaiAdicionar, carrinho, onAlterarCarrinho}: CardProps) {  
    function adicionar(produto: Produto) {
        onAlterarCarrinho([... carrinho, produto])
    }

    function remover(pIndex: number) {
        const novoCarrinho = carrinho.filter((_, i) => i !== pIndex)
        onAlterarCarrinho(novoCarrinho)
    }

    return (
        <div className='produto cursor-pointer overflow-hidden relative'>
            <Link href={`/produtos/${produto.id-1}`} className='flex flex-col justify-center items-center w-[170px] px-[2px] border-y-[2px] border-transparent hover:border-blue-300 duration-500'>
                <h2 className='z-[2] h-[40px] font-medium text-center'>
                    {produto.title}
                </h2>
                <figure className='relative w-[120px] h-[120px] my-[10px]'>
                    <Image src={`${url_api}${produto.image}`} alt={`Imagem do produto: ${produto.title}`} fill style={{objectFit: 'contain'}}></Image>
                </figure>
                <span className='z-[1]'>
                    {Number(produto.price).toFixed(2)}€
                </span>
            </Link>

            <button onClick={() => adicionar(produto)} className={`cursor-pointer absolute z-[1] bottom-[10px] right-[10px] ${vaiAdicionar ? 'flex' : 'none'} justify-center items-center w-[20px] h-[20px] pb-[4px] rounded-full bg-green-500 hover:bg-green-600`}>
                +
            </button>

            <button onClick={() => remover(index)} className={`cursor-pointer absolute z-[1] bottom-[10px] right-[10px] ${vaiAdicionar ? 'hidden' : 'flex'} justify-center items-center w-[20px] h-[20px] pb-[4px] rounded-full bg-green-500 hover:bg-green-600`}>
                -
            </button>
        </div>
    )
}