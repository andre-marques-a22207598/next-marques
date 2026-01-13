// Importa o componente Link do Next.js para navegação otimizada entre páginas
import Link from 'next/link';

// Importa componentes customizados
import Orgulho from '@/components/Orgulho/Orgulho';
import Projeto from '@/components/Projeto/Projeto';

// Define constante com o número total de labs/projetos
const quantidadeLabs = 7;

// Componente principal da página de Projetos
export default function Projetos() {
    // Array vazio que vai armazenar os componentes <Projeto> gerados no loop
    const itens = []
    
    // Variável que vai armazenar a URL de cada projeto
    let url =''
    
    // Loop que cria 7 componentes Projeto (de 0 a 6)
    for (let i = 0; i < quantidadeLabs; i++) {
        // Operador ternário que define URLs diferentes:
        // - Labs 1, 2, 3 (i < 3): URL inclui "/cidade/index.html"
        // - Labs 4, 5, 6, 7 (i >= 3): URL vai diretamente para "/index.html"
        // (i+1) porque labs começam em 1, não em 0
        url = (i < 3) ? `https://andre-marques-a22207598.github.io/lab${i+1}/cidade/index.html` : `https://andre-marques-a22207598.github.io/lab${i+1}/index.html`

        // Adiciona um componente Projeto ao array itens
        itens.push(
            <Projeto 
                key={i}        // Key única para React (usa índice do loop)
                index={i+1}    // Passa o número do lab (1-7) como prop
                url={url}      // Passa a URL gerada como prop
            />
        )
    }

    return (
        // Container principal com classe Tailwind personalizada
        <div className='conteudo-main'>
            {/* Título da página */}
            <h2>Projetos</h2>
            
            {/* Parágrafo descritivo com altura fixa (h-12 = 3rem)
                - paragrafo-main: classe customizada
                - <strong> para destacar o nome da unidade curricular */}
            <p className='paragrafo-main h-12' >
                Projetos desenvolvidos no ambito da unidade curricular de <strong> desenvolvimento de Interfaces Web</strong>.
            </p>
            
            {/* Parágrafo com link externo
                - Link do Next.js é usado para otimização
                - target='_blank': abre em nova aba
                - hover:font-bold: texto fica bold ao passar o rato
                - underline: texto sublinhado */}
            <p>
                Os projetos estão disponíveis em <Link className='hover:font-bold underline' target='_blank' href ="https://andre-marques-a22207598.github.io/index.html">aqui</Link>
            </p>
            
            {/* Container que renderiza todos os componentes Projeto gerados no loop
                - my-[40px]: margin vertical de 40px (top e bottom) */}
            <div className='my-[40px]'>
                {itens}
            </div>

            {/* Componente especial Orgulho para destacar um projeto específico (lab7 - loja)
                - Recebe nome e link como props */}
            <Orgulho nome="loja" link="https://andre-marques-a22207598.github.io/lab7/index.html"/>
        </div>
    )
}