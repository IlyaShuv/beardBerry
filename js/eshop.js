var cart = {}; //корзина

function start() {
	$('document').ready(function() {
		loadGoods();
		checkCart();
		showMiniCart();
	});
}

function loadGoods() {//загружаем товары на страницу
	$.getJSON('../goods/goods.json', function(data) {
		//console.log(data);
		var out = "";
		for (var key in data) {
			out+='<div class="catalog_singleGoods">';
			out+='<h3>'+data[key]['name']+'</h3>';
			out+='<p>Цена: '+data[key]['cost']+'руб.</p>';
			out+='<img class="catalog_img" src="'+data[key].image+'">';
			out+='<button class="catalog_button" data-art="'+key+'">Купить</button>';
			out+='</div>';
		}
		$('#catalog_goods').html(out);
		$('.catalog_button').on('click', addToCart);
	});
}

function addToCart() { //добавляем товар в корзину
	var articul = $(this).attr('data-art'); 
	if (cart[articul]!=undefined) {
		cart[articul]++;
	}
	else {
		cart[articul] = 1;
	}	
	localStorage.setItem('cart', JSON.stringify(cart) );
	console.log(cart);
	showMiniCart();
}

function checkCart() { //проверяем наличие корзины в localStorage
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

function showMiniCart() { //показывает содержимое корзины
	var count = 0;
	for (var k in cart) {
		count += 1 * cart[k];
	}
	if (count != 0) {
		$('.miniCart_button').css('display', 'block');
	}
	$('.miniCart_goods').html(count);
}