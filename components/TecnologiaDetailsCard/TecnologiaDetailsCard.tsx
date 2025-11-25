"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import tecnologias from '@/data/tecnologias.json'

export default function TecnologiaPage() {
    const params = useParams()
    const index = Number(params.tecnologia)
    let estrelas = '⭐'

    return (
        <>
            <div className='flex justify-between items-center mb-[40px]'>
                <Link className='flex py-[4px] px-[10px] rounded-xs hover:bg-blue-300 transition duration-200 ease-in-out' href='/tecnologias'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
                    <span>Voltar</span>
                </Link>

                <h2 className='text-center text-[1.5em]'>
                    Tecnologia {tecnologias[index].title}
                </h2>

                <span>{tecnologias[index].rating}{estrelas}</span>
            </div>
            
            <p className='my-[50px] text-center'>
                {tecnologias[index].description}
            </p>
        </>
    )
}