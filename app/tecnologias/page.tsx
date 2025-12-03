import Tecnologia from '@/components/Tecnologia/Tecnologia'
import tecnologias from '@/data/tecnologias.json'

export default function TecnologiasPage() {
    return(
        <>
            <h2 className='text-center mb-[30px] text-[1.5em]'>Tecnologias Exploradas</h2>

            <div className='flex flex-wrap justify-center'>
                {tecnologias.map((tecnologia, index) => (
                    <Tecnologia
                        key={`tecno-${index}`}
                        index={index} // para likes únicos por card
                        image={tecnologia.image}
                        title={tecnologia.title}
                        description={tecnologia.description}
                        rating={tecnologia.rating}
                    />
                ))}
            </div>
        </>
    )
}
