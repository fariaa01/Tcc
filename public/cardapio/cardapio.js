document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.adicionar-carrinho').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      fetch('/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: id })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          alert('Item adicionado ao carrinho!');
        } else {
          alert('Erro: ' + data.msg);
        }
      })
      .catch(() => alert('Erro ao adicionar ao carrinho.'));
    });
  });
});