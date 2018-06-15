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
		
			out += '<div class="catalog_singleGoods"><a class="catalog_fancy" href="good.html?title='+data[key].name+'&image='+data[key].image+'&description='+data[key].description+'&cost='+data[key].cost+'&articul='+key+'"; data-fancybox data-options="{&quot;type&quot; : &quot;iframe&quot;, &quot;iframe&quot; : {&quot;preload&quot; : false, &quot;css&quot; : {&quot;width&quot; : &quot;650px&quot;,&quot;height&quot; : &quot;720px&quot;}}}">';
			out += '<h3 class="catalog_singleGoodsTitle">'+data[key]['name']+'</h3>';
			out += '<p class="catalog_singleGoodsCost">'+data[key]['cost']+'руб.</p>';
			out += '<img class="catalog_img" src="'+data[key].image+'"></a>';
			out += '<button class="catalog_button" data-art="'+key+'">Купить</button>';
			out += '</div>';
		}1
		$('#catalog_goods').html(out);
		$('.catalog_button').on('click', addToCart);
		$('.fancy_buyButton').on('click', funcClick);
		$(".catalog_fancy").fancybox({
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
			afterShow: function() { 

				$(".fancy_buyButton").click(function() { 
					addToCart.call(this);
					$('#fancy_buyDone').html("Добавлено в корзину");
				}); 
			},
		});
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

function funcClick() {
	alert("Нажали!");
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