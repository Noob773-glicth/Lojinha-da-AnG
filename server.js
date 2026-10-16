const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o EJS e pastas estáticas
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lista de produtos em memória (podes alterar ou adicionar mais)
let produtos = [
    {
        id: 1,
        nome: "Produto Exemplo",
        preco: "49.90",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    }
];

// Rota Principal: Lista os produtos
app.get('/', (req, res) => {
    res.render('index', { produtos });
});

// Rota POST: Cria um novo produto
app.post('/adicionar-produto', (req, res) => {
    const { nome, preco, imagem } = req.body;
    
    if (nome && preco) {
        const novoProduto = {
            id: Date.now(),
            nome: nome,
            preco: parseFloat(preco).toFixed(2),
            // Se não enviar imagem, usa uma imagem padrão
            imagem: imagem || "https://via.placeholder.com/300x200?text=Sem+Imagem"
        };
        produtos.push(novoProduto);
    }
    
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});
