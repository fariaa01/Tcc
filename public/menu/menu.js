 const btnAbrirCategoria = document.getElementById("btnAbrirCategoria");
    const modalCategoria = document.getElementById("modalCategoria");
    const modalPedido = document.getElementById("modalPedido");
    const fecharCategoria = document.getElementById("fecharCategoria");
    const fecharModal = document.getElementById("fecharModal");
    const selectCategoria = document.getElementById("selectCategoria");
    const inputCategoria = document.getElementById("inputCategoria");
    const camposDinamicos = document.getElementById("camposDinamicos");
    const tituloModal = document.getElementById("tituloModal");

    btnAbrirCategoria.onclick = () => modalCategoria.style.display = "block";
    fecharCategoria.onclick = () => modalCategoria.style.display = "none";
    fecharModal.onclick = () => modalPedido.style.display = "none";

    window.onclick = (event) => {
      if (event.target == modalCategoria) modalCategoria.style.display = "none";
      if (event.target == modalPedido) modalPedido.style.display = "none";
    };

    document.getElementById("btnAvancar").onclick = () => {
      const categoria = selectCategoria.value;
      if (!categoria) {
        alert("Selecione uma categoria.");
        return;
      }

      inputCategoria.value = categoria;
      tituloModal.innerText = "Novo Pedido - " + categoria.charAt(0).toUpperCase() + categoria.slice(1);
      camposDinamicos.innerHTML = "";

      if (categoria === "bebida") {
        camposDinamicos.innerHTML = `
  <input type="number" name="volume" placeholder="Volume (ml)" class="form-box-input" />
  <select name="com_gelo" class="form-box-input">
    <option value="">Com gelo?</option>
    <option value="sim">Sim</option>
    <option value="nao">Não</option>
  </select>`;
      } else if (categoria === "lanche") {
        camposDinamicos.innerHTML = `
          <input type="text" name="tamanho" placeholder="Tamanho do lanche" />
          <input type="text" name="acompanhamento" placeholder="Acompanhamento" />`;
      }

      modalCategoria.style.display = "none";
      modalPedido.style.display = "block";
    };  
    