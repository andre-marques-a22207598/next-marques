import Image from "next/image"

interface TecnologiaCardProps {
    title: string
    image: string
}

export default function TecnologiaCard({title, image}: TecnologiaCardProps) {
    return (
        <>
            <figure className="relative flex items-center justify-center w-[50px] h-[50px]">
                <Image src={`/tecnologias/${image}`} alt={`Logo ${title}`} fill style={{objectFit: 'contain'}}></Image>
            </figure>

            <h2 className="text-[1.5em]">
                {title}
            </h2>
        </>
    )
}