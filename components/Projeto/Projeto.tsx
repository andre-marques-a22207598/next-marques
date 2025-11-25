import Link from 'next/link';

interface ProjetoProps {
    index: number
    url: string
}

export default function Projeto({index, url}:ProjetoProps) {
    return (
        <div className='p-[10px] my-[25px] rounded-[5px] hover:bg-green-100 transition duration-100 ease-in border rounded-lg w-140'>
            <h3 className='mb-5 font-bold text-[1.2em] text-center'>Laboratório {index}</h3>

           
            <p className='text-center mt-[15px]'>
                <Link className='hover:font-bold underline' target='_blank' href ={`${url}`}>CLIQUE AQUI PARA VER</Link>
            </p>
        </div>
    )
}