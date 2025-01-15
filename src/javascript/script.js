// Variáveis Globais
let modalKey = 0; // Chave do modal para identificar o item
let quantItens = 1; // Quantidade inicial de itens no modal
let cart = []; // Array para armazenar os itens no carrinho

// Funções auxiliares
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);
const formatoReal = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Funções de controle do modal
const abrirModal = () => {
    seleciona('.windowArea').style.opacity = 0; // Define a transparência inicial
    seleciona('.windowArea').style.display = 'flex'; // Exibe o modal
    setTimeout(() => seleciona('.windowArea').style.opacity = 1, 150); // Animação de opacidade
};

const fecharModal = () => {
    seleciona('.windowArea').style.opacity = 0; // Reduz a opacidade para 0
    setTimeout(() => seleciona('.windowArea').style.display = 'none', 500); // Oculta o modal após a animação
};

// Função para preencher os dados do modal com informações do item
const preencheDadosModal = (item) => {
    seleciona('.windowArea .item--img img').src = item.img;
    seleciona('.windowArea .item--name').innerHTML = item.name;
    seleciona('.windowArea .item--desc').innerHTML = item.description;
    seleciona('.windowArea .item--price').innerHTML = formatoReal(item.price[2]);
    seleciona('.windowArea .item--quantity').value = quantItens;
    seleciona('.windowArea .item--total').innerHTML = formatoReal(item.price[2] * quantItens);
};

// Função para obter a chave do item ao clicar e exibir o modal
const pegarKey = (e) => {
    let key = e.target.closest('.-item').getAttribute('data-key');
    modalKey = key;
    preencheDadosModal(itensJson[modalKey]);
    abrirModal();
};

// Função para alterar a quantidade no modal
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

// Função para adicionar itens ao carrinho
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

// Função para exibir o carrinho
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

// Função para atualizar os itens no carrinho
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

// Função para finalizar a compra
const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra');
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
        seleciona('header').style.display = 'flex';
        alert("Já ta pronto meu rei 👍");
    });
};

// Evento ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    addItemToCart("Produto Exemplo");
});

// Lógica para abrir e fechar o carrinho a partir do botão
const cartButton = document.getElementById('imageButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartButton = document.getElementById('closeCart');

cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Adicionar item ao carrinho (exemplo)
function addItemToCart(item) {
    const cartItemsDiv = cartSidebar.querySelector('.cart-items');
    const itemElement = document.createElement('p');
    itemElement.textContent = item;
    cartItemsDiv.appendChild(itemElement);
}

// Mapear Json para gerar a lista
itemJson.map((item, index) => {
    let item = document.querySelector('.models .item').cloneNode(true);
    seleciona('.WindowArea').append(item);
    // linha 253
});

itemJson.querySelector(".item a").addEventListener("click", (e) => {
    e.preventDefault();
    console.log('Clicou no item');

    let chave = pegarKey(e);

    abrirModal();

    preencheDadosModal(item);

    preencherTamanhos(chave);

    seleciona('.itemInfo--qt').innerHTML = quantItens

    escolherTamanhoPreco(chave);
});

botoesFechar();

mudarQuantidade();

adicionarNoCarrinho();
atualizaCarrinho();
fecharCarrinho();
finalizarCompra();

const atualizarQRCode = (total) => {
    const qrcodeContainer = seleciona('#qrcode');
    qrcodeContainer.innerHTML = ''; // Limpar qrcode anterior

    const pagamentoLink = `https://pagamento-ficticio.com?valor=${total.toFixed(2)}`; // esse link é apenas um exemplo, alterar depois.

    qrcodeContainer.toCanvas(qrcodeContainer, pagamentoLink, { width: 150 }, (error) =>{
        if (error) console.error('Erro ao gerar QR Code:', error);
    });
};

const atualizaCarrinho = () => {

    if(cart.length > 0 ) {
        total = subtotal - desconto

        atualizarQRCode(total);

        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);
    } else{
        seleciona('#qrcode').innerHTML = '';
    }
    
const finalizarCompraButton = document.getElementById('finalizarCompra');
const dadosModalArea = document.querySelector('.dadosModalArea');
const dadosModalCancelButton = document.querySelector('.dadosModalCancelButton');
const cancelarDadosButton = document.getElementById('cancelarDados');
const formDados = document.getElementById('formDados');

finalizarCompraButton.addEventListener('click', () => {
    dadosModalArea.style.display = 'block'; // Exibe Modal 
});

dadosModalCancelButton.addEventListener('click', () => {
    dadosModalArea.style.display = 'none'; 
});

cancelarDadosButton.addEventListener('click', () => {
    dadosModalArea.style.display = 'none';
})

formDados.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    console.log('Dados recebidos:', nome, email, telefone, endereco);

    dadosModalArea.style.display = 'none';

    alert('Compra realizada com sucesso!');
});

};