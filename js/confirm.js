function showOrderNumber() { 
	var orderNumber = window.location.href.split("?")[1]; 
	$('#confirm_number').html(orderNumber); 
}