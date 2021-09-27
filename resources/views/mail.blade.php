<!DOCTYPE html>
<html>
<head>
	<title>Activate Your Account</title>
</head>
<body>
<?php $user = Auth::user(); ?>

<h3>Congratulations</h3>

<p>You have successfully registered</p>

<p>Please Click link below to activate your account!</p>

<p><a href="<?php $url=url('averified/'.$user->id.''); echo $url; ?>">Activate Your Account</a></p>

<p>Thanks</p>

</body>
</html>