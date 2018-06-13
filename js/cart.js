var cart = {};

$.getJSON('goods/goods.json', function(data) {
	var goods = data; //все товары в массиве
	//console.log(goods);
	checkCart();
	console.log(cart);
	showCart(); //вывожу товары на страницу

	function showCart() {
		var out = '';
		for (var key in cart) {
			out += '<button class="delete">x</button>';
			out += '<img class="catalog_img" src="'+ goods[key].image+'" alt="товар"><br>';
			out += goods[key].name;
			out += '<button class="cart_minus">-</button>';
			out += cart[key];
			out += '<button class="cart_plus">+</button>';
			out += cart[key]*goods[key].cost;
			out += '<br>';
		}
		$('#cart_main').html(out);
	}
});

function checkCart() { //проверяем наличие корзины в localStorage
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}