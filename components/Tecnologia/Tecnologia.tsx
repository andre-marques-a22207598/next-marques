import ContadorPersonalizado from '../TecnologiaCard/ContadorPersonalizado'
import TecnologiaCard from '../TecnologiaCard/TecnologiaCard'

// Interface TypeScript que define as props que o componente Tecnologia recebe
interface TecnologiaProps {
    image: string       // Caminho/URL da imagem da tecnologia
    title: string       // Nome da tecnologia (ex: "React", "Next.js")
    description: string // Descrição da tecnologia
    rating: number      // Avaliação numérica (ex: 4.5)
    index: number       // Índice único para gerar chave de localStorage diferente para cada card
}

// Componente que renderiza um card completo de tecnologia
// Recebe todas as props via destructuring
export default function Tecnologia({image, title, description, rating, index}: TecnologiaProps) {
    // String com emoji de estrela para mostrar rating
    let estrelas = '⭐'
    
    return (
        // Container principal do card
        // - flex flex-col: layout vertical (coluna)
        // - items-center justify-center: centraliza conteúdo horizontal e verticalmente
        // - w-[250px] h-[350px]: tamanho fixo do card (250px largura, 350px altura)
        // - m-[15px]: margin de 15px em todos os lados
        // - p-[20px]: padding interno de 20px
        // - border border-gray-300: borda cinza
        // - rounded-lg: cantos arredondados
        // - hover:shadow-lg: sombra grande ao passar o rato
        // - transition-shadow duration-300: animação suave da sombra em 300ms
        <div className='flex flex-col items-center justify-center w-[250px] h-[350px] m-[15px] p-[20px] border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300'>
            {/* Componente que renderiza imagem e título da tecnologia
                - Passa image e title como props */}
            <TecnologiaCard image={image} title={title}/>

            {/* Descrição da tecnologia
                - my-[15px]: margin vertical (top e bottom) de 15px
                - text-center: texto centralizado */}
            <p className='my-[15px] text-center'>
                {description}
            </p>

            {/* Rating com número + estrela emoji
                - Mostra valor numérico seguido de emoji estrela */}
            <span>{rating}{estrelas}</span>
            
            {/* Componente de contador de likes personalizado
                - storageKey usa template literal para criar chave única no localStorage
                - Cada card tem seu próprio contador (likes-0, likes-1, likes-2, etc.)
                - Permite que cada tecnologia tenha contagem de likes independente */}
            <ContadorPersonalizado storageKey={`likes-${index}`}/>
        </div>
    )
}