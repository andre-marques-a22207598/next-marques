// Importa o componente Tecnologia de uma pasta específica
// @ é um alias para a raiz do projeto (configurado no tsconfig.json)
import Tecnologia from '@/components/Tecnologia/Tecnologia'

// Importa os dados das tecnologias de um ficheiro JSON estático
import tecnologias from '@/data/tecnologias.json'

// Componente principal da página de Tecnologias
export default function TecnologiasPage() {
    return(
        <>
            {/* Título da página com classes Tailwind CSS para estilização
                - text-center: texto centrado
                - mb-[30px]: margin-bottom de 30px
                - text-[1.5em]: tamanho da fonte 1.5em */}
            <h2 className='text-center mb-[30px] text-[1.5em]'>Tecnologias Exploradas</h2>

            {/* Container flexbox para organizar os cards
                - flex: ativa flexbox
                - flex-wrap: permite quebra de linha quando necessário
                - justify-center: centraliza os itens horizontalmente */}
            <div className='flex flex-wrap justify-center'>
                {/* Mapeia o array de tecnologias do JSON para criar um componente Tecnologia para cada uma */}
                {tecnologias.map((tecnologia, index) => (
                    // Renderiza o componente Tecnologia passando dados como props
                    <Tecnologia
                        key={`tecno-${index}`} // Key única para React identificar cada elemento
                        index={index} // Passa o índice para gestão de likes únicos
                        image={tecnologia.image} // Caminho da imagem
                        title={tecnologia.title} // Título da tecnologia
                        description={tecnologia.description} // Descrição
                        rating={tecnologia.rating} // Avaliação/rating
                    />
                ))}
            </div>
        </>
    )
}