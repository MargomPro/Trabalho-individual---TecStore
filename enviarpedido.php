<?php
$mensagem_enviada = false;
$erro_envio = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['Nome'] ?? '';
    $email = $_POST['Email'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';
    $data_envio = date('d/m/Y');
    $hora_envio = date('H:i:s');

    $arquivo = "
    <html>
        <p><b>Nome: </b>$nome</p>
        <p><b>E-mail: </b>$email</p>
        <p><b>Mensagem: </b>$mensagem</p>
        <p>Este e-mail foi enviado em <b>$data_envio</b> às <b>$hora_envio</b>.</p>
    </html>
    ";

    $destino = "pv23251@esev.ipv.pt";
    $assunto = "Contacto pelo site";

    $headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\n";
    $headers .= "From: $nome <$email>";

    if (mail($destino, $assunto, $arquivo, $headers)) {
        $mensagem_enviada = true;
    } else {
        $erro_envio = 'Ocorreu um erro no envio da mensagem. Por favor, tente novamente mais tarde.';
    }
}
?>

<section class="contactos" id="contactos">
    <?php if ($mensagem_enviada): ?>
        <p>Obrigado! A sua mensagem foi enviada com sucesso.</p>
    <?php elseif ($erro_envio): ?>
        <p><?php echo $erro_envio; ?></p>
        <form action="" method="post">
            <input type="submit" value="Enviar">
        </form>
    <?php else: ?>
        <form action="" method="post">
            <input type="submit" value="Enviar">
        </form>
    <?php endif; ?>
</section>
