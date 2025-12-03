"use client"

import { useEffect, useState } from "react"

interface ContadorProps {
  storageKey: string // chave única para cada card
}

export default function ContadorPersonalizado({ storageKey }: ContadorProps) {
  const [likes, setLikes] = useState<number | null>(null)

  // 1. Carregar do localStorage no primeiro render
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    setLikes(stored ? JSON.parse(stored) : 0)
  }, [storageKey])

  // 2. Atualizar localStorage sempre que "likes" muda
  useEffect(() => {
    if (likes !== null) {
      localStorage.setItem(storageKey, JSON.stringify(likes))
    }
  }, [likes, storageKey])

  // 3. Função para aumentar
  function aumentaLike() {
    setLikes(prev => (prev ?? 0) + 1)
  }

  if (likes === null) return null

  return (
    <div className="relative flex items-center justify-center mt-1 mt-4">
      <button
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          aumentaLike()
        }}
        aria-label="Curtir"
        className="absolute z-10 flex items-center justify-center cursor-grab hover:scale-110 active:scale-95 transition-transform text-red-500"
      >
        <span aria-hidden="true">❤️</span>
        <span className="sr-only">Curtir</span>
      </button>
      <p className="absolute right-3 text-red-600">{likes}</p>
    </div>
  )
}
