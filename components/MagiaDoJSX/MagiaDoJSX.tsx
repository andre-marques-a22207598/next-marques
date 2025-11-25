
export default function MagiaDoJSX() {
    const magia = <strong>HTML dentro de JavaScript!</strong>
    const tecnologias = "React e Next.js"

    return (
        <div className="flex flex-col gap-y-[10px] text-center w-full p-[20px] mt-[20px] rounded-[5px] bg-green-100">
            <p>
                Este é o meu componente MagiaDoJSX.
            </p>

            <p>
                Um componente é uma função que retorna JSX. - {magia}.
            </p>

            <p>
                Os componentes são usados em {tecnologias}.
            </p>
        </div>
    )
}
