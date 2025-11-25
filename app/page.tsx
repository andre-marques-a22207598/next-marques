import MagiaDoJSX from '@/components/MagiaDoJSX/MagiaDoJSX'

export default function HomePage() {
  return (
    <div className="conteudo-main">
      <h2>Vejam o modelo das <span className="italic">Interfaces Modernas</span></h2>

      <p className="paragrafo-main">
        Bem-vindo à minha app em React e Next.js. Este é o meu primeiro componente React. JSX faz magia.
      </p>
      <MagiaDoJSX/>
    </div>
  )
}