"use client"

import { useParams } from "next/navigation"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { Produto } from "@/models/interfaces"



const fetcher = async (url: string) => fetch(url).then(res => res.json())

export default function DetailsCard() {
    const params = useParams()
    const index = Number(params.produto) + 1
    const url = 'https://deisishop.pythonanywhere.com'
    const url_produto = `${url}/products/${index}`

    const {data, error, isLoading} = useSWR<Produto>(url_produto, fetcher)

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
            <Link href='/produtos' className="block py-[13px] mb-[30px] rounded-[10px] bg-blue-600 text-center hover:bg-blue-500">
                Voltar a ver os produtos
            </Link>

            <h2 className="font-bold text-[2em] text-center">
                { data.title }
            </h2>

            <p className="text-center">
                { data.category }
            </p>

            <figure className="relative flex items-center w-full h-[250px] my-[30px]">
                <Image src={`${data.image}`} alt={`Imagem do produto '${data.title}'`} fill style={{objectFit: 'contain'}}></Image>
            </figure>

            <p className="my-[30px] indent-[20px]">
                { data.description }
            </p>

            <div className="flex gap-x-[20px] w-full">
                <div className="flex flex-col gap-y-[15px] w-[50%] p-[10px] rounded-[7px] bg-gray-100">
                    <span>
                        Nota do público:
                    </span> 
                    <span className="flex justify-center items-center">
                        <span className="text-[2em]">
                            { data.rating.rate }
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
                    </span>
                    <p>
                        Mais de { data.rating.count } avaliaram esse produto.
                    </p>
                </div>
                <div className="flex flex-col justify-between w-[50%] p-[10px] rounded-[7px] bg-gray-100">     
                    <div className="flex flex-col">
                        <span>
                            Preço
                        </span>
                        <span className="text-[2em]">
                            { Number(data.price).toFixed(2) } €
                        </span>
                    </div>

                    <button className="py-[7px] rounded-[4px] bg-blue-500">
                        Adicionar ao Cesto
                    </button>
                </div>
            </div>
        </div>
    )
}