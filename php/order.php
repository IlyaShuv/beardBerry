<?php 

	require_once('phpmailer/PHPMailerAutoload.php'); 
	$mail = new PHPMailer; 
	$mail->CharSet = 'utf-8'; 

	$name = $_POST['name']; 
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
	$mail->addAddress('wildchild24@mail.ru'); 
	$mail->isHTML(true); 

	$mail->Subject = 'Заказ с сайта Beard Berry Store'; 
	$mail->Body = 'Имя: ' .$name . '<br> Телефон: ' .$phone. '<br> E-mail: ' .$email. '<br> Адрес доставки: ' .$address. '<br> Заказ: ' .$orderItems. '<br> номер заказа: ' .$orderNumber; 
	$mail->AltBody = ''; 


	$token = "553541785:AAGUJALLfCn3kmmXEZcwdJZN0dMgBP7GSYM";
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
	&parse_mode=html&text={$txt}","r");

	if(!$mail->send()) { 
		echo 'Error'; 
	} else { 
		header('location: ../confirm.html?'.$orderNumber); 
	} 

?>