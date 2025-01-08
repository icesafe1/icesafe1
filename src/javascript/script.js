let modalKey = 0;

let quantP = 1;

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
    seleciona()
};