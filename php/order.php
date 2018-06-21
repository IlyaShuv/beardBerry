<?php 
	header('Content-Type: text/html; charset=utf-8');
	mb_internal_encoding("UTF-8");

	require_once('phpmailer/PHPMailerAutoload.php'); 
	$mail = new PHPMailer; //формирование письма для администратора магазина
	$mail->CharSet = 'utf-8'; 

	$name = $_POST['name'];  //получаем данные из формы
	$phone = $_POST['phone']; 
	$email = $_POST['E-mail']; 
	$address = $_POST['address']; 
	$orderNumber = $_POST['orderNumber']; 
	$orderItems = $_POST['orderItems']; 

	$mail->isSMTP(); 	
	$mail->Host = 'smtp.mail.ru'; 
	$mail->SMTPAuth = true; 
	$mail->Username = 'beardberrystore@mail.ru'; 
	$mail->Password = '2018mustache'; 
	$mail->SMTPSecure = 'ssl'; 
	$mail->Port = 465; 

	$mail->setFrom('beardberrystore@mail.ru'); 
	$mail->addAddress('tsehan90@gmail.com'); 
	$mail->addAddress('wildchild24@mail.ru'); 
	$mail->isHTML(true); 

	$mail->Subject = 'Заказ с сайта Beard Berry Store'; 
	$mail->Body = 'Имя: ' .$name . '<br> Телефон: ' .$phone. '<br> E-mail: ' .$email. '<br> Адрес доставки: ' .$address. '<br> Заказ: ' .$orderItems. '<br> номер заказа: ' .$orderNumber; 
	$mail->AltBody = ''; 


	$token = "553541785:AAGUJALLfCn3kmmXEZcwdJZN0dMgBP7GSYM";	//формируем сообщение в Telegram для админимтратора магазина
	$chat_id = "-260356637";
	$arr = array(
		'Имя: ' => $name,
		'Телефон: ' => $phone,
		'E-mail: ' => $email,
		'Адрес: ' => $address,
		'Товары: ' => $orderItems,
		'Номер заказа: ' => $orderNumber
	);

	foreach ($arr as $key => $value) {
		$txt .= "<b>".$key."</b> ".$value."%0A"; 
	};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}  
	&parse_mode=html&text={$txt}","r"); //отправляем сообщение в Telegram

	if(!$mail->send()) { 		//проверяем отправилось ли письмо с заказом админу на почту (обязательное условие для успешного заказа)
		echo 'Ошибка при отправлении заказа, пожалуйста, попробуйте еще раз.'; 
	} else { 
		$mailCustomer = new PHPMailer;	//отправляем письмо с подтверждением на почту покупателю
		$mailCustomer->CharSet = 'utf-8';

		$mailCustomer->isSMTP(); 
		$mailCustomer->Host = 'smtp.mail.ru'; 
		$mailCustomer->SMTPAuth = true; 
		$mailCustomer->Username = 'beardberrystore@mail.ru'; 
		$mailCustomer->Password = '2018mustache'; 
		$mailCustomer->SMTPSecure = 'ssl'; 
		$mailCustomer->Port = 465; 

		$mailCustomer->setFrom('beardberrystore@mail.ru'); 
		$mailCustomer->addAddress($email); 

		$mailCustomer->isHTML(true); 
		$mailCustomer->Subject = 'Интернет-магазин beardberrystore.ru - подтверждение заказа #'.$orderNumber; 
		$mailCustomer->Body = 'Здравствуйте, ' .$name. '!<br>Ваш заказ №' .$orderNumber. ' в интернет-магазине beardberrystore.ru принят в обработку. Наш менеджер скоро с Вами свяжется.<br>Детали заказа:<br>' .$orderItems. ';<br>Спасибо за Ваш заказ!<br><br><br>С уважением, команда магазина beardberrystore.ru.<br>http://beardberrystore.ru'; 
		$mailCustomer->AltBody = '';

		$mailCustomer->send();
		header('location: ../confirm.html?'.$orderNumber); 
	} 

?>