import Link from "next/link"
import { Produto } from "@/models/interfaces"

interface NavegarProps {
    produtos: Produto[]
    onFiltrar: (produto: Produto[]) => void 
}

export default function Navegar({produtos, onFiltrar}: NavegarProps) {
    function verTudo() {
        onFiltrar(produtos)
    }
    function verCamisas() {
        const camisas = produtos.filter((produto) => 
            produto.category === "T-shirts"
        );
        onFiltrar(camisas)
    }
    function verMeias() {
        const meias = produtos.filter((produto) => 
            produto.category === "Meias"
        );
        onFiltrar(meias)
    }
    function verCanecas() {
        const canecas = produtos.filter((produto) => 
            produto.category === "Canecas"
        );
        onFiltrar(canecas)
    }
    
    return (
        <>
            <Link onClick={() => verTudo()} href='/produtos' className="block p-[10px] rounded-[3px] bg-blue-500 text-center hover:bg-blue-400">
                Ver Tudo
            </Link>
            <div className="flex justify-center gap-[10px] mt-[10px]">
                <Link onClick={() => verCamisas()} href='/produtos' className="block w-[33.3%] p-[15px] rounded-[3px] bg-blue-500 text-center hover:bg-blue-400">
                    Ver Camisas
                </Link>
                <Link onClick={() => verMeias()} href='/produtos' className="block w-[33.3%] p-[15px] rounded-[3px] bg-blue-500 text-center hover:bg-blue-400">
                    Ver Meias
                </Link>
                <Link onClick={() => verCanecas()} href='/produtos' className="block w-[33.3%] p-[15px] rounded-[3px] bg-blue-500 text-center hover:bg-blue-400">
                    Ver Canecas
                </Link>
            </div>
        </>
    )
}