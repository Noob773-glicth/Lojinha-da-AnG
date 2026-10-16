const express = require('express');
const app = express();
const PORT = 3000;

// Configurar o Express para aceitar dados de formulários e usar EJS
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Lista temporária de produtos (funciona como nosso "banco de dados" por enquanto)
let produtos = [
    { id: 1, nome: "Produto Exemplo", preco: "49.90", descricao: "Um produto legal de teste", imagem: "https://via.placeholder.com/150" }
];

// Rota 1: Página Inicial (Loja - Mostra os produtos)
app.get('/', (req, res) => {
    res.render('index', { produtos });
});

// Rota 2: Painel do Administrador (Onde você cadastra os produtos)
app.get('/admin', (req, res) => {
    res.render('admin', { produtos });
});

// Rota 3: Cadastrar um novo produto (Recebe os dados do formulário)
app.post('/cadastrar', (req, res) => {
    const { nome, preco, descricao, imagem } = req.body;
    
    // Adiciona o novo produto na lista
    produtos.push({
        id: produtos.length + 1,
        nome,
        preco,
        descricao,
        imagem: imagem || "https://via.placeholder.com/150"
    });

    res.redirect('/admin'); // Redireciona de volta para o painel
});

// Rota 4: Deletar um produto
app.post('/deletar/:id', (req, res) => {
    const idParaDeletar = parseInt(req.params.id);
    produtos = produtos.filter(p => p.id !== idParaDeletar);
    res.redirect('/admin');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Loja rodando com sucesso! Acesse: http://localhost:${PORT}`);
});