 document.addEventListener('DOMContentLoaded', async () => {
      const nomeAtual = "<%= nome_empresa || '' %>";

      if (!nomeAtual.trim()) {
        const { value: nomeEmpresa } = await Swal.fire({
          title: 'Bem-vindo!',
          text: 'Digite o nome da sua empresa para personalizar o sistema:',
          input: 'text',
          inputPlaceholder: 'Ex: Food Truck do João',
          confirmButtonText: 'Salvar',
          confirmButtonColor: '#148f77',
          allowOutsideClick: false,
          allowEscapeKey: false,
          inputValidator: (value) => {
            if (!value || value.trim() === '') {
              return 'Por favor, digite um nome válido!';
            }
          }
        });

        if (nomeEmpresa && nomeEmpresa.trim()) {
          try {
            const res = await fetch('/empresa/atualizar-nome-empresa', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nome_empresa: nomeEmpresa.trim() })
            });

            const result = await res.json();
            if (result.sucesso) {
              setTimeout(() => location.reload(), 300);
            } else {
              Swal.fire('Erro', 'Não foi possível salvar o nome.', 'error');
            }
          } catch (e) {
            Swal.fire('Erro', 'Erro de conexão ao salvar.', 'error');
          }
        }
      }
    });

    
    const dadosEntradas = JSON.parse('<%= JSON.stringify(entradas) %>');
    const dadosSaidas = JSON.parse('<%= JSON.stringify(saidas) %>');

    const ctx = document.getElementById('grafico');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        datasets: [
          {
            label: 'Entradas',
            data: dadosEntradas,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Saídas',
            data: dadosSaidas,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { size: 14 } } },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) {
                  label += 'R$ ' + context.parsed.y.toLocaleString('pt-BR', {minimumFractionDigits: 2});
                }
                return label;
              }
            }
          }
        },
        scales: { y: { beginAtZero: true } }
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.getElementById('toggleSidebar');
      const sidebar = document.getElementById('sidebar');
      const mainContent = document.getElementById('mainContent');
      const icon = toggleBtn.querySelector('i');

      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        mainContent.classList.toggle('sidebar-hidden');
        icon.classList.add('rotate');
        setTimeout(() => icon.classList.remove('rotate'), 400);
      });
    });