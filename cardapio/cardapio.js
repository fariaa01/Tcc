
function adicionarAoCarrinho(itemId) {
    fetch('/carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id: itemId })
    })
    .then(response => {
        if (response.ok) {
            alert('Item adicionado ao carrinho!');
        } else {
            alert('Erro ao adicionar item ao carrinho.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar item ao carrinho.');
    });
} 

document.querySelectorAll('.acao button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const itemId = this.closest('form').querySelector('input[name="item_id"]').value;
        adicionarAoCarrinho(itemId);
    });
});
  
// Adicionar item ao carrinho
--- a/file:///c%3A/Users/Usuario/Downloads/Tcc/controllers/carrinhoController.js
+++ b/file:///c%3A/Users/Usuario/Downloads/Tcc/controllers/carrinhoController.js
@@ -1,4 +1,4 @@
 module.exports = {
    adicionar: (req, res) => {
        const { item_id } = req.body;
        if (!req.session.carrinho) req.session.carrinho = [];
        // Aqui você pode buscar o item no banco de dados pelo item_id
        // e adicionar o item completo ao carrinho. Exemplo simplificado:
        req.session.carrinho.push({ id: item_id, nome: `Item ${item_id}`, preco: 10.00 });
        res.status(200).send('Item adicionado ao carrinho');
    },  
}


 