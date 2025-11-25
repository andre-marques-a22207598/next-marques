import Link from "next/link"

export default function Header(){

    return(
        <>
            <h1 className="mb-5">Aplicação</h1>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link href="/"> Intro</Link>
              </li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/projetos">Projetos</Link></li>
              <li><Link href="/tecnologias">Tecs</Link></li>
            </ul>
          </nav>
        </>
    )
}