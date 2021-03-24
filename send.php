<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$massage = $_POST['massage'];
$email = $_POST['email'];

// Формирование самого письма
$title = "New massage Best Tour Plan";
$body = "
<h2>New massage</h2>
<b>Name:</b> $name<br>
<b>Phone:</b> $phone<br><br>
<b>Massage:</b><br>$massage
<b>Email:</b><br>$email
";


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'nikolayzholkin@gmail.com'; // Логин на почте
    $mail->Password   = 'blisytrgugkwvaed'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('besttourplan@19nikolas85.ru', 'Nikolay Zholkin'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('besttourplan@19nikolas85.ru');  

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

if(isset($_POST['email'])) {
    $body = 'User mail: ' . $_POST['email'];
} else { $body;

}

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
header('location: thankyou.html');