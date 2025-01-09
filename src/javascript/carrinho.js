
// Selecionar os elementos necessários
const cartButton = document.getElementById('imageButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartButton = document.getElementById('closeCart');

// Função para abrir o carrinho
cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

// Função para fechar o carrinho
closeCartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Aqui você pode adicionar a lógica de adicionar itens ao carrinho
// Exemplo: Adicionar um item
function addItemToCart(item) {
    const cartItemsDiv = cartSidebar.querySelector('.cart-items');
    const itemElement = document.createElement('p');
    itemElement.textContent = item;
    cartItemsDiv.appendChild(itemElement);
}

// Exemplo de como adicionar um item ao carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    addItemToCart("Produto Exemplo");
});
