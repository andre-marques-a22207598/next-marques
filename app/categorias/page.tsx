// Diretiva que indica que este componente deve ser executado no CLIENTE (browser)
// Necessário porque usa hooks (useSWR) que precisam de interatividade
"use client"

// Importa o hook useSWR da biblioteca SWR (Stale-While-Revalidate)
// useSWR é usado para fazer fetching de dados com cache, revalidação automática e gestão de estado
import useSWR from 'swr'

// Define a função fetcher que será usada pelo useSWR para buscar dados
// Recebe uma URL como string e retorna uma Promise com os dados em JSON
const fetcher = async (url: string) => {
   // Faz uma requisição HTTP GET para a URL fornecida
   const res = await fetch(url);
   
   // Verifica se a resposta não foi bem-sucedida (status diferente de 2xx)
   if (!res.ok) {
     // Lança um erro com o código de status e texto do erro
     throw new Error(`Erro: ${res.status} ${res.statusText}`);
   }
   
   // Converte a resposta para JSON e retorna
   return res.json();
};

// Define e exporta o componente funcional principal da página de Categorias
export default function CategoriasPage() {
    // Usa o hook useSWR para fazer o fetch dos dados
    // - Primeiro parâmetro: URL da API (chave única para cache)
    // - Segundo parâmetro: função fetcher que vai buscar os dados
    // - Retorna: data (dados recebidos), error (erro se houver), isLoading (estado de carregamento)
    // - <string[]> indica que esperamos receber um array de strings (tipagem TypeScript)
    const {data, error, isLoading} = useSWR<string[]>('https://deisishop.pythonanywhere.com/#/categories', fetcher)

    // Se houver um erro, retorna um parágrafo mostrando a mensagem de erro
    if (error) return <p>Houve um erro: {error}</p>
    
    // Se ainda estiver carregando os dados, mostra mensagem de loading
    if (isLoading) return <p>A carregar</p>
    
    // Se não houver dados (null ou undefined), mostra mensagem apropriada
    if (!data) return <p>Não há dados</p>

    // Se tudo correu bem e há dados, renderiza a interface
    return (
        // Fragment vazio (<></>) - permite retornar múltiplos elementos sem adicionar nó extra ao DOM
        <>
            {/* Título da página */}
            <h2>Categorias</h2>

            {/* Lista não-ordenada para mostrar as categorias */}
            <ul>
                {/* Mapeia o array de categorias para criar um <li> para cada uma */}
                {/* .map() percorre cada elemento do array e transforma em JSX */}
                {data.map((categoria, index) =>(
                    // Cada item da lista precisa de uma prop 'key' única
                    // NOTA: String deve usar backticks (`) para interpolação funcionar corretamente
                    // Usar index como key não é ideal, mas funciona para listas estáticas
                    <li key={"categoria-${index}"}>
                        {/* Exibe o nome da categoria dentro do item da lista */}
                        {categoria}
                    </li>
                ))}
            </ul>
        </>
    )
}