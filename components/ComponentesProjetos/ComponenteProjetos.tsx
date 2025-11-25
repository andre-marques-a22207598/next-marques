import Link from "next/link"
import Orgulho from "@/components/Orgulho/Orgulho"

export default function ComponentesProjetos(){

    return(
        <>
            <h2>Projetos</h2>
            <p>Em DIW fizemos varios projetos usando HTML,CSS e javaScript</p>
            <p>OS projetos estao disponiveis neste <Link href = "https://andre-marques-a22207598.github.io/" target="blank">Web Site</Link> </p>
            <Orgulho
            nome="loja"
            link="https://andre-marques-a22207598.github.io/"/>
        </>
    )
}