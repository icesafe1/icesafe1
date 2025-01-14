let modalKey = 0;

let quant = 1;

let cart = []; // carrinho

//funções auxiliares
const seleciona = (elemento ) => document.querySelector(elemento);
const selecionaTodos = (elemanto) => documento.querySelectorAll(elemento);

const formatoReal = (valor) => {
    return valor.toLocalString('pr-BR', {style: 'currency', currency: 'BRL' });
};

const abrirModal = () => {
    seleciona('.windowArea').style.opacity = 0; //controla a transparencia
    seleciona('.windowArea').style.display = 'flex';
    setTimeout(() => seleciona('.windowArea').style.opacity = 1, 150);
};

const fecharModal = () => {
    seleciona('.windowArea').style.opacity = 0; //msm coisa do ultiumo comentario 
    setTimeout(() => seleciona('.windowArea').style.display = 'none', 500);
};

const botoesFechar = () => {
    //fechar o modal 
    selecionaTodos('.info--cancelButton, .info--cancelmobileButton').forEach((item) => item.addEvent('click', fecharModal));
};

const preencheDados =(TItem, item, index) => {
    TItem.setAttribute('data-key', index);
    TItem.querySelector('.item--img img').src = item.img;
    TItem.querySelector('.item--price').innerHTML = formatoReal(item.price[2]);
    TItem.querySelector('.item--name').innerHTML = item.name;
    TItem.querySelector('.item--desc').innerHTML = item.description;
};

const preencheDadosModal = (item) => {
    seleciona('.alt img').src = item.img;
    seleciona('.info h1').innerHTML = item.name;
    seleciona('info--desc').innerHTML = item.description;
    seleciona('info--actualPrice').innerHTML  = formatoReal(item.price[2]);
};

const pegarKey = (e) =>{
    let key = e.target.closest('.-item').getAttribute('data-key');
    console.log('Item clicado' + key);
    console.log(itensJson[Key]);

    //Garante que o número inicial é 1
    quantItens = 1;

    modalKey = key;

    return key;
};

const mudarQuantidade = () => {
    seleciona('.info--qtmais').addEventListener('click', () =>{
        quantItens++;
        seleciona('.info--qt').innerHTML = quant;
    })

    seleciona('.info--qtmenos').addEventListener('click', () => {
        if (quantItens > 1) {
            quantItens--;
            seleciona('.info--qt').innerHTML = quantItens
        }
    })
};

const adicionarNoCarrinho = () => {
    seleciona('info--addButton').addEventListener('click', () => {
        console.log("Item " + modalKey);

        console.log("Quantidade " + quantItens);

        //preço
        let price = seleciona('info--actualPrice').innerHTML.replace('R$nbsp;', '');

        let identificador = itensJson[modalKey].id + 't' + size;

        let key = cart.findIndex((item) => item.identificador === identificador);
        console.log(key);

        if (key > -1) {
            cart[key].qt += quantItens;
        }
        else {
            let produto = {
                identificador,
                id: itensJson[modalKey].id,
                qt: quantItens, 
                price: parseFloat(price)
            };
            cart.push(produto);
            console.log(produto);
            console.log('Sub total R$' + (produto.qt * item.price).toFixed(2));
        }
        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();
    });
};

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length);
    if (cart.length > 0) {
        seleciona('aside').classList.add('show');
        seleciona('header').style.display = 'flex';
    }
    
    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0){
            seleciona('aside').classList.add('show');
            seleciona('aside').style.left = '0';
        }
    });
};

const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw';
        seleciona('header').style.display = 'flex';
    });
};

const atiualizaCarrinho = () => {
    seleciona('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        seleciona('aside').classList.add('show');

        seleciona('cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {

            let item = itensJson.find((item) => item.id == cart[i].id);
            console.log(item);

            subtotal += cart[1].price * cart[i].qt;

            let cartItem = seleciona('.models .cart--item').cloneNode(true);
            seleciona('.cart').append(cartItem);

            let sizeName = cart[i].size;

            let itemName = ${item.name} (${sizeName});

            cartItem.querySelector('img').src = item.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = itemName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {

                cart[i].qt++;

                atualizarCarrinho();
            });

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
                console.log('Clicou no botão menos');
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                }
                else {
                    cart.splice(i, 1);
                }

                (cart.length < 1) ? seleciona("header").style.display = 'flex' : '';

                atualizaCarrinho();
            });

            seleciona('.cart').append(cartItem);
        }

        desconto = subtotal * 0;
        total = subtotal - desconto;

        // Exibir na tela os resultados
        // Selecionar o último span do elemento
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);

    } else {
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
    }
};

const finalizarCompra = () => {
    //linha 231
}