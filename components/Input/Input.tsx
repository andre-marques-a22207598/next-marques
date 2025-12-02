"use client"

import { useEffect, useState } from "react"

interface Tarefa {
    id: number
    opcao: string
    texto: string
    corFundo: string
}

export default function Input() {
    const [texto, setTexto] = useState<string>("")
    const [tarefas, setTarefas] = useState<Tarefa[]>([]) // ← CORRIGIDO
    const [opcao, setOpcao] = useState<string>("")
    const [corFundo, setCorFundo] = useState<string>("")
    const [visivel, setVisivel] = useState<boolean>(false)
    const [idTarefa, setIdTarefa] = useState<number>(0)

    // ← CARREGAR do localStorage DEPOIS do carregamento
    useEffect(() => {
        const tarefasStored = localStorage.getItem("tarefas")
        if (tarefasStored) {
            const parsed = JSON.parse(tarefasStored)
            setTarefas(parsed)
            setIdTarefa(parsed.length)
        }
    }, [])

    function definirCorFundo(valor: string, cor: string) {
        setVisivel(true)
        setCorFundo(cor)
        setOpcao(valor)
    }

    function alterarCorFundo(e: any) {
        const valor = e.target.value

        switch (valor) {
            case "tecnologia":
                definirCorFundo(valor, "bg-purple-500")
                break
            case "categorias":
                definirCorFundo(valor, "bg-orange-300")
                break
            default:
                setOpcao("")
                setVisivel(false)
        }
    }

    function desenharElementoTarefa(
        visivel: boolean,
        opcao: string,
        corFundo: string,
        texto: string,
        editor: boolean,
        id: number
    ) {
        return (
            <div
                key={`tarefa-${id}`}
                className={`${
                    visivel ? "flex" : "hidden"
                } relative flex-row justify-between items-start gap-4 w-[340px] min-h-[140px] p-5 
                rounded-2xl shadow-lg shadow-black/10 bg-white transition-all duration-300`}
            >
                {/* Conteúdo */}
                <div className="flex flex-col w-full">
                    <h3 className="text-center font-semibold text-gray-600 text-sm mb-2 tracking-wide">
                        {opcao.toUpperCase()}
                    </h3>

                    <p className="text-gray-800 text-base leading-tight break-words">
                        {texto}
                    </p>
                </div>

                {/* Botões lado a lado verticalmente */}
                <div
                    className={`${
                        editor ? "flex" : "hidden"
                    } flex-col gap-3`}
                >
                    <button
                        onClick={() => editarTarefa(id)}
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 active:bg-blue-300 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="black"
                        >
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                    </button>

                    <button
                        onClick={() => apagarTarefa(id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 active:bg-red-300 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="black"
                        >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    function adicionarTarefa() {
        if (!visivel || !texto.trim()) return

        let id = idTarefa + 1
        setIdTarefa(id)

        const nova = {
            id: id,
            opcao: opcao,
            texto: texto,
            corFundo: corFundo
        }

        setTarefas((t) => [...t, nova])

        setTexto("")
        setOpcao("")
        setVisivel(false)
    }

    function apagarTarefa(id: number) {
        setTarefas((_) => _.filter((tarefa) => tarefa.id !== id))
    }

    function editarTarefa(id: number) {
        const t = tarefas.find((tarefa) => tarefa.id === id)

        if (t) {
            setTexto(t.texto)
            setOpcao(t.opcao.toLowerCase())
            setIdTarefa(t.id)
            setCorFundo(t.corFundo)
            setVisivel(true)
        }

        apagarTarefa(id)
    }

    // SALVAR NO LOCALSTORAGE
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("tarefas", JSON.stringify(tarefas))
        }
    }, [tarefas])

    return (
        <>
            <section className="flex justify-center gap-10 mb-10">
                <div className="flex flex-col gap-1">
                    <label htmlFor="campoTexto" className="text-gray-700 font-medium">
                        Escreva algo no campo abaixo
                    </label>

                    <input
                        onChange={(e) => setTexto(e.target.value)}
                        value={texto}
                        id="campoTexto"
                        type="text"
                        maxLength={28}
                        className="w-[300px] h-[50px] border border-gray-400 rounded-xl px-3 text-[1em] shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="TecCat" className="text-gray-700 font-medium">
                            Lista de
                        </label>

                        <select
                            onChange={(e) => alterarCorFundo(e)}
                            value={opcao}
                            id="TecCat"
                            className="cursor-pointer border border-gray-400 px-2 py-2 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">...</option>
                            <option value="tecnologia">Tecnologia</option>
                            <option value="categorias">Categorias</option>
                        </select>
                    </div>

                    <button
                        onClick={adicionarTarefa}
                        className="cursor-pointer py-2 px-4 rounded-xl bg-green-300 hover:bg-green-500 active:bg-green-600 text-white font-semibold transition"
                    >
                        Adicionar Tarefa
                    </button>
                </div>
            </section>

            <div className="my-10 flex justify-center flex-col items-center">
                <h2
                    className={`${
                        visivel ? "flex justify-center" : "hidden"
                    } justify-center text-xl text-gray-500 mb-4`}
                >
                    Tarefa a Adicionar
                </h2>

                {desenharElementoTarefa(visivel, opcao, corFundo, texto, false, 0)}
            </div>

            <section className="flex flex-col gap-y-6">
                <h2
                    className={`${
                        tarefas.length > 0 ? "flex" : "hidden"
                    } justify-center text-xl text-gray-600`}
                >
                    Todas as Tarefas
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {tarefas.map((tarefa) =>
                        desenharElementoTarefa(
                            true,
                            tarefa.opcao,
                            tarefa.corFundo,
                            tarefa.texto,
                            true,
                            tarefa.id
                        )
                    )}
                </div>
            </section>
        </>
    )
}
