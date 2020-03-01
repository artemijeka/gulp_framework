<?php
if (trim($_REQUEST["user_name_b"]) === '' && trim($_REQUEST["user_email_b"]) === '' && trim($_REQUEST["user_city_b"]) === '')
{//check for spamming a robot
  $method = $_SERVER['REQUEST_METHOD'];
  $cc = true; //change color
  $project_name = trim($_REQUEST["project_name"]);
  $robot_email  = trim($_REQUEST["robot_email"]);
  $manager_email  = trim($_REQUEST["manager_email"]);
  $hidden_copy_email  = trim($_REQUEST["hidden_copy_emails"]);
  $form_subject = trim($_REQUEST["form_subject"]);
  // $password = trim($_REQUEST["password"]);
  // $confirm_password = trim($_REQUEST["confirm_password"]);

  foreach ($_REQUEST as $key => $value) {
    if (
      $key != "project_name" //админские настройки
      && $key != "robot_email" //служебное поле для задания email скрипта отправки
      && $key != "manager_email" //админские настройки
      && $key != "hidden_copy_emails" //админские настройки
      && $key != "form_subject" //админские настройки
      && $key != "user_name_b" //проверки на бота
      && $key != "user_email_b" //проверки на бота
      && $key != "user_city_b" //проверки на бота
      && $key != "password" //пароль, разумеется не отправляется
      && $key != "confirm_password" //пароль, разумеется не отправляется
    ) {
      // if ($value === '') { //если любое поле пусто то ошибка
      //   echo 'error: clean';
      //   return false;
      // }
      $message .= (($c = !$c) ?
      '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
          <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>" . str_replace('_', ' ', $key) . "</b></td>
          <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>";
    }
  }

  $message = "<table style='width: 100%;'>$message</table>";
  function adopt($text) {
    return '=?UTF-8?B?' . Base64_encode($text) . '?=';
  }

  $headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . $robot_email . PHP_EOL .
    'To: ' . $manager_email . PHP_EOL .
    'Bcc: ' . $hidden_copy_emails . PHP_EOL .
  	'Reply-To: ' . $_SERVER['SERVER_NAME'] . PHP_EOL;
  if (filter_var($manager_email, FILTER_VALIDATE_EMAIL)) {
    if (mail($manager_email, adopt($form_subject), $message, $headers)) {
      echo 'success: mail function send success';
    } else {
      echo 'error: mail function send error';
    }
  } else {
    echo 'error: check manager email error';
  }
} else {
  echo 'error: check for spamming a bot error';
}