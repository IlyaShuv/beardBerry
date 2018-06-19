function showOrderNumber() { 
	var orderNumber = window.location.href.split("?")[1]; 
	$('#confirm_number').html(orderNumber); 
}
function deleteCart() { //удаляем корзину из localStorage 
	localStorage.removeItem('cart');
}