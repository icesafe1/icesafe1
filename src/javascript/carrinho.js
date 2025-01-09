
const imageButton = document.getElementById('imageButton');
const shoppingCart = document.getElementById('shoppingCart');
const closeCart = document.getElementById('closeCart');


imageButton.addEventListener('click', function() {
  shoppingCart.classList.add('open');
});


closeCart.addEventListener('click', function() {
  shoppingCart.classList.remove('open');
});
