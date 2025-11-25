import Link from 'next/link';
import Orgulho from '@/components/Orgulho/Orgulho';
import Projeto from '../Projeto/Projeto';

const quantidadeLabs = 7;

export default function Projetos() {
    const itens = []
    let url =''
    for (let i = 0; i < quantidadeLabs; i++) {
        url = (i < 3) ? `https://andre-marques-a22207598.github.io/lab${i+1}/cidade/index.html` : `https://andre-marques-a22207598.github.io/lab${i+1}/index.html`

        itens.push(
            <Projeto key={i} index={i+1} url={url}/>
        )
    }

    return (
        <div className='conteudo-main'>
            <h2>Projetos</h2>
            <p className='paragrafo-main h-12' >
                Proetos desenvolvidos no ambito da unidade curricular de <strong> desenvolvimento de Interfaces Web</strong>.
            </p>
            <p>
                Os projetos estão disponíveis em <Link className='hover:font-bold underline' target='_blank' href ="https://andre-marques-a22207598.github.io/index.html">aqui</Link>
            </p>
            <div className='my-[40px]'>
                {itens}
            </div>

            <Orgulho nome="loja" link="https://andre-marques-a22207598.github.io/lab7/index.html"/>
        </div>
    )
}