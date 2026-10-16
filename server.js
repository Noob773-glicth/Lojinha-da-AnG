const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS e middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Produto de exemplo inicial: Brafy (R$ 1.00)
let produtos = [
    {
        id: 1,
        nome: "Brafy",
        preco: "1.00",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3Gho1aca7L6KzoliEA2UK02Zs1F7jkJngoBhcV9PvQ&s=10"
    }
];

// Rota Principal: Exibe a lista de produtos
app.get('/', (req, res) => {
    res.render('index', { produtos });
});

// Rota POST: Adiciona um novo produto
app.post('/adicionar-produto', (req, res) => {
    const { nome, preco, imagem } = req.body;
    
    if (nome && preco) {
        const novoProduto = {
            id: Date.now(),
            nome: nome,
            preco: parseFloat(preco).toFixed(2),
            imagem: imagem || "https://via.placeholder.com/300x200?text=Sem+Imagem"
        };
        produtos.push(novoProduto);
    }
    
    res.redirect('/');
});

// Rota POST: Elimina/Apaga um produto pelo ID
app.post('/deletar-produto/:id', (req, res) => {
    const idParaDeletar = Number(req.params.id);
    produtos = produtos.filter(p => p.id !== idParaDeletar);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});
