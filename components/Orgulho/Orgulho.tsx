import Link from "next/link"
interface OrgulhoProps {
    nome: String
    link: String
}

export default function Orgulho({nome, link}: OrgulhoProps){
    return(
        <div className="bg-pink-200 hover:bg-amber-300 p-2">
            <p>O meu orgulho é {nome} que fiz, disponivel neste {link}</p>
        </div>
    )
}