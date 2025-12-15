import Produtos from '@/components/Produtos/Produtos'

export default function Page() {
    return (
        <>
            <h1 className='font-bold text-[2em] text-center mb-[30px]'>
                Lojão, a loja do João que come feijão e leitão com a mão
            </h1>

            <Produtos/>
        </>
    )
}