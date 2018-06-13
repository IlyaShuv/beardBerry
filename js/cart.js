var cart = {};

$.getJSON('goods/goods.json', function(data) {
	var goods = data; //все товары в массиве
	//console.log(goods);
	checkCart();
	console.log(cart);
	showCart(); //вывожу товары на страницу

	function showCart() {
		if ($.isEmptyObject(cart) ) { //проверка пуста ли корзина
			var out = 'Корзина пуста. Добавьте товар в корзину <br><a href="index.html">Главная страница</a>';
			$('#cart_main').html(out);
			$('.order_createButton').css("display", "none");
			$('#orderForm').css("display", "none");
		}
		else {
			var out = '';
			for (var key in cart) {
				out += '<button class="cart_butDelete" data-art="'+key+'">x</button>';
				out += '<img class="catalog_img" src="'+ goods[key].image+'" alt="товар"><br>';
				out += goods[key].name;
				out += '<button class="cart_butMinus" data-art="'+key+'">-</button>';
				out += cart[key];
				out += '<button class="cart_butPlus" data-art="'+key+'">+</button>';
				out += cart[key]*goods[key].cost;
				out += '<br>';
			}
			$('.order_createButton').css("display", "block");
			$('#cart_main').html(out);
			$('.cart_butPlus').on('click', plusGoods);
			$('.cart_butMinus').on('click', minusGoods);
			$('.cart_butDelete').on('click', deleteGoods);
			$('.order_createButton').on('click', showForm);
		}
	}

	function plusGoods() {
		var articul = $(this).attr('data-art');
		cart[articul]++;
		saveCartToLocalStorage();//сохраняем корзину в local storage
		showCart();
	}

	function minusGoods() {
		var articul = $(this).attr('data-art');
		if (cart[articul] > 1) {
			cart[articul]--;
		}	
		else {
			delete cart[articul];
		}
		saveCartToLocalStorage();//сохраняем корзину в local storage
		showCart();
	}

	function deleteGoods() {
		var articul = $(this).attr('data-art');
		delete cart[articul];
		saveCartToLocalStorage();//сохраняем корзину в local storage
		showCart();
	}

	function showForm() { //выводим поля формы заказа при нажатии на кнопку оформить заказ;
		$('#orderForm').css("display", "block");
	}
});

function checkCart() { //проверяем наличие корзины в localStorage
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

function saveCartToLocalStorage() { //функция для сохранения корзины в local storage
	localStorage.setItem('cart', JSON.stringify(cart) );
}