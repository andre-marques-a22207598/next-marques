// Componente deve executar no cliente (necessário para useState, useEffect, localStorage)
"use client";
import { useEffect, useState } from 'react';

export default function Contador() {
    // Estado que armazena o valor atual do contador (inicia em 0)
    const [counter, setCounter] = useState(0);
    
    // Estado que armazena o histórico de valores do contador (array de números)
    const [historico, setHistorico] = useState<number[]>([]);
    
    // Estado que armazena a classe CSS da cor do texto (inicia vermelho)
    const [cor, setCor] = useState<string>("text-red-500");
    
    // Define os limites máximo e mínimo do contador
    const limiteMax = 10;
    const limiteMin = 0;

    // useEffect executa sempre que 'counter' muda
    useEffect(() => {
        // Guarda o valor do contador no localStorage do browser
        localStorage.setItem('contador', `${counter}`)
        
        // Adiciona o valor atual ao histórico (spread operator copia array anterior + novo valor)
        setHistorico([...historico, counter])
        
        // Define a cor baseada no valor do contador
        if (counter <= 3) {
            setCor("text-red-500") // Vermelho para valores baixos
        } else if (counter > 3 && counter < 8) {
            setCor("text-yellow-500") // Amarelo para valores médios
        } else if (counter > 7 && counter < 11) {
            setCor("text-green-500") // Verde para valores altos
        }
    }, [counter]) // Dependência: executa quando 'counter' muda

    // Função que incrementa o contador em 1
    function aumentaCount() {
        // Operador ternário: se counter < 10, incrementa; senão, mostra alerta
        (counter < limiteMax) ? setCounter(counter + 1) : alert("Excedeu o limite");
    }

    // Função que decrementa o contador em 1
    function diminuiCount() {
        // Se counter > 0, decrementa; senão, mostra alerta
        (counter > limiteMin) ? setCounter(counter - 1) : alert("Excedeu o limite");
    }
    
    // Função que reseta o contador para 0
    function resetCount() {
        setCounter(0);
    }

    return (
        <>
            {/* Container flexbox para os 3 botões
                - flex: ativa flexbox
                - justify-center: centraliza horizontalmente
                - gap-4: espaço de 1rem entre elementos
                - mb-2.5: margin-bottom */}
            <div className="flex justify-center gap-4 mb-2.5">
                {/* Botão Aumentar - chama aumentaCount() ao clicar */}
                <button className="cursor-pointer px-3 py-1 bg-green-200 rounded hover:shadow-lg transition-shadow duration-300" onClick={aumentaCount}>
                    Aumentar
                </button>

                {/* Botão Diminuir - chama diminuiCount() ao clicar */}
                <button className="cursor-pointer px-3 py-1 bg-green-200 rounded hover:shadow-lg transition-shadow duration-300" onClick={diminuiCount}>
                    Diminuir
                </button>

                {/* Botão Reset - chama resetCount() ao clicar */}
                <button className="cursor-pointer px-3 py-1 bg-green-200 rounded hover:shadow-lg transition-shadow duration-300" onClick={resetCount}>
                    Reset
                </button>
            </div>
            
            {/* Exibe o valor atual do contador com cor dinâmica
                - ${cor} injeta a classe CSS da cor atual (text-red-500, text-yellow-500, ou text-green-500) */}
            <div className='flex justify-center w-full font-bold text-xl'>
                <p className={`pt-0 pb-0 pl-2 pr-2 ${cor} `}>
                    {counter}
                </p>
            </div>

            {/* Lista que mostra o histórico de todos os valores
                - Mapeia o array historico e cria um <li> para cada número
                - ATENÇÃO: Falta a prop 'key' obrigatória no React */}
            <ul>
                {historico.map(num => (
                    <li>{num}</li>
                ))}
            </ul>
        </>
    )
}