import Componente1 from "@/components/Componente1/Componente1"

export default function page() {
  const frase = <p>JSX faz magia</p>
  const ano = 2025
  return (
    <div>
    <h1>Ola</h1>
    <p>O meu primeiro site bosta</p>
    {frase}
    <p>{ano}</p>
    <Componente1 />
    </div>

    
  )
}