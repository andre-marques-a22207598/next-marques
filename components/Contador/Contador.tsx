"use client";
import { useEffect, useState } from 'react';

export default function Contador() {
    const [counter, setCounter] = useState(0);
    const [historico, setHistorico] = useState<number[]>([]);
    const [cor, setCor] = useState<string>("text-red-500");
    const limiteMax = 10;
    const limiteMin = 0;

    useEffect(() => {
        localStorage.setItem('contador', `${counter}`)
        setHistorico([...historico, counter])
        if (counter <= 3) {
            setCor("text-red-500")
        } else if (counter > 3 && counter < 8) {
            setCor("text-yellow-500")
        } else if (counter > 7 && counter < 11) {
            setCor("text-green-500")
        }
    }, [counter])

    function aumentaCount() {
        (counter < limiteMax) ? setCounter(counter + 1) : alert("Excedeu o limite");

    }

    function diminuiCount() {
        (counter > limiteMin) ? setCounter(counter - 1) : alert("Excedeu o limite");
    }
    function resetCount() {
        setCounter(0);
    }
    function alteraCorTexto(cor: String) {
        
    }

    return (
        <>
            <div className="flex justify-center gap-4 mb-2.5">
                <button className="cursor-pointer px-3 py-1 bg-green-200 rounded hover:shadow-lg transition-shadow duration-300" onClick={aumentaCount}>
                    Aumentar
                </button>

                <button className="cursor-pointer px-3 py-1 bg-green-200 rounded hover:shadow-lg transition-shadow duration-300" onClick={diminuiCount}>
                    Diminuir
                </button>

                <button className="cursor-pointer px-3 py-1 bg-green-200 rounded hover:shadow-lg transition-shadow duration-300" onClick={resetCount}>
                    Reset
                </button>
            </div>
            <div className='flex justify-center w-full font-bold text-xl'><p className={`pt-0 pb-0 pl-2 pr-2 ${cor} `} >{counter}</p></div>

            <ul>
                {historico.map(num => (
                    <li>{num}</li>
                ))}
            </ul>

        </>
    )
}