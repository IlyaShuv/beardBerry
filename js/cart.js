var cart = {};

$.getJSON('goods/goods.json', function(data) {
	var goods = data; //все товары в массиве
	//console.log(goods);
	checkCart();
	console.log(cart);
	showCart(); //вывожу товары на страницу

	function showCart() {
		var total = 0;
		if ($.isEmptyObject(cart) ) { //проверка пуста ли корзина
			var out = '<div class="cart_empty">Корзина пуста. Пожалуйста, добавьте товар в корзину. <br><a href="index.html#catalog">Перейти в каталог</a></div>';
			$('#cart_main').html(out);
			$('.cart_createButton').css("display", "none");
			$('.orderForm').css("display", "none");
			$('.cartHead').css("display", "none");
			$('.cart_totalCost').html("");
		}
		else {
			var out = '';
			for (var key in cart) {
				out += '<div class="cart_rowWrap"><div class="cart_row"><img class="cart_img" src="'+ goods[key].image+'" alt="товар"></div>';
				out += '<a class="cart_fancy cart_name cart_row" href="good.html?title='+data[key].name+'&image='+data[key].image+'&description='+data[key].description+'&cost='+data[key].cost+'&articul='+key+'"; data-fancybox data-options="{&quot;type&quot; : &quot;iframe&quot;, &quot;iframe&quot; : {&quot;preload&quot; : false, &quot;css&quot; : {&quot;width&quot; : &quot;650px&quot;,&quot;height&quot; : &quot;1150px&quot;}}}">' + goods[key].name + '</a>'; 
				out += '<div class="cart_cost cart_row">' + goods[key].cost + 'руб.</div>';
				out += '<button class="cart_butMinus cart_row" data-art="'+key+'">-</button>';
				out += '<div class="cart_count cart_row">' + cart[key] + '</div>';
				out += '<button class="cart_butPlus cart_row" data-art="'+key+'">+</button>';
				out += '<div class="cart_finalCost cart_row">' + cart[key]*goods[key].cost + 'руб.</div>';
				out += '<button class="cart_butDelete cart_row" data-art="'+key+'">x</button></div>';
				total += goods[key].cost*cart[key];
			}
			$('#cart_main').html(out);
			$('.cart_totalCost').html("Итого: " + total + " рублей");
			$('.cart_createButton').css("display", "block");
			$('.cartHead').css("display", "block");
			$('.cart_butPlus').on('click', plusGoods);
			$('.cart_butMinus').on('click', minusGoods);
			$('.cart_butDelete').on('click', deleteGoods);
			$('.cart_createButton').on('click', function() {
				showForm();
				createOrderNumber();
				createOrderItems();
			});

			$(".cart_fancy").fancybox({
				transitionIn: 'elastic',
				transitionOut: 'elastic',
				backFocus: false,
				loop: true,
				buttons : [
        	'close'
    		],
    		idleTime: 36000,
    		openEffect: 'none', 
				closeEffect: 'none',
				afterClose: function() {
					checkCart();
					showCart();
				}
			});
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
		$('.orderForm').css("display", "block");
	}

	function createOrderNumber() {
		var res = "";
		var words = "qwertyuiopasdfghjklzxcvbnm";
		var date = new Date();
		res += date.getDate();
		res += date.getHours();
		res += date.getMinutes();
		res += "-";

		var max_position = words.length - 1;
		for (i = 0; i < 3; i++) {
			position = Math.floor( Math.random() * max_position );
			res += words.substring(position, position + 1);
		}

		$('.orderForm_orderNumber').attr('value', res);
	}

	function createOrderItems() {
		var res = "";
		var total = 0;
		for (var key in cart) {
			var str = data[key].name;
			res += str.replace(/&#34/g, "");
			res += " (артикул: ";
			res += key;
			res += ") ";
			res += " x";
			res += cart[key];
			res += "; "
			total += cart[key] * goods[key].cost;
		}
		res += "Общая стоимость заказа: "
		res += total;
		$('.orderForm_orderItems').attr('value', res);
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