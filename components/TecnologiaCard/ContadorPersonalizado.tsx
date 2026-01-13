// Componente executa no cliente (usa hooks e localStorage)
"use client"

import { useEffect, useState } from "react"

// Interface TypeScript que define as props do componente
interface ContadorProps {
  storageKey: string // Chave única para armazenar likes de cada card no localStorage
}

// Componente de contador de likes personalizado
// Cada instância tem sua própria chave de armazenamento (ex: "likes-0", "likes-1")
export default function ContadorPersonalizado({ storageKey }: ContadorProps) {
  // Estado para armazenar número de likes
  // Inicia como null para diferenciar "ainda não carregou" de "0 likes"
  const [likes, setLikes] = useState<number | null>(null)

  // 1. useEffect que executa quando componente monta ou storageKey muda
  // Carrega o valor de likes do localStorage usando a chave única
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) // Busca valor no localStorage
    // Se existe valor guardado, converte de string JSON para número
    // Se não existe, inicia com 0
    setLikes(stored ? JSON.parse(stored) : 0)
  }, [storageKey]) // Dependência: recarrega se storageKey mudar

  // 2. useEffect que executa sempre que "likes" muda
  // Salva o novo valor de likes no localStorage
  useEffect(() => {
    // Só salva se likes não for null (ou seja, já foi carregado)
    if (likes !== null) {
      localStorage.setItem(storageKey, JSON.stringify(likes)) // Converte número para string e salva
    }
  }, [likes, storageKey]) // Dependências: executa quando likes ou storageKey mudam

  // 3. Função que incrementa o contador de likes
  function aumentaLike() {
    // setLikes com função callback
    // prev é o valor anterior
    // ?? 0 é nullish coalescing: se prev for null/undefined, usa 0
    setLikes(prev => (prev ?? 0) + 1)
  }

  // Se ainda não carregou do localStorage (likes === null), não renderiza nada
  // Evita flash de "0 likes" antes de carregar o valor real
  if (likes === null) return null

  return (
    // Container principal
    // - relative: necessário para posicionar elementos absolutamente dentro
    // - flex items-center justify-center: centraliza conteúdo
    // - mt-1 mt-4: margin-top (mt-4 sobrescreve mt-1, valor final é 1rem)
    <div className="relative flex items-center justify-center mt-1 mt-4">
      {/* Botão de curtir (coração) */}
      <button
        onClick={e => {
          e.stopPropagation()  // Impede que o click "bubble up" para elementos pais
          e.preventDefault()    // Previne comportamento padrão do botão
          aumentaLike()        // Incrementa o contador
        }}
        aria-label="Curtir"   // Acessibilidade: texto para screen readers
        // Estilos do botão:
        // - absolute z-10: posição absoluta com z-index alto
        // - cursor-grab: cursor de "mão agarrando"
        // - hover:scale-110: aumenta 10% no hover
        // - active:scale-95: diminui 5% quando clicado (feedback visual)
        // - transition-transform: anima as transformações
        // - text-red-500: cor vermelha do texto
        className="absolute z-10 flex items-center justify-center cursor-grab hover:scale-110 active:scale-95 transition-transform text-red-500"
      >
        {/* Emoji de coração 
            - aria-hidden="true": esconde de screen readers (já tem aria-label no botão) */}
        <span aria-hidden="true">❤️</span>
        {/* Texto alternativo para acessibilidade
            - sr-only: "screen reader only" - só visível para leitores de tela */}
        <span className="sr-only">Curtir</span>
      </button>
      
      {/* Contador numérico de likes
          - absolute right-3: posicionado à direita com 0.75rem de distância
          - text-red-600: cor vermelha mais escura */}
      <p className="absolute right-3 text-red-600">{likes}</p>
    </div>
  )
}