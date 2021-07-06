{{--
/*
echo 'Magic-Link: <br>' . $data['url'] . '<br>';
echo 'Email to: : <br>' . $data['user_email'];*/--}}

<h3>Hi {{$data['user_email']}},</h3>
<br>

Please click to <a href="{{$data['url']}}">Verify</a> your login!
