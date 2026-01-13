// Componente executa no cliente (usa hooks e localStorage)
"use client"

import { useEffect, useState } from "react"

// Interface TypeScript que define a estrutura de uma Tarefa
interface Tarefa {
    id: number        // Identificador único da tarefa
    opcao: string     // Tipo da tarefa (tecnologia ou categorias)
    texto: string     // Conteúdo/descrição da tarefa
    corFundo: string  // Classe CSS para cor de fundo
}

export default function Input() {
    // Estado para o texto digitado no input
    const [texto, setTexto] = useState<string>("")
    
    // Estado que armazena array de todas as tarefas
    const [tarefas, setTarefas] = useState<Tarefa[]>([])
    
    // Estado para a opção selecionada no select (tecnologia/categorias)
    const [opcao, setOpcao] = useState<string>("")
    
    // Estado para a classe CSS da cor de fundo
    const [corFundo, setCorFundo] = useState<string>("")
    
    // Estado que controla se o preview da tarefa está visível
    const [visivel, setVisivel] = useState<boolean>(false)
    
    // Estado para controlar o próximo ID a ser atribuído (contador)
    const [idTarefa, setIdTarefa] = useState<number>(0)

    // useEffect que executa UMA VEZ após o componente montar ([] = sem dependências)
    // Carrega tarefas salvas do localStorage
    useEffect(() => {
        const tarefasStored = localStorage.getItem("tarefas") // Busca do localStorage
        if (tarefasStored) {
            const parsed = JSON.parse(tarefasStored) // Converte string JSON para objeto
            setTarefas(parsed) // Restaura as tarefas
            setIdTarefa(parsed.length) // Define próximo ID baseado na quantidade
        }
    }, [])

    // Função auxiliar que define a cor e torna a tarefa visível
    function definirCorFundo(valor: string, cor: string) {
        setVisivel(true) // Mostra o preview da tarefa
        setCorFundo(cor) // Define a classe CSS da cor
        setOpcao(valor)  // Define a opção selecionada
    }

    // Função chamada quando o select muda de valor
    function alterarCorFundo(e: any) {
        const valor = e.target.value // Pega o valor selecionado

        // Switch case para definir cores diferentes por tipo
        switch (valor) {
            case "tecnologia":
                definirCorFundo(valor, "bg-purple-500") // Roxo para tecnologia
                break
            case "categorias":
                definirCorFundo(valor, "bg-orange-300") // Laranja para categorias
                break
            default: // Se não selecionou nada (opção "...")
                setOpcao("")
                setVisivel(false) // Esconde o preview
        }
    }

    // Função que retorna JSX de um card de tarefa
    // Recebe todos os dados necessários como parâmetros
    function desenharElementoTarefa(
        visivel: boolean,    // Se deve mostrar ou esconder
        opcao: string,       // Tipo da tarefa
        corFundo: string,    // Cor de fundo
        texto: string,       // Conteúdo
        editor: boolean,     // Se mostra botões de editar/apagar
        id: number          // ID único
    ) {
        return (
            // Card container com estilos Tailwind
            <div
                key={`tarefa-${id}`} // Key única para React
                className={`${
                    visivel ? "flex" : "hidden" // Mostra/esconde baseado no estado
                } relative flex-row justify-between items-start gap-4 w-[340px] min-h-[140px] p-5 
                rounded-2xl shadow-lg shadow-black/10 bg-white transition-all duration-300`}
            >
                {/* Seção de conteúdo da tarefa */}
                <div className="flex flex-col w-full">
                    {/* Título com o tipo em maiúsculas */}
                    <h3 className="text-center font-semibold text-gray-600 text-sm mb-2 tracking-wide">
                        {opcao.toUpperCase()}
                    </h3>

                    {/* Texto da tarefa */}
                    <p className="text-gray-800 text-base leading-tight break-words">
                        {texto}
                    </p>
                </div>

                {/* Container dos botões (só aparece se editor=true) */}
                <div
                    className={`${
                        editor ? "flex" : "hidden"
                    } flex-col gap-3`}
                >
                    {/* Botão Editar com ícone SVG */}
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

                    {/* Botão Apagar com ícone SVG */}
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

    // Função que adiciona uma nova tarefa ao array
    function adicionarTarefa() {
        // Validação: só adiciona se visível e texto não vazio
        if (!visivel || !texto.trim()) return

        // Incrementa o ID para a nova tarefa
        let id = idTarefa + 1
        setIdTarefa(id)

        // Cria objeto da nova tarefa
        const nova = {
            id: id,
            opcao: opcao,
            texto: texto,
            corFundo: corFundo
        }

        // Adiciona ao array (spread operator mantém tarefas antigas + adiciona nova)
        setTarefas((t) => [...t, nova])

        // Limpa os campos após adicionar
        setTexto("")
        setOpcao("")
        setVisivel(false)
    }

    // Função que remove uma tarefa do array por ID
    function apagarTarefa(id: number) {
        // Filter cria novo array excluindo a tarefa com o ID especificado
        setTarefas((_) => _.filter((tarefa) => tarefa.id !== id))
    }

    // Função que permite editar uma tarefa existente
    function editarTarefa(id: number) {
        // Busca a tarefa no array pelo ID
        const t = tarefas.find((tarefa) => tarefa.id === id)

        if (t) {
            // Preenche os campos com os dados da tarefa para edição
            setTexto(t.texto)
            setOpcao(t.opcao.toLowerCase())
            setIdTarefa(t.id) // Mantém o mesmo ID
            setCorFundo(t.corFundo)
            setVisivel(true) // Mostra o preview
        }

        // Remove a tarefa original (será re-adicionada ao clicar "Adicionar")
        apagarTarefa(id)
    }

    // useEffect que executa sempre que o array tarefas muda
    // Salva as tarefas no localStorage
    useEffect(() => {
        if (typeof window !== "undefined") { // Verifica se está no browser
            localStorage.setItem("tarefas", JSON.stringify(tarefas)) // Converte para string e salva
        }
    }, [tarefas]) // Dependência: executa quando tarefas muda

    return (
        <>
            {/* Seção do formulário de input */}
            <section className="flex justify-center gap-10 mb-10">
                {/* Campo de texto */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="campoTexto" className="text-gray-700 font-medium">
                        Escreva algo no campo abaixo
                    </label>

                    <input
                        onChange={(e) => setTexto(e.target.value)} // Atualiza estado quando digita
                        value={texto} // Valor controlado pelo estado
                        id="campoTexto"
                        type="text"
                        maxLength={28} // Limite de 28 caracteres
                        className="w-[300px] h-[50px] border border-gray-400 rounded-xl px-3 text-[1em] shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {/* Select e botão */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="TecCat" className="text-gray-700 font-medium">
                            Lista de
                        </label>

                        {/* Select para escolher tipo de tarefa */}
                        <select
                            onChange={(e) => alterarCorFundo(e)} // Chama função ao mudar
                            value={opcao} // Valor controlado
                            id="TecCat"
                            className="cursor-pointer border border-gray-400 px-2 py-2 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">...</option>
                            <option value="tecnologia">Tecnologia</option>
                            <option value="categorias">Categorias</option>
                        </select>
                    </div>

                    {/* Botão para adicionar/atualizar tarefa */}
                    <button
                        onClick={adicionarTarefa}
                        className="cursor-pointer py-2 px-4 rounded-xl bg-green-300 hover:bg-green-500 active:bg-green-600 text-white font-semibold transition"
                    >
                        Adicionar Tarefa
                    </button>
                </div>
            </section>

            {/* Preview da tarefa antes de adicionar */}
            <div className="my-10 flex justify-center flex-col items-center">
                <h2
                    className={`${
                        visivel ? "flex justify-center" : "hidden"
                    } justify-center text-xl text-gray-500 mb-4`}
                >
                    Tarefa a Adicionar
                </h2>

                {/* Chama função para desenhar preview (sem botões de edição) */}
                {desenharElementoTarefa(visivel, opcao, corFundo, texto, false, 0)}
            </div>

            {/* Seção que lista todas as tarefas salvas */}
            <section className="flex flex-col gap-y-6">
                <h2
                    className={`${
                        tarefas.length > 0 ? "flex" : "hidden" // Só mostra se houver tarefas
                    } justify-center text-xl text-gray-600`}
                >
                    Todas as Tarefas
                </h2>

                {/* Grid/flexbox que mapeia e renderiza todas as tarefas */}
                <div className="flex flex-wrap justify-center gap-6">
                    {tarefas.map((tarefa) =>
                        desenharElementoTarefa(
                            true,              // Sempre visível
                            tarefa.opcao,
                            tarefa.corFundo,
                            tarefa.texto,
                            true,              // Com botões de editar/apagar
                            tarefa.id
                        )
                    )}
                </div>
            </section>
        </>
    )
}