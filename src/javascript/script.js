let modalKey = 0;
let quantItens = 1;
let cart = []; // carrinho

// Funções auxiliares
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
};

// Abrir e fechar o modal
const abrirModal = () => {
    seleciona('.windowArea').style.opacity = 0; // Controla a transparência
    seleciona('.windowArea').style.display = 'flex';
    setTimeout(() => seleciona('.windowArea').style.opacity = 1, 150);
};

const fecharModal = () => {
    seleciona('.windowArea').style.opacity = 0; 
    setTimeout(() => seleciona('.windowArea').style.display = 'none', 500);
};

// Função para preencher os dados do item no modal
const preencheDadosModal = (item) => {
    seleciona('.windowArea .item--img img').src = item.img;
    seleciona('.windowArea .item--name').innerHTML = item.name;
    seleciona('.windowArea .item--desc').innerHTML = item.description;
    seleciona('.windowArea .item--price').innerHTML = formatoReal(item.price[2]);
    seleciona('.windowArea .item--quantity').value = quantItens;
    seleciona('.windowArea .item--total').innerHTML = formatoReal(item.price[2] * quantItens);
};

// Função para pegar a chave do item e mostrar o modal
const pegarKey = (e) => {
    let key = e.target.closest('.-item').getAttribute('data-key');
    modalKey = key;
    preencheDadosModal(itensJson[modalKey]);
    abrirModal();
};

// Função para mudar a quantidade no modal
const mudarQuantidade = () => {
    seleciona('.info--qtmais').addEventListener('click', () => {
        quantItens++;
        seleciona('.info--qt').innerHTML = quantItens;
        seleciona('.windowArea .item--total').innerHTML = formatoReal(itensJson[modalKey].price[2] * quantItens);
    });

    seleciona('.info--qtmenos').addEventListener('click', () => {
        if (quantItens > 1) {
            quantItens--;
            seleciona('.info--qt').innerHTML = quantItens;
            seleciona('.windowArea .item--total').innerHTML = formatoReal(itensJson[modalKey].price[2] * quantItens);
        }
    });
};

// Função para adicionar o item ao carrinho
const adicionarNoCarrinho = () => {
    seleciona('.info--addButton').addEventListener('click', () => {
        let price = seleciona('.windowArea .item--price').innerHTML.replace('R$', '').trim();
        let identificador = itensJson[modalKey].id;

        let key = cart.findIndex((item) => item.identificador === identificador);

        if (key > -1) {
            cart[key].qt += quantItens;
        } else {
            let produto = {
                identificador,
                id: itensJson[modalKey].id,
                qt: quantItens,
                price: parseFloat(price)
            };
            cart.push(produto);
        }
        fecharModal();
        atualizarCarrinho();
    });
};

// Função para abrir o carrinho
const abrirCarrinho = () => {
    if (cart.length > 0) {
        seleciona('aside').classList.add('show');
        seleciona('header').style.display = 'flex';
    }
    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0) {
            seleciona('aside').classList.add('show');
            seleciona('aside').style.left = '0';
        }
    });
};

// Função para fechar o carrinho
const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw';
        seleciona('header').style.display = 'flex';
    });
};

// Função para atualizar o carrinho
const atualizarCarrinho = () => {
    seleciona('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        seleciona('aside').classList.add('show');
        seleciona('.cart').innerHTML = '';

        let subtotal = 0;
        let total = 0;

        cart.forEach((item) => {
            let produto = itensJson.find((itemJson) => itemJson.id == item.id);
            subtotal += item.price * item.qt;

            let cartItem = seleciona('.models .cart--item').cloneNode(true);
            seleciona('.cart').append(cartItem);

            cartItem.querySelector('.cart--item-nome').innerHTML = produto.name;
            cartItem.querySelector('.cart--item--qt').innerHTML = item.qt;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                item.qt++;
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (item.qt > 1) {
                    item.qt--;
                } else {
                    cart.splice(cart.indexOf(item), 1);
                }
                atualizarCarrinho();
            });
        });

        total = subtotal;
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);
    } else {
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
    }
};

// Função de exemplo para adicionar um item ao carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    addItemToCart("Produto Exemplo");
});

// Função para adicionar o item ao carrinho (exemplo)
function addItemToCart(itemName) {
    const item = {
        name: itemName,
        price: [0, 0, 99.99],  // Simulando um preço
        img: "img/produto.jpg",  // Exemplo de imagem
        description: "Descrição do Produto",
        id: 1  // ID do produto
    };
    cart.push(item);
    atualizarCarrinho();  // Atualiza a interface do carrinho
}

// Lógica para abrir e fechar o carrinho a partir do botão de imagem
const cartButton = document.getElementById('imageButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartButton = document.getElementById('closeCart');

//abrir o carrinho
cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

// fechar o carrinho 
closeCartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});



function addItemToCart(item) {
    const cartItemsDiv = cartSidebar.querySelector('.cart-items');
    const itemElement = document.createElement('p');
    itemElement.textContent = item;
    cartItemsDiv.appendChild(itemElement);
}



document.addEventListener('DOMContentLoaded', () => {
    addItemToCart("Produto Exemplo");
});


//linha 230