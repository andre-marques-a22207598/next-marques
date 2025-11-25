import TecnologiaCard from '../TecnologiaCard/TecnologiaCard'

interface TecnologiaProps {
    image: string
    title: string
    description: string
    rating: number
}

export default function Tecnologia({image, title, description, rating}: TecnologiaProps) {
    let estrelas = '⭐'
    
    return (
        <div className='flex flex-col items-center justify-center w-[250px] h-[350px] m-[15px] p-[20px] border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300'>
            <TecnologiaCard image={image} title={title}/>

            <p className='my-[15px] text-center'>
                {description}
            </p>

            <span>{rating}{estrelas}</span>
        </div>
    )
}