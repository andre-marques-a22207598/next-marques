import Image from "next/image"

// Interface TypeScript que define as props que o componente TecnologiaCard recebe
interface TecnologiaCardProps {
    title: string  // Nome da tecnologia (ex: "React", "TypeScript", "Next.js")
    image: string  // Nome do ficheiro da imagem (ex: "react.png", "typescript.svg")
}

// Componente que renderiza o logo e título de uma tecnologia
// Recebe title e image via destructuring das props
export default function TecnologiaCard({title, image}: TecnologiaCardProps) {
    return (
        // Fragment vazio (<></>) - permite retornar múltiplos elementos sem adicionar nó extra ao DOM
        <>
            {/* Container da imagem
                - relative: necessário para usar Image do Next.js com prop "fill"
                - flex items-center justify-center: centraliza a imagem
                - w-[50px] h-[50px]: tamanho fixo de 50x50 pixels para o container */}
            <figure className="relative flex items-center justify-center w-[50px] h-[50px]">
                {/* Componente Image otimizado do Next.js
                    - src: caminho da imagem na pasta public/tecnologias/
                      (ex: se image="react.png", caminho completo é /tecnologias/react.png)
                    - alt: texto alternativo para acessibilidade (importante para screen readers)
                    - fill: faz a imagem preencher o container pai (necessita que parent seja relative)
                    - style={{objectFit: 'contain'}}: mantém proporções da imagem, mostra imagem completa sem crop */}
                <Image 
                    src={`/tecnologias/${image}`}  // Template literal constrói caminho completo
                    alt={`Logo ${title}`}           // Alt text dinâmico baseado no título
                    fill                            // Preenche o container pai
                    style={{objectFit: 'contain'}} // Mantém aspect ratio original
                />
            </figure>

            {/* Título da tecnologia
                - text-[1.5em]: tamanho da fonte 1.5em (50% maior que o tamanho base) */}
            <h2 className="text-[1.5em]">
                {title}
            </h2>
        </>
    )
}