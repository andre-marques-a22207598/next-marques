import type { Metadata } from "next";
import "./globals.css";
import Relogio from "@/components/Relogio/Relogio";
import Link from "next/link";

export const metadata: Metadata = {
  title: "André Marques - React & Next.js App",
  description: "A minha primeira aplicação com React e Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = new Date();

  return (
    <html lang="pt-br">
      <body className='h-screen flex flex-col justify-between items-center'>

        <header className="flex flex-col items-center mt-2.5 mb-[30px]">
          <h1 className="mb-2.5 font-bold text-center text-[2em]">
            DIW - Project 
          </h1>
          <nav>
            <ul className="nav-links flex gap-10">
              <li><Link href="/">Intro</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/caracteristicas">Caracteristicas</Link></li>
              <li><Link href="/tecnologias">Tecnologias</Link></li>
              <li><Link href="/projetos">Projetos</Link></li>
              <li><Link href="/contador">Contador</Link></li>
              <li><Link href="/input">Input</Link></li>
              <li><Link href="/produtos">DeisiShop</Link></li>
            </ul>
          </nav>
        </header>

        <main className="w-[600px] p-[30px] my-2.5 rounded-[10px] shadow-[5px_5px_6px_rgba(0,0,0,0.2)]">
          {children}
        </main>

        <footer className="
  flex justify-between items-center
  w-[600px] px-8 py-5
  mt-6 mb-4
  rounded-2xl

  bg-gradient-to-r from-blue-100 to-blue-300
  text-black
  font-semibold italic
  text-sm
  tracking-wide
  shadow-[0_6px_18px_rgba(0,0,0,0.25)]
  border border-white/10
  backdrop-blur-sm
  transition-transform duration-300
  hover:scale-[1.02]
">
          <p>Universidade Lusófona © {data.getFullYear()}</p>
          <p>André Marques</p>
          <p>Desenvolvimento de Interfaces Web</p>
          <div className="flex flex-col items-center">
            <Relogio />

          </div>
        </footer>

      </body>
    </html>
  );
}