
let carrinho = [];http://127.0.0.1:3000/index.html

function adicionarAoCarrinho(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      nome,
      preco,
      imagem,
      quantidade: 1
    });
  }

  renderizarCarrinho();

  const iconeCarrinho = document.getElementById("icone-carrinho");
  iconeCarrinho.classList.add('animado');
  setTimeout(() => {
    iconeCarrinho.classList.remove('animado');
  }, 400);

  document.getElementById("painel-carrinho").classList.add("aberto");
}

function renderizarCarrinho() {
  const lista = document.getElementById("lista-itens");
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    const itemHTML = `
      <div class="item-carrinho flex gap-3 items-center border-b py-2">
        <img src="${item.imagem}" alt="${item.nome}" class="w-16 h-16 object-cover rounded">
        <div class="flex flex-col flex-1">
          <h4 class="font-semibold">${item.nome}</h4>
          <p class="text-sm text-gray-500">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
          <div class="flex items-center gap-2 mt-1">
            <button onclick="alterarQuantidade(${index}, -1)" class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidade(${index}, 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            <button onclick="removerItem(${index})" class="ml-auto text-red-500 hover:text-red-700 text-lg">&times;</button>
          </div>
        </div>
      </div>
    `;
    lista.insertAdjacentHTML("beforeend", itemHTML);
  });

  atualizarTotalCarrinho();

  const contador = document.getElementById("contador-carrinho");
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  contador.textContent = totalItens;
  contador.style.display = totalItens > 0 ? "inline-block" : "none";
}

function alterarQuantidade(index, delta) {
  carrinho[index].quantidade += delta;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  renderizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  renderizarCarrinho();
}

function atualizarTotalCarrinho() {
  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  document.getElementById("valor-total").textContent = total.toFixed(2).replace('.', ',');
}

document.addEventListener("DOMContentLoaded", function () {
  // Abrir painel ao clicar no carrinho
  document.getElementById("icone-carrinho").addEventListener("click", () => {
    document.getElementById("painel-carrinho").classList.add("aberto");
  });

  // Fechar painel
  document.getElementById("fechar-carrinho").addEventListener("click", () => {
    document.getElementById("painel-carrinho").classList.remove("aberto");
  });

  // Finalizar pedido via WhatsApp
  document.getElementById('finalizar-pedido').addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  
  const confirma = confirm('Você será redirecionado para o WhatsApp para finalizar o pedido. Deseja continuar?');
  if (!confirma) return;

    const numeroWhatsApp = "5521973333818"; // ← Substitua pelo número da vendedora

    let mensagem = "Olá! 👋 Gostaria de fazer um pedido:%0A%0A";

    carrinho.forEach(item => {
      const subtotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',');
      mensagem += `• ${item.nome} (x${item.quantidade}) - R$ ${subtotal}%0A`;
    });

    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
      .toFixed(2)
      .replace('.', ',');

    mensagem += `%0A🧾 *Total: R$ ${total}*`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, '_blank');

    // Limpar carrinho e UI
    carrinho = [];
    renderizarCarrinho();
    document.getElementById("painel-carrinho").classList.remove("aberto");
    document.getElementById("contador-carrinho").textContent = "0";
    document.getElementById("valor-total").textContent = "0,00";
  });

  // Clique nos produtos
  document.querySelectorAll(".produto").forEach(produto => {
    produto.addEventListener("click", function () {
      const nome = this.dataset.nome;
      const preco = parseFloat(this.dataset.preco);
      const imagem = this.dataset.imagem;
      adicionarAoCarrinho(nome, preco, imagem);
    });
  });
});

