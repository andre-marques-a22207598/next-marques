"use client"

import useSWR from 'swr'

const fetcher = async (url: string) => {
   const res = await fetch(url);
   if (!res.ok) {
     throw new Error("Erro: ${res.status} ${res.statusText}");
   }
   return res.json();
};

export default function CategoriasPage() {
    const {data, error, isLoading} = useSWR<string[]>('https://deisishop.pythonanywhere.com/#/categories', fetcher)

    if (error) return <p>Houve um erro: {error}</p>
    if (isLoading) return <p>A carregar</p>
    if (!data) return <p>Não há dados</p>

    return (
        <>
            <h2>Categorias</h2>

            <ul>
                {data.map((categoria, index) =>(
                    <li key={"categoria-${index}"}>
                        {categoria}
                    </li>
                ))}
            </ul>
        </>
    )
}