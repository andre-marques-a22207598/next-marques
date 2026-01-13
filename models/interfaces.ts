// Interface TypeScript que define a estrutura de um objeto Rating (Avaliação)
export interface Rating {
    rate: number,   // Nota/classificação média do produto (ex: 4.5, 3.8)
    count: number   // Número total de avaliações/reviews que o produto recebeu (ex: 150, 200)
}

// Interface TypeScript que define a estrutura completa de um objeto Produto
export interface Produto {
    id: number;          // Identificador único do produto (chave primária da API)
    title: string;       // Nome/título do produto (ex: "T-shirt React", "Caneca TypeScript")
    description: string; // Descrição detalhada do produto
    price: number;       // Preço do produto (pode vir como string da API mas tipado como number aqui)
    image: string;       // Caminho/URL da imagem do produto (ex: "/media/produto_imagens/tshirt.png")
    rating: Rating;      // Objeto Rating com avaliação (nota + contador de reviews)
    category: string;    // Categoria do produto (ex: "T-shirts", "Meias", "Canecas")
}