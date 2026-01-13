import Link from 'next/link';

// Interface TypeScript que define as props que o componente Projeto recebe
interface ProjetoProps {
    index: number  // Número do laboratório (1, 2, 3, etc.)
    url: string    // URL completa para o projeto hospedado
}

// Componente que renderiza um card de projeto/laboratório
// Recebe index e url via destructuring das props
export default function Projeto({index, url}:ProjetoProps) {
    return (
        // Container do card
        // - p-[10px]: padding de 10px
        // - my-[25px]: margin vertical (top e bottom) de 25px
        // - rounded-[5px]: bordas arredondadas de 5px
        // - hover:bg-green-100: fundo verde claro ao passar o rato
        // - transition duration-100 ease-in: animação suave de 100ms
        // - border rounded-lg: borda com cantos arredondados
        // - w-140: largura (provavelmente valor customizado no Tailwind config)
        <div className='p-[10px] my-[25px] rounded-[5px] hover:bg-green-100 transition duration-100 ease-in border rounded-lg w-140'>
            {/* Título do card mostrando o número do laboratório
                - mb-5: margin-bottom
                - font-bold: texto em negrito
                - text-[1.2em]: tamanho da fonte 1.2em
                - text-center: texto centralizado */}
            <h3 className='mb-5 font-bold text-[1.2em] text-center'>
                Laboratório {index}
            </h3>

            {/* Parágrafo com link para ver o projeto
                - text-center: centralizado
                - mt-[15px]: margin-top de 15px */}
            <p className='text-center mt-[15px]'>
                {/* Link do Next.js para navegação
                    - hover:font-bold: texto fica negrito ao passar rato
                    - underline: texto sublinhado
                    - target='_blank': abre em nova aba do browser
                    - href com template literal que injeta a URL recebida */}
                <Link className='hover:font-bold underline' target='_blank' href={`${url}`}>
                    CLIQUE AQUI PARA VER
                </Link>
            </p>
        </div>
    )
}